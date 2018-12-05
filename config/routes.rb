Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'


  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show] do
      get 'videos', to: 'videos#user_videos'
      get 'likes', to: 'videos#liked_videos'
    end
    get 'latest', to: 'videos#latest'
    get 'search', to: 'users#search'
    get 'full_search', to: 'users#full_search'
    resource :session, only: [:create, :destroy]
    resources :videos, except: [:new, :edit]  do
      post 'add_view', to: 'videos#add_view'
      resources :comments, only: [:show, :create, :update, :destroy]
      resources :ratings, only: [:index, :show, :update, :create, :destroy]
    end
  end
end
