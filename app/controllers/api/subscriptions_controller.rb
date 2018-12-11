class Api::SubscriptionsController < ApplicationController
  def index
    channel = User.find(params[:user_id])
    @subscriptions = channel.subscription_ids
    render :index
  end

  def create
    @subscription = Subscription.new
    @subscription.channel_id = params[:user_id]
    @subscription.user_id = current_user.id
    if @subscription.save
      render :show
    else
      render json: @subscription.errors.full_messages, status: 422
    end
  end

  def show
    @subscription = Subscription.find(params[:id])
    render :show
  end

  def destroy
    @subscription = Subscription.find(params[:id])
    @subscription.destroy
    render :show
  end
end
