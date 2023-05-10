class Api::EventsController < ApplicationController
    wrap_parameters include: Event.attribute_names + ['dateTime', 'groupId']

    def index
        @events = current_user.events_attending
    end

    def create
        # debugger
        @event = Event.new(event_params)
        @group = Group.find_by(id: params[:group_id])
        @attendees = []
        @signups = []
        @count = 0

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
            @count = @event.signups.select {|su| su.rsvp_status == "going"}.size + 1
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
            if(params[:cover_photo])
                @event.cover_photo.attach(params[:cover_photo])
                @attendees = @group.attendees
                @count = @event.signups.select {|su| su.rsvp_status == "going"}.size
                @signups = @event.signups
                render :show
            elsif(@event.update(event_params))

                # in the future, add updating of event topics

                @attendees = @event.attendees
                @count = @event.signups.select {|su| su.rsvp_status == "going"}.size
                @signups = @event.signups

                render :show
            else
                render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { errors: ["You must be the group owner to edit"] }, status: 401
        end
    end

    def destroy
        @event = Event.find_by(id: params[:id])
        @group = @event.group
        if(@group.owner_id == current_user.id)
            @attendees = @event.attendees
            @count = @event.signups.select {|su| su.rsvp_status == "going"}.size
            @signups = @event.signups

            @event.destroy
            render json: {message: "removed" }, status: :ok

        else
            render json: { errors: ["You must be the group owner to delete an event"] }, status: 401
        end
    end

    def search
        # may move to separate EventSearch controller for RESTful architecture, or look for a params[:search] in GET request for index route
                @events = Event.where("title ILIKE ?", "%" + Event.sanitize_sql_like(params[:query]) + "%").includes(:group, :signups)
                render :search
    end

    def weekly
        @nextweek = Date.parse(params[:fecha]) + 1.week + 1.day
        @events = Event.where("date_time >= ?", params[:fecha]).where("date_time <= ?", @nextweek).includes(:group, :signups)
        render :search
    end

    private

    def event_params
        params.require(:event).permit(:title, :date_time, :duration, :description, :online, :venue, :group_id)
    end
end
