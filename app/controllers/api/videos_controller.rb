class Api::VideosController < ApplicationController
  def index
    @videos = Video.all
  end

  def create
    if video_params['video'] == 'null'
      return Video.new.errors.full_messages << ['You must upload something']
    end
    @video = Video.new(video_params)
    @video.uploader_id = current_user.id
    if @video.save
      render :show
    else
      render json: @video.errors.full_messages, status: 422
    end
  end

  def show
    @video = Video.includes(:uploader, :ratings, comments: [:author]).find(params[:id])
    render :show
  end

  def update
    @video = Video.find(params[:id])
    if @video.update(video_params)
      render :show
    else
      render json: @video.errors.full_messages, status: 422
    end
  end

  def destroy
    @video = Video.find(params[:id])
    @video.destroy
    render :show
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :video)
  end
end
