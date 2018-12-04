json.extract! video, :id, :title, :description, :uploader_id, :age, :upload_date, :comment_ids
json.videoUrl url_for(video.video)
json.imageUrl url_for(video.video.preview(resize: "150x84>"))
