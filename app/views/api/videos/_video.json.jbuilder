json.extract! video, :id, :title, :description, :uploader_id, :age, :created_at, :upload_date
json.videoUrl url_for(video.video)
