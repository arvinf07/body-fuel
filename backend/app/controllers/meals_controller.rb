class MealsController < ApplicationController
  
  def index
    ## meals = Meals where created_at is today
    ## formatt return data to include meal name, food name and macros, and meal_foods amount
    meals = Meal.all
    render json: meals.to_json(include: [:meal_foods])
  end 

  def update
    meal = Meal.find_by(id: params[:id])
    meal.meal_foods.build(meal_id: meal, food_id: params['meal']['meal_foods_attributes']['food_id'].to_i, amount: params['meal']['meal_foods_attributes']['amount'].to_i )
    meal.save
    render json: meal.to_json(include: {foods: {except: [:created_at, :updated_at]}})
  end

  private
  #no implicit conversion of string into integer
  def meal_params
    ##call switch to int here before permitting params
    params.require(:meal).permit(:name, meal_foods_attributes: [:food_id, :amount])
  end

  def switch_to_int(params)
    params['meal']['meal_foods_attributes']['food_id'] = params['meal']['meal_foods_attributes']['food_id'].to_i
    params['meal']['meal_foods_attributes']['amount'] = params['meal']['meal_foods_attributes']['amount'].to_i
  end

end
