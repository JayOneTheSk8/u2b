class AddIndexOnName < ActiveRecord::Migration[5.2]
  def change
    add_index :ratings, :name
  end
end
