# == Schema Information
#
# Table name: subscriptions
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Subscription < ApplicationRecord
  validates :user_id, uniqueness: { scope: :channel_id }
  validate :not_own_channel

  belongs_to :subscriber,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :channel,
    primary_key: :id,
    foreign_key: :channel_id,
    class_name: :User

  def not_own_channel
    if self.user_id == self.channel_id
      errors.add(:user_id, 'cannot subscribe to own channel')
    end
  end
end
