class Api::GroupsController < ApplicationController
    # before_action :require_logged_in
    # don't need to be logged in to view groups, but do need to be logged in to join or edit

    wrap_parameters include: Group.attribute_names + ['memberLabel', 'keywordIds', 'ownerId', 'coverPhoto', 'memberId']

    def index
        #until we redesign to make the site centered around events rather than groups,
        # compile list of all groups
        if(current_user)
            @joined_groups = current_user.joined_groups.map(&:id)
            @owned_groups = current_user.owned_groups.map(&:id)
            @groups = Group.all
            @other_groups = @groups.map(&:id) - @joined_groups - @owned_groups
        else
            @joined_groups = []
            @owned_groups = []
            @groups = Group.limit(5)
        end
    end

    def create
        @group = Group.new(group_params)
        if(@group.save)
            @g_keywords = []
            params[:keyword_ids].each do |kwi, val|
                        
                @g_keywords << GroupKeyword.create!(keyword_id: kwi, group_id: @group.id)
                # tweak this to error out and delete group if group keyword saves are unsuccesfful
            end
            @owner = current_user
            @memberships = []
            @count = 0
            @events = []
          render :show
        else
          render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @group = Group.includes(events: :signups).find_by(id: params[:id])

        if(@group)
            @g_keywords = @group.group_keywords
            @owner = @group.owner
            @memberships = @group.memberships
            @is_member = !!current_user && !!current_user.memberships.find_by(group_id: @group.id)
            @count = @group.memberships.size
            @events = @group.events
            render :show
        else
            render json: { errors: ["Group ##{params[:id]} does not exist"] }, status: 404
        end
    end
    
    def update
        @group = Group.includes(events: :signups).find_by(id: params[:id])
        @memberships = @group.memberships
        if(@group.owner_id == current_user.id)
            if(params[:cover_photo])
                @group.cover_photo.attach(params[:cover_photo])
                @g_keywords = @group.group_keywords
                @owner = @group.owner
                @events = @group.events
                @count = @group.memberships.size
                render :show
            elsif(@group.update(group_params))

                @group.group_keywords.each do |gk|
                    gk.destroy unless params[:keyword_ids][gk.keyword_id] 
                end

                keyword_creator = Api::GroupKeywords::KeywordCreator.new(@group)
                keyword_creator.create_group_keywords(params[:keyword_ids])

                @g_keywords = GroupKeyword.where(group_id: @group.id)
                @owner = @group.owner
                @events = @group.events
                @count = @group.memberships.size
                render :show
            else
                @group.errors.add("params", " are invalid") if(@group.errors.full_messages.length == 0)
                render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
            end

        else 
            render json: { errors: ["You must be the group owner to edit"] }, status: 401
        end
    end

    def destroy
        @group = Group.find_by(id: params[:id])
        @g_keywords = @group.group_keywords
        @events = @group.events
        if(@group.owner_id == current_user.id)
            @group.destroy
            render json: {message: "removed" }, status: :ok
        else
            render json: { errors: ["You must be the group owner to delete the group"] }, status: 401
        end
    end

    def search
        @groups = Group.where("name ILIKE ?", "%" + Group.sanitize_sql_like(params[:query]) + "%")
        render :search
    end

    def remove_member
        #Admin Removal of a Member

        # Example frontend test call:
        # res = await csrfFetch("/api/groups/7/remove_member", {method: "DELETE", body: JSON.stringify({memberId: 8})})

        @group = Group.find(params[:id])

        if @group.owner.id == current_user.id
            @mb = Membership.find_by_member_and_group(params[:member_id], params[:id])
            if @mb && @mb.destroy
                deleted_user = @mb.member
                render json: { message: "Deleted #{deleted_user.name} (#{deleted_user.email})"}
            else
                render json: { errors: ["Member not found"]},
                status: 404
            end
        else
            render json: { errors: ["You must be the group owner to remove a member!"] }, status: 401
        end
    end

    private

    def group_params # group here is NOT bananable, it searches for controller
        params.require(:group).permit(:name, :description, :member_label, :location, :cover_photo, :member_id, :owner_id, keyword_ids: [])
    end

end
