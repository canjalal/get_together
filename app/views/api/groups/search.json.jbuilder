json.groups do
    
    @groups.each do |group|
        json.set! group.id do
            json.extract! group, :id, :name, :description, :member_label, :location, :owner_id, :created_at, :updated_at
            json.photoURL group.cover_photo.url
        end
    end
end

if(@groups.empty?)
    json.groups({})
end