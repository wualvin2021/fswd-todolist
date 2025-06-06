Rails.application.routes.draw do
  root 'static_pages#index'

  namespace :api do
    resources :users, only: [:create]

    get    'tasks'                    => 'tasks#index'
    post   'tasks'                    => 'tasks#create'
    get    'tasks/:id'                => 'tasks#show'
    put    'tasks/:id'                => 'tasks#update'
    put    'tasks/:id/mark_complete'  => 'tasks#mark_complete'
    put    'tasks/:id/mark_active'    => 'tasks#mark_active'
    delete 'tasks/:id'                => 'tasks#destroy'
  end

  get '*path' => redirect('/')

end