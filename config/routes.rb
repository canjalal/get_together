Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
  
    resources :users, only: [:show, :create]
    resource :session, only: [:show, :create, :destroy]
    resources :keywords, only: [:index]
    resources :groups, only: [:create, :show, :update, :index, :destroy] do
      resources :memberships, only: [:create]
    end
    resources :memberships, only: [:destroy]
    resources :events, only: [:create, :show, :update, :index]
  end

  get '*path', to: "static_pages#frontend_index" # should be last route, as a fallback
end
