class Api::RatingsController < ApplicationController
  def index
    video = Video.find(params[:video_id])
    @ratings = video.ratings
    render :index
  end

  def show
    @rating = Rating.find(params[:id])
    render :show
  end

  def create
    video_id = params[:video_id]
    name = params[:rating][:name]
    @rating = Rating.new(video_id: video_id, name: name)
    @rating.user_id = current_user.id
    if @rating.save
      if logged_in? && name == 'like'
        current_user.playlist_add('likes', video_id)
      end
      render :show
    else
      render json: @rating.errors.full_messages, status: 422
    end
  end

  def update
    @rating = Rating.find(params[:id])
    if @rating.update(rating_params)
      if @rating.name == 'like'
        current_user.playlist_add('likes', params[:video_id])
      elsif @rating.name == 'dislike'
        current_user.playlist_remove('likes', params[:video_id])
      end
      render :show
    else
      render json: @rating.errors.full_messages, status: 422
    end
  end

  def destroy
    @rating = Rating.find(params[:id])
    if @rating.name == 'like'
      current_user.playlist_remove('likes', params[:video_id])
    end
    @rating.destroy
    render :show
  end

  private
  def rating_params
    params.require(:rating).permit(:name)
  end
end
