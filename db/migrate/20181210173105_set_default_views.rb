class SetDefaultViews < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:videos, :views, from: nil, to: 0)
  end
end
