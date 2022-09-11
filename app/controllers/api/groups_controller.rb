class Api::GroupsController < ApplicationController
    # before_action :require_logged_in
    # don't need to be logged in to view groups, but do need to be logged in to join or edit

    wrap_parameters include: Group.attribute_names + ['keywordIds', 'ownerId']

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
            render :show
        else # will this work? not found.
            render json: { errors: ["Group ##{params[:id]} does not exist"] }, status: 404
        end
    end
    
    def update
        # make sure to check that the current user is the owner of the group
    end

    private

    def group_params # group here is NOT bananable, it searches for controller
        params.require(:group).permit(:name, :description, :member_label, :location, :owner_id, keyword_ids: [])
    end

end
