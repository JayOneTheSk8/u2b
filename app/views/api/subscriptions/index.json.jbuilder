json.subscriptions do
  @subscriptions.each do |subscription|
    json.set! subscription.user_id do
      json.partial! 'api/subscriptions/subscription', subscription: subscription
    end
  end
end
