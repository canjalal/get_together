# == Schema Information
#
# Table name: memberships
#
#  id         :bigint           not null, primary key
#  member_id  :bigint           not null
#  group_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Membership < ApplicationRecord
    validates :member_id, uniqueness: {scope: :group_id, message: "is already a member of the group"}

    belongs_to :member,
    foreign_key: :member_id,
    class_name: :User

    belongs_to :group,
    foreign_key: :group_id,
    class_name: :Group

    def self.find_by_member_and_group(m_id, g_id)
        return Membership.where(member_id: m_id, group_id: g_id).first
    end
end
