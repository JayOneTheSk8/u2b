class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      login!(@user)
      render 'api/users/session.json.jbuilder'
    else
      render json: ["Invalid Username or Password"], status: 422
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
