class Api::MembershipsController < ApplicationController

    def create
        
        @group_id = params[:group_id]
        @mb = Membership.new(member_id: current_user.id, group_id: @group_id)
        if(@mb.save)
            render :show
        else
            render json: { errors: @mb.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @mb = Membership.find_by_member_and_group(current_user.id, params[:id])
        if(@mb.destroy)
            render :show
        else
            render json: { errors: @mb.errors.full_messages }, status: :unprocessable_entity 
        end

    end
end
