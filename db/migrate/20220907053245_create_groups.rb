class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.string :name, null: false, index: {unique: true}
      t.text :description, null: false
      t.string :member_label
      t.string :location, null: false, index: true
      t.references :owner, null: false, foreign_key: {to_table: :users}

      t.timestamps
    end

  end
end
