@videos.each do |video|
  json.videos do
    json.set! video.id do
      json.partial! 'api/videos/video', video: video
    end
  end
end

json.uploaders do
  json.set! @user.id do
    json.partial! 'api/users/user', user: @user
  end
end

json.subscribers do
  json.partial! 'api/subscriptions/subscriptions', subscriptions: @user.subscription_ids
end
