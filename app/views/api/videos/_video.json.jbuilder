json.extract! video, :id, :title, :description, :uploader_id, :age, :upload_date, :views, :created_at, :time_ago
json.videoUrl url_for(video.video)
json.imageUrl url_for(video.video.preview(resize: "150x84>"))
