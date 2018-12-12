# == Schema Information
#
# Table name: videos
#
#  id          :bigint(8)        not null, primary key
#  title       :string           not null
#  description :text             not null
#  uploader_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  views       :integer          not null
#
TODAY = Date.today.strftime('%b %d %Y')
YESTERDAY = (Date.today - 1).strftime('%b %d %Y')
THIS_WEEK = [
  (Date.today - 2).strftime('%b %d %Y'),
  (Date.today - 3).strftime('%b %d %Y'),
  (Date.today - 4).strftime('%b %d %Y'),
  (Date.today - 5).strftime('%b %d %Y'),
  (Date.today - 6).strftime('%b %d %Y')
]

class Video < ApplicationRecord
  validates :title, :description, :uploader_id, :views, presence: true
  include ActionView::Helpers::DateHelper

  has_one_attached :video

  belongs_to :uploader,
    primary_key: :id,
    foreign_key: :uploader_id,
    class_name: :User

  has_many :comments,
    primary_key: :id,
    foreign_key: :video_id,
    dependent: :destroy,
    class_name: :Comment

  has_many :ratings,
    primary_key: :id,
    foreign_key: :video_id,
    dependent: :destroy,
    class_name: :Rating

  has_many :raters,
    through: :ratings,
    source: :user

  def age
    upload_time = self.created_at
    format_upload_time = Time.new(*upload_time.to_a[0..5].reverse)
    time_ago_in_words(format_upload_time) + " ago"
  end

  def upload_date
    date = self.created_at.to_date.strftime('%b %d %Y')
    date_array = date.split
    date_array[1] += ","
    date_array.join(' ')
  end

  def time_ago
    date = self.created_at.to_date.strftime('%b %d %Y')
    if TODAY == date
      return 'today'
    elsif YESTERDAY == date
      return 'yesterday'
    elsif THIS_WEEK.include?(date)
      return 'this week'
    else
      return 'earlier'
    end
  end
end
