class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title, null: false, index: true
      t.datetime :date_time, null: false, index: true
      t.float :duration, null: false
      t.text :description, null: false
      t.string :online, null: false, default: "no"
      t.string :venue
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
