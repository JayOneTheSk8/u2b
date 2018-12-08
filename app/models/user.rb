# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

COLORS = %w(red orange yellow green blue purple white black pink brown)

class User < ApplicationRecord

  validates :username, :session_token, :password_digest, presence: true
  validates :username, :session_token, uniqueness: true
  validates :username, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates_inclusion_of :thumbnail_border, in: COLORS, allow_nil: true
  validates_inclusion_of :thumbnail_letter, in: COLORS, allow_nil: true
  validates_inclusion_of :thumbnail_background, in: COLORS, allow_nil: true

  has_many :videos,
    primary_key: :id,
    foreign_key: :uploader_id,
    class_name: :Video

  has_many :comments,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :Comment

  has_many :ratings,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Rating

  has_many :rated_videos,
    through: :ratings,
    source: :video

  after_initialize :ensure_session_token!
  attr_reader :password

  def self.find_by_credentials(passed_username, passed_word)
    user = User.where('username iLIKE :passed_username', passed_username: passed_username).take
    return nil unless user && user.is_password?(passed_word)
    user
  end

  def password=(new_password)
    @password = new_password
    self.password_digest = BCrypt::Password.create(new_password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end


  def is_password?(passed_word)
    BCrypt::Password.new(self.password_digest).is_password?(passed_word)
  end

  private
  def ensure_session_token!
    self.session_token ||= SecureRandom::urlsafe_base64
  end
end
