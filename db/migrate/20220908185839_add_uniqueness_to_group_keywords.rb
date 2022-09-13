class AddUniquenessToGroupKeywords < ActiveRecord::Migration[7.0]
  def change
    add_index :group_keywords, [:group_id, :keyword_id], unique: true
  end
end
