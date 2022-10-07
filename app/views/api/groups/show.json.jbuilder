if(@group)
    json.group do
        json.extract! @group, :id, :name, :description, :member_label, :location, :owner_id, :created_at, :updated_at
        json.photoURL @group.   cover_photo.url
        json.is_member @is_member
        json.member_count @count
    end
    json.group_keywords do
        @g_keywords.each do |g_keyword|
            json.set! g_keyword.id do
                json.id g_keyword.id
                json.keyword_id g_keyword.keyword_id
                json.group_id g_keyword.group_id
            end
        end
    end

    json.users do
        json.set! @owner.id do
            json.extract! @owner, :id, :name, :email, :location
        end
        @group.members.each do |member|
            json.set! member.id do
                json.extract! member, :id, :name, :email, :location
            end
        end
    end

    json.memberships do
        @memberships.each do |membership|
            json.set! membership.id do
                json.extract! membership, :id, :group_id, :member_id, :created_at
            end
        end
    end

    json.events do
        @events.each do |event|
            json.set! event.id do
                json.extract! event, :id, :title, :date_time, :duration, :description, :online, :venue, :group_id
                json.count (event.signups.select {|su| su.rsvp_status == "going"}.size + 1)
            end
        end
    end

else
    json.user nil
end