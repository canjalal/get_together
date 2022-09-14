class Api::MembershipsController < ApplicationController

    def create
        # debugger
        @group_id = params[:group_id]
        @mb = Membership.new(member_id: current_user.id, group_id: @group_id)
        if(@mb.save)
            render :show
        else
            render json: { errors: @mb.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        # debugger
        @group = Group.find_by(id: params[:id])
        @mb = @group.memberships.find_by(member_id: current_user.id)
        if(@mb.destroy)
            render :show
        else
            render json: { errors: @mb.errors.full_messages }, status: :unprocessable_entity 
        end

    end
end
