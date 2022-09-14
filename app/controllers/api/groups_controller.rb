class Api::GroupsController < ApplicationController
    # before_action :require_logged_in
    # don't need to be logged in to view groups, but do need to be logged in to join or edit

    wrap_parameters include: Group.attribute_names + ['memberLabel', 'keywordIds', 'ownerId', 'coverPhoto', 'memberId']

    def index
    end

    def create
        # debugger
        @group = Group.new(group_params)
        # @group_keywords = GroupKeyword.new(group_id: @group.id,)
        if(@group.save)
            @g_keywords = []
            params[:keyword_ids].each do |kwi|
                        
                @g_keywords << GroupKeyword.create!(keyword_id: kwi, group_id: @group.id)
                # tweak this to error out and delete group if group keyword saves are unsuccesfful
            end
            @owner = current_user
            @memberships = []
            @count = 0
          render :show
        else
          render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @group = Group.find_by(id: params[:id])

        if(@group)
            @g_keywords = @group.group_keywords
            @owner = @group.owner
            @memberships = @group.memberships
            @is_member = !!current_user && !!current_user.memberships.find_by(group_id: @group.id)
            @count = @group.memberships.count
            render :show
        else # will this work? not found.
            render json: { errors: ["Group ##{params[:id]} does not exist"] }, status: 404
        end
    end
    
    def update
        @group = Group.find_by(id: params[:id])
        @memberships = @group.memberships
        if(@group.owner_id == current_user.id)
            # if( @group.update(group_params))
            if(params[:cover_photo])
                @group.cover_photo.attach(params[:cover_photo])
                @g_keywords = @group.group_keywords
                @owner = @group.owner
                render :show
            elsif(@group.update(group_params))
                @group.group_keywords.each do |gk|
                    gk.destroy unless params[:keyword_ids].include?(gk.keyword_id) 
                end
                params[:keyword_ids].each do |kwi|
                    # debugger
                    if !@group.group_keywords.map(&:keyword_id).include?(kwi)
                        gk = GroupKeyword.new(keyword_id: kwi, group_id: @group.id)
                        gk.save!
                    end
                end

                @g_keywords = @group.group_keywords
                @owner = @group.owner
                @count = 0
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
        # debugger
        @group = Group.find_by(id: params[:id])
        @g_keywords = @group.group_keywords
        if(@group.owner_id == current_user.id)
            @group.destroy
            render json: {message: "removed" }, status: :ok
        else
            render json: { errors: @group.errors.full_messages }, status: 401
        end
    end

    private

    def group_params # group here is NOT bananable, it searches for controller
        params.require(:group).permit(:name, :description, :member_label, :location, :cover_photo, :member_id, :owner_id, keyword_ids: [])
    end

end
