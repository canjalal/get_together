class Api::EventsController < ApplicationController
    wrap_parameters include: Event.attribute_names + ['dateTime', 'groupId']

    def create
        @event = Event.new(event_params)
        @group = Group.find_by(id: params[:group_id])
        @attendees = []
        @signups = []

        if(@group.owner_id == current_user.id)
            if(@event.save)
                render :show
            else
                render json: {errors: @event.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { errors: ["You must be the grown owner to add events"] }, status: 401
        end

    end

    def show
        @event = Event.find_by(id: params[:id])

        if(@event)
            @attendees = @event.attendees
            @group = @event.group
            @count = @event.attendees.count
            @signups = @event.signups
            render :show
        else
            render json: { errors: ["Event ##{params[:id]} does not exist"] }, status: 404
        end
    end

    def update
        @event = Event.find_by(id: params[:id])
        @group = @event.group
        if(@group.owner_id == current_user.id)
            if(@event.update(event_params))

                # in the future, add updating of event topics

                @attendees = @event.attendees
                @count = @event.attendees.count
                @signups = @event.signups

                render :show
            else
                render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { errors: ["You must be the group owner to edit"] }, status: 401
        end
    end

    def index
        @events = current_user.events # show only user's attending events
        render :index
    end

    private

    def event_params
        params.require(:event).permit(:title, :date_time, :duration, :description, :online, :venue, :group_id)
    end
end
