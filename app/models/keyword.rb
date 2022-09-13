# == Schema Information
#
# Table name: keywords
#
#  id         :bigint           not null, primary key
#  keyword    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Keyword < ApplicationRecord
    validates :keyword, uniqueness: true

    has_many :group_keywords,
    foreign_key: :keyword_id,
    class_name: :GroupKeyword,
    dependent: :destroy

    has_many :groups,
    through: :group_keywords,
    source: :group_id
end
