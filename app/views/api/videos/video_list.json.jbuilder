@videos.each do |video|
  json.videos do
    json.set! video.id do
      json.partial! 'api/videos/video', video: video
    end
  end
end
