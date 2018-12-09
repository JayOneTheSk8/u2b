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

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render 'api/users/session.json.jbuilder'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def search
    query = params[:search]
    @videos = Video.where("title iLIKE :query", query: "#{query}%").distinct.limit(7)
    @users = User.where("username iLIKE :query", query: "#{query}%").limit(7)
    render 'api/videos/search_list'
  end

  def full_search
    query = params[:search]
    @videos = Video.includes(:uploader).joins('INNER JOIN users ON videos.uploader_id = users.id').where("title iLIKE :query OR users.username iLike :query", query: "#{query}%").order('created_at DESC')
    @users = User.where("username iLIKE :query", query: "#{query}%")
    render 'api/videos/full_search'
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :thumbnail_background, :thumbnail_letter, :thumbnail_border)
  end
end
