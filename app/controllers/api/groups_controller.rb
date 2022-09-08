class Api::GroupsController < ApplicationController
    before_action :require_logged_in

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
          render :show
        else
          render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
    end
    
    def update
    end

    private

    def group_params # group here is NOT bananable, it searches for controller
        params.require(:group).permit(:name, :description, :member_label, :location, :owner_id, keyword_ids: [])
    end

end
