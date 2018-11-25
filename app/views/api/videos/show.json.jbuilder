json.video do
  json.partial! 'api/videos/video', video: @video
end

json.uploader do
  json.partial! 'api/videos/uploader', video: @video
end

@video.likes.each do |like|
  json.likes do
    json.set! like.user_id do
      json.partial! 'api/likes/like', like: like
    end
  end
end

@video.comments.each do |comment|
  json.comments do
    json.set! comment.id do
      json.partial! 'api/comments/comment', comment: comment
    end
  end

  json.authors do
    json.set! comment.author_id do
      json.partial! 'api/users/user', user: comment.author
    end
  end
end
