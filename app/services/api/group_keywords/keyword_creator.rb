class Api::GroupKeywords::KeywordCreator
    def initialize(group)
        @group = group
    end
    def create_group_keywords(kw_ids)
        kw_ids.each do |kwi, val|
            if !@group.group_keywords.map(&:keyword_id).include?(kwi)
                gk = GroupKeyword.new(keyword_id: kwi, group_id: @group.id)
                gk.save!
            end
        end
    end
end