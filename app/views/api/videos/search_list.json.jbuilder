@items.each do |item|
  json.items do
    json.set! item.id do
      json.extract! item, :id, :title
    end
  end
end
