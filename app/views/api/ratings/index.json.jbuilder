@ratings.each do |rating|
  json.set! rating.user_id do
    json.partial! 'api/ratings/rating', rating: rating
  end
end
