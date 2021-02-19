class MealsController < ApplicationController
  
  def index
   ## meals = Meals where created at is today
    
  end

  private
  def meal_params
    params.require(:meal).permit(:name, meal_foods_attributes: [:food_id, :amount])
  end
end
