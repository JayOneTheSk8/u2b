# == Schema Information
#
# Table name: users
#
#  id                   :bigint(8)        not null, primary key
#  username             :string           not null
#  password_digest      :string           not null
#  session_token        :string           not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  thumbnail_background :string           default("green")
#  thumbnail_letter     :string           default("white")
#  thumbnail_border     :string           default("black")
#  playlists            :jsonb
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

  # As a user
  has_many :subscriptions,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Subscription

  has_many :subscribed_channels,
    through: :subscriptions,
    source: :channel

  has_many :subscribed_videos,
    through: :subscribed_channels,
    source: :videos
  # ================

  # As a channel
  has_many :subscription_ids,
    primary_key: :id,
    foreign_key: :channel_id,
    class_name: :Subscription

  has_many :subscribers,
    through: :subscription_ids,
    source: :subscriber
  #  ==================

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

  def subscriber_count
    self.subscription_ids.count
  end

  def playlist_add(list_name, video_id)
    self.playlists[list_name].delete(video_id)
    self.playlists[list_name].unshift(video_id)
    self.save!
  end

  def playlist_remove(list_name, video_id)
    self.playlists[list_name].delete(video_id)
    self.save!
  end

  private
  def ensure_session_token!
    self.session_token ||= SecureRandom::urlsafe_base64
  end
end
