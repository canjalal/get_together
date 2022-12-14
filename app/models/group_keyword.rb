# == Schema Information
#
# Table name: group_keywords
#
#  id         :bigint           not null, primary key
#  keyword_id :bigint           not null
#  group_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class GroupKeyword < ApplicationRecord
    validates :keyword_id, uniqueness: {scope: :group_id, message: "is already listed in this group as a group_keyword"}
    
    belongs_to :keyword,
    foreign_key: :keyword_id,
    class_name: :Keyword

    belongs_to :group,
    foreign_key: :group_id,
    class_name: :Group
end
