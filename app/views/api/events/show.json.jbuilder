json.event do
    json.extract! @event, :id, :title, :date_time, :duration, :description, :online, :venue, :group_id
    json.count @count
end

json.group do
    json.extract! @group, :id, :name, :description, :member_label, :location, :owner_id, :created_at, :updated_at
    json.photoURL @group.cover_photo.url # for now, use group picture as event picture
end
json.users do
    @attendees.each do |attendee|
        json.set! attendee.id do
            json.extract! attendee, :id, :name, :email, :location
        end
    end
end

json.signups do
    @signups.each do |signup|
        json.set! signup.id do
            json.extract! signup, :id, :event_id, :attendee_id, :rsvp_status
        end
    end
end
