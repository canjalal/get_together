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
