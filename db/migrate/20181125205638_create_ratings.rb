class CreateRatings < ActiveRecord::Migration[5.2]
  def change
    create_table :ratings do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
      t.integer :video_id, null: false
      t.timestamps
    end
    add_index :ratings, [:user_id, :video_id], unique: true
  end
end
