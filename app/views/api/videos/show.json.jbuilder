json.video do
  json.partial! 'api/videos/video', video: @video
end

json.uploader do
  json.partial! 'api/videos/uploader', video: @video
end

@video.comments.each do |comment|
  json.comments do
    json.set! comment.id do
      json.extract! comment, :id, :author_id, :video_id, :body
    end
  end

  json.authors do
    json.set! comment.author_id do
      json.extract! comment.author, :id, :username
    end
  end
end
