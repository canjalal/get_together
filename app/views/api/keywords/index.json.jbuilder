@keywords.each do |keyword|
    json.set! keyword.id do
        json.id keyword.id
        json.keyword keyword.keyword
    end
end