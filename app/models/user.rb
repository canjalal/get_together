# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  name            :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  location        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password

    validates :email, :session_token, presence: true, uniqueness: true
    validates :name, :location, presence: true
    validates :name, length: { in: 3..30 }
    validates :email, length: {in: 5..127 }
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :name, format: { without: URI::MailTo::EMAIL_REGEXP, message: "Name, not email" }
    validates :password, length: {in: 6..255 }, allow_nil: true

    before_validation :ensure_session_token

    has_many :owned_groups,
    foreign_key: :owner_id,
    class_name: :Group,
    dependent: :destroy; # in future, can allow owner to be deleted for a month, then delete their group

    has_many :memberships,
    foreign_key: :member_id,
    class_name: :Membership,
    dependent: :destroy

    has_many :joined_groups,
    through: :memberships,
    source: :group

    has_many :signups,
    foreign_key: :attendee_id,
    class_name: :Signup,
    dependent: :destroy

    has_many :events_attending,
    through: :signups,
    source: :event

    has_one_attached :profile_pic

    def self.find_by_credentials(email, pw)

        user = User.find_by(email: email)

        if user&.authenticate(pw)
            # if user exists AND the result of user.authenticate(password) returns true
            return user
          else
            return false
          end

    end


    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!

        return self.session_token
    end

    private

    def generate_unique_session_token
        token = SecureRandom.urlsafe_base64
        while(User.exists?(session_token: token))
            token = SecureRandom.urlsafe_base64
        end
        return token
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

end
