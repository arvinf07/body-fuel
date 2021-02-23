Rails.application.routes.draw do
  resources :meals
  resources :foods
  resources :meal_foods, only: [:destroy]

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
