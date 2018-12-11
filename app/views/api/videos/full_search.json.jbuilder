@users.each do |user|
  json.users do
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end

    json.subscribers do
      json.set! user.id do
        json.partial! 'api/subscriptions/subscriptions', subscriptions: user.subscription_ids
      end
    end
  end
end

@videos.each do |video|
  json.videos do
    json.set! video.id do
      json.partial! 'api/videos/video', video: video
    end
  end

  json.uploaders do
    json.set! video.uploader_id do
      json.partial! 'api/videos/uploader', video: video
    end
  end
end
