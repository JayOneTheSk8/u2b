class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def search
    query = params[:search]
    @videos = Video.select(:title).where("title iLIKE :query", query: "#{query}%").distinct.limit(7)
    @users = User.where("username iLIKE :query", query: "#{query}%").limit(7)
    render 'api/videos/search_list'
  end

  def full_search
    query = params[:search]
    @videos = Video.includes(:uploders).joins('INNER JOIN users ON videos.uploader_id = users.id').where("title iLIKE :query OR users.username iLike :query", query: "#{query}%")
    @users = User.where("username iLIKE :query", query: "#{query}%")
    render 'api/videos/full_search'
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
