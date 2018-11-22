json.set! @comment.id do
  json.extract! @comment, :id, :author_id, :video_id, :body,
end
