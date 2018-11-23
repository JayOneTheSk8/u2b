class Api::LikesController < ApplicationController
  def show
    @like = Like.find(id: params[:id])
    render :show
  end

  def create
    @like = Like.new(video_id: params[:video_id])
    @like.user_id = current_user.id
    if @like.save
      render :show
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    @like = Like.find(id: params[:id])
    @like.destroy
    render json: {}
  end
end
