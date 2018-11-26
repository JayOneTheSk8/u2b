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
#

class Video < ApplicationRecord
  validates :title, :description, :uploader_id, presence: true
  include ActionView::Helpers::DateHelper

  has_one_attached :video

  belongs_to :uploader,
    primary_key: :id,
    foreign_key: :uploader_id,
    class_name: :User

  has_many :comments,
    primary_key: :id,
    foreign_key: :video_id,
    class_name: :Comment

  has_many :ratings,
    primary_key: :id,
    foreign_key: :video_id,
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
    self.created_at.to_date.strftime('%b %d %Y')
  end
  # 
  # def amount_of_likes
  #   Rating.where(name: 'like', video_id: self.id).size
  # end
  #
  # def amount_of_dislikes
  #   Rating.where(name: 'dislike', video_id: self.id).size
  # end
end
