class SetDefaultThumbnails < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:users, :thumbnail_border, from: nil, to: "black")
    change_column_default(:users, :thumbnail_letter, from: nil, to: "white")
    change_column_default(:users, :thumbnail_background, from: nil, to: "green")
  end
end
