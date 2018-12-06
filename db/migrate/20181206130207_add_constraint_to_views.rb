class AddConstraintToViews < ActiveRecord::Migration[5.2]
  def change
    change_column :videos, :views, :integer, null: false
  end
end
