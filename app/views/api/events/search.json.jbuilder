json.events do
    @events.each do |event|
        json.set! event.id do
            json.extract! event, :id, :title, :date_time, :duration, :description, :online, :venue, :group_id
            json.group_name event.group.name
            json.count event.signups.select {|su| su.rsvp_status == "going"}.size + 1
        end
    end
end

if(@events.empty?)
    json.events({})
end