if(@group)
    json.group do
        json.extract! @group, :id, :name, :description, :member_label, :location, :owner_id, :created_at, :updated_at
    end
else
    json.user nil
end