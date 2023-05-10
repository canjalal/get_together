class Api::Groups::GroupPresenter

    def self.call!(group, options={})
        @g_keywords = GroupKeyword.where(group_id: group.id)
        @owner = @group.owner
        @events = @group.events
        @count = @group.memberships.size
    end
end
