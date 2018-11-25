class AddUniquenesstoRatings < ActiveRecord::Migration[5.2]
  def change
    add_index :dislikes, [:user_id, :video_id], unique: true
    add_index :likes, [:user_id, :video_id], unique: true
  end
end
