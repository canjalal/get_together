class GroupKeyword < ApplicationRecord
    belongs_to :keyword,
    foreign_key: :keyword_id,
    class_name: :Keyword

    belongs_to :group,
    foreign_key: :group_id,
    class_name: :Group
end
