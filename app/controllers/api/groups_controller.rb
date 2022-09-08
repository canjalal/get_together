class Api::GroupsController < ApplicationController
    before_action :require_logged_in

    def index
    end

    def create
        @group = Group.new(group_params)

        if(@group.save)
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

    def group_params
        params.require(:groups).permit(:name, :description, :member_label, :location, :owner_id)
    end

end
