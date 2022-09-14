class UniqueSignups < ActiveRecord::Migration[7.0]
  def change
    add_index :signups, [:event_id, :attendee_id], unique: true
  end
end
