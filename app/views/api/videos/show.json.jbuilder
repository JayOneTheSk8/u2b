json.video do
  json.partial! 'api/videos/video', video: @video
end

json.uploader do
  json.partial! 'api/videos/uploader', video: @video
end

@video.ratings.each do |rating|
  json.ratings do
    json.set! rating.user_id do
      json.partial! 'api/ratings/rating', rating: rating
    end
  end

  json.set! (rating.name + 's') do
    json.set! rating.id do
      json.extract! rating, :name
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
