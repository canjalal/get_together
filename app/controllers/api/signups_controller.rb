class Api::SignupsController < ApplicationController
    def create
        @event_id = params[:event_id]
        @su = Signup.new(:attendee_id => current_user.id, event_id: @event_id)
        # Rails will automatically check if the @event_id refers to a real event

        if(@su.save)
            render :show
        else
            render json: {errors: @su.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @event = Event.find_by(id: params[:id])
        @su = @event.signups.find_by(attendee_id: current_user.id)
        if(@su.destroy)
            render :show
        else
            render json: {errors: @su.errors.full_messages }, status: :unprocessable_entity
        end
    end

end
