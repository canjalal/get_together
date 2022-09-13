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
    attr_reader :keyword_ids
    validates :name, :description, :location, presence: true
    validates :name, uniqueness: true

    def keyword_ids=(kwis)
        # letting controller handle them
    end

    # validate :keyword_ids_is_array 

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

    has_many :memberships,
    foreign_key: :group_id,
    class_name: :Membership,
    dependent: :destroy

    has_many :members,
    through: :memberships,
    source: :member

    has_one_attached :cover_photo


    # def keyword_ids_is_array
    #     if !keyword_ids.is_a? Array
    #         errors.add :keyword_ids, "must be an array"
    #     elsif keywords_ids.length == 0
    #         errors.add :keyword_ids, "must have keywords"
    #     end
    # end


end
