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
    @items = Video.select(:id, :title).where("title iLIKE :query", query: "#{query}%").limit(7).distinct
    render 'api/videos/search_list'
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
