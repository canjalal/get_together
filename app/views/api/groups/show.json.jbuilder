if(@group)
    json.group do
        json.extract! @group, :id, :name, :description, :member_label, :location, :owner_id, :created_at, :updated_at
        json.photoURL @group.cover_photo.url
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

    json.owner do
        
            json.extract! @owner, :id, :name, :email, :location
    end

else
    json.user nil
end