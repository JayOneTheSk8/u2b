json.extract! video, :id, :title, :description, :uploader_id, :age, :created_at, :upload_date, :comment_ids, :like_count, :dislike_count
json.videoUrl url_for(video.video)
