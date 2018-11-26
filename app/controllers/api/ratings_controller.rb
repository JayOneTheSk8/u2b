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
    @rating = Rating.new(video_id: params[:video_id], name: params[:rating][:name])
    @rating.user_id = current_user.id
    if @rating.save
      render :show
    else
      render json: @rating.errors.full_messages, status: 422
    end
  end

  def update
    @rating = Rating.find(params[:id])
    if @rating.update(rating_params)
      render :show
    else
      render json: @rating.errors.full_messages, status: 422
    end
  end

  def destroy
    @rating = Rating.find(params[:id])
    @rating.destroy
    render :show
  end

  private
  def rating_params
    params.require(:rating).permit(:name)
  end
end
