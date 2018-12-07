# BLUEPRINT
# ========================================================
# @videos.each do |video|
#   json.videos do
#     json.set! video.id do
#       json.partial! 'api/videos/video', video: video
#     end
#   end
#
#   json.uploaders do
#     json.set! video.uploader_id do
#       json.partial! 'api/videos/uploader', video: video
#     end
#   end
# end
# ========================================================

recommended = @videos.shuffle[0..9]
latest = @videos.sort_by { |video| video.created_at }.reverse[0..9]
trending = @videos.sort_by { |video| video.views }.reverse[0..14]

json.recommended do
  recommended.each do |recommend|
    json.videos do
      json.set! recommend.id do
        json.partial! 'api/videos/video', video: recommend
      end
    end

    json.uploaders do
      json.set! recommend.uploader_id do
        json.partial! 'api/videos/uploader', video: recommend
      end
    end
  end
end

json.latest do
  latest.each do |late|
    json.videos do
      json.set! late.id do
        json.partial! 'api/videos/video', video: late
      end
    end

    json.uploaders do
      json.set! late.uploader_id do
        json.partial! 'api/videos/uploader', video: late
      end
    end
  end
end

json.trending do
  trending.each do |trend|
    json.videos do
      json.set! trend.id do
        json.partial! 'api/videos/video', video: trend
      end
    end

    json.uploaders do
      json.set! trend.uploader_id do
        json.partial! 'api/videos/uploader', video: trend
      end
    end
  end
end
