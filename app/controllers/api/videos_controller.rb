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
    @related = Video.includes(:uploader).order(created_at: :desc).limit(15)
    if @video.save
      render :show
    else
      render json: @video.errors.full_messages, status: 422
    end
  end

  def show
    @video = Video.includes(:ratings, uploader: [:subscription_ids], comments: [:author]).find(params[:id])
    @related = Video.includes(:uploader).order(created_at: :desc).limit(15)
    if @video.uploader_id != current_user.id
      @video.views += 1
      @video.save!
    end
    if logged_in?
      current_user.playlist_add('watched', params[:id])
    end
    render :show
  end

  def update
    @video = Video.find(params[:id])
    @related = Video.includes(:uploader).order(created_at: :desc).limit(15)
    if @video.update(video_params)
      render :show
    else
      render json: @video.errors.full_messages, status: 422
    end
  end

  def destroy
    @video = Video.find(params[:id])
    @video.destroy
    @related = [];
    render :show
  end

  def user_videos
    @user = User.find(params[:user_id])
    @videos = Video.where(uploader_id: @user.id)
    render 'api/videos/video_list'
  end

  def subscriptions
    user = User.find(params[:user_id])
    @subscriptions = user.subscribed_videos
    render 'api/videos/subscriptions'
  end


  def liked_videos
    user = User.find(params[:user_id])
    user_likes = user.playlists['likes']
    @videos = Video.includes(:uploader).where(id: user_likes)
    render 'api/videos/playlist'
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :video)
  end
end
