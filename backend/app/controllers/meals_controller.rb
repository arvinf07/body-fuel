class MealsController < ApplicationController
  
  def index
    ## meals = Meals where created_at is today
    ## formatt return data to include meal name, food name and macros, and meal_foods amount
  end

  def create 
    Meal.create(meal_params)
  end

  def edit
    
  end

  private
  def meal_params
    params.require(:meal).permit(:name, meal_foods_attributes: [:food_id, :amount])
  end
end
