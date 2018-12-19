class AddPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :playlists, :jsonb, default: { watched: [], likes: [], watch_later: [] }
  end
end
