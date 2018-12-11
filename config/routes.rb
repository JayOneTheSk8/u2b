Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'


  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show, :update] do
      resources :subscriptions, only: [:create, :show, :destroy]
      get 'videos', to: 'videos#user_videos'
      get 'likes', to: 'videos#liked_videos'
      get 'subscription_videos', to: 'videos#subscriptions'
    end
    resources :videos, except: [:new, :edit]  do
      post 'add_view', to: 'videos#add_view'
      resources :comments, only: [:show, :create, :update, :destroy]
      resources :ratings, only: [:index, :show, :update, :create, :destroy]
    end
    get 'search', to: 'users#search'
    get 'full_search', to: 'users#full_search'
  end
end
