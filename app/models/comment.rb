# == Schema Information
#
# Table name: comments
#
#  id                :bigint(8)        not null, primary key
#  body              :text             not null
#  parent_comment_id :integer
#  author_id         :integer          not null
#  video_id          :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Comment < ApplicationRecord
  validates :body, presence: true
  include ActionView::Helpers::DateHelper


  belongs_to :video,
    primary_key: :id,
    foreign_key: :video_id,
    class_name: :Video

  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

  has_many :replies,
    primary_key: :id,
    foreign_key: :parent_comment_id,
    class_name: :Comment

  belongs_to :parent_comment,
    primary_key: :id,
    foreign_key: :parent_comment_id,
    class_name: :Comment,
    optional: true

  def age
    upload_time = self.created_at
    format_upload_time = Time.new(*upload_time.to_a[0..5].reverse)
    time_ago_in_words(format_upload_time) + " ago"
  end

end
