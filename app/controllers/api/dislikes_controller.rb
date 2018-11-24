class Api::DislikesController < ApplicationController
  def show
    @dislike = Dislike.find(params[:id])
    render :show
  end

  def create
    @dislike = Dislike.new(video_id: params[:video_id])
    @dislike.user_id = current_user.id
    if @dislike.save
      render :show
    else
      render json: @dislike.errors.full_messages, status: 422
    end
  end

  def destroy
    @dislike = Dislike.find(params[:id])
    @dislike.destroy
    render json: {}
  end
end
