json.video do
  json.extract! @video, :id, :title, :description, :uploader_id, :age, :created_at, :upload_date
  json.videoUrl url_for(@video.video)
end

json.uploader do
  json.id @video.uploader_id
  json.username @video.uploader.username
end
