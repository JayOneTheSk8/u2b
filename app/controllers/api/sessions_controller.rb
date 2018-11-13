class Api::SessionsController < ApplicationController

  def create
    debugger
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    debugger
    if @user
      login!(@user)
      render 'api/users/show.json.jbuilder'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    if current_user
      logout!
      render json: {}
    else
      render json: ['no user logged in'], status: 404
    end
  end
end
