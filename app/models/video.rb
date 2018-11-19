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
  # validate :ensure_video
  include ActionView::Helpers::DateHelper

  has_one_attached :video

  belongs_to :uploader,
    primary_key: :id,
    foreign_key: :uploader_id,
    class_name: :User

  # def ensure_video
  #   video.attached?
  # end

  def age
    upload_time = self.created_at
    format_upload_time = Time.new(*upload_time.to_a[0..5].reverse)
    time_ago_in_words(format_upload_time) + " ago"
  end
end
