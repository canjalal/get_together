# == Schema Information
#
# Table name: events
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  date_time   :datetime         not null
#  duration    :float            not null
#  description :text             not null
#  online      :string           default("no"), not null
#  venue       :string
#  group_id    :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Event < ApplicationRecord
    validates :title, :date_time, :duration, :description, presence: true
    validates :online, inclusion: { in: %w(yes no), message: "%{value} must be a yes or no value" }
    validate :event_date_cannot_be_in_the_past, on: [:create, :update]
    validates :duration, numericality: { in: 5..1440, message: "must be between 5 minutes and 24 hours long" }

    belongs_to :group,
    foreign_key: :group_id,
    class_name: :Group

    has_many :signups,
    foreign_key: :event_id,
    class_name: :Signup,
    dependent: :destroy

    has_many :attendees,
    through: :signups,
    source: :attendee

    def is_past_event
      return date_time.present? && date_time < Date.today
    end

    def event_date_cannot_be_in_the_past

          errors.add("Date and time", "can't be in the past") if is_past_event

    end

    def going_signups
      signups.where(rsvp_status: "going")
    end

end
