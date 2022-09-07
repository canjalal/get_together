# == Schema Information
#
# Table name: groups
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  description  :text             not null
#  member_label :string
#  location     :string           not null
#  owner_id     :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Group < ApplicationRecord
    validates :name, :description, :location, presence: true
    validates :name, uniqueness: true

    belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User
    
    has_many :group_keywords,
    foreign_key: :group_id,
    class_name: :GroupKeyword,
    dependent: :destroy

    has_many :related_groups,
    through: :group_keywords,
    source: :group_id

    has_one_attached :cover_photo
end
