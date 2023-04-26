json.events do
    @events.each do |event|
        json.set! event.id do
            json.extract! event, :id, :title, :date_time, :duration, :description, :online, :venue, :group_id
        end
    end
end