class AddCustomUserInformation < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :thumbnail_background, :string
    add_column :users, :thumbnail_letter, :string
    add_column :users, :thumbnail_border, :string
  end
end
