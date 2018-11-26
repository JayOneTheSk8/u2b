json.extract! video, :id, :title, :description, :uploader_id, :age, :created_at, :upload_date, :comment_ids, :amount_of_likes, :amount_of_dislikes
json.videoUrl url_for(video.video)
