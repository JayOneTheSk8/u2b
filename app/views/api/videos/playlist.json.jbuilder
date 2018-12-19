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
