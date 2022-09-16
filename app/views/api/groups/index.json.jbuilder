json.groups do
    @groups.each do |group|
        json.set! group.id do
            json.extract! group, :id, :name, :description, :member_label, :location, :owner_id, :created_at, :updated_at
            json.photoURL group.cover_photo.url
        end
    end
end

json.joined_groups do
    json.array! @joined_groups
end

json.owned_groups do
    json.array! @owned_groups
end

json.other_groups do
    json.array! @other_groups
end