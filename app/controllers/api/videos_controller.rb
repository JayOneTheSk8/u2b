class Api::VideosController < ApplicationController
  def index
    @videos = Video.includes(:uploader)
    render :index
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
    @related = Video.includes(:uploader).order(created_at: :desc).limit(10)
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

  def user_videos
    @user = User.find(params[:user_id])
    @videos = Video.where(uploader_id: @user.id)
    render 'api/videos/video_list'
  end

  def add_view
    @video = Video.find(params[:video_id])
    @video.views += 1
    @video.save
  end

  #
  # def liked_videos
  #   @user = User.find(params[:user_id])
  #   user_likes = @user.ratings.select(:id).where(name: 'like')
  #   @videos = Video.where('id IN :user_likes', user_likes: user_likes)
  #   render 'api/videos/video_list'
  # end

  private

  def video_params
    params.require(:video).permit(:title, :description, :video)
  end
end
