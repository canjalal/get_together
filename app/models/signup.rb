# == Schema Information
#
# Table name: signups
#
#  id          :bigint           not null, primary key
#  event_id    :bigint           not null
#  attendee_id :bigint           not null
#  rsvp_status :string           default("going"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Signup < ApplicationRecord
    validates :rsvp_status, inclusion: { in: %w(going not), message: "must be either going or not"}
    validates :attendee_id, uniqueness: {scope: :event_id, message: "is already signed up to this event"}

    belongs_to :event,
    foreign_key: :event_id,
    class_name: :Event

    belongs_to :attendee,
    foreign_key: :attendee_id,
    class_name: :User
end
