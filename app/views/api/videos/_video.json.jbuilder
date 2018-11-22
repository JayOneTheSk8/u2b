json.extract! video, :id, :title, :description, :uploader_id, :age, :created_at, :upload_date, :comment_ids
json.videoUrl url_for(video.video)
