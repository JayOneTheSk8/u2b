class Subscription < ApplicationRecord
  validates :user_id, uniqueness: { scope: :channel_id }
  # validate :not_own_channel

  belongs_to :subscriber,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :channel,
    primary_key: :id,
    foreign_key: :channel_id,
    class_name: :User
  
  # def not_own_channel
  #
  # end
end
