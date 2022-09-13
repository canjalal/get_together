class CreateGroupKeywords < ActiveRecord::Migration[7.0]
  def change
    create_table :group_keywords do |t|
      t.references :keyword, null: false, foreign_key: true
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
