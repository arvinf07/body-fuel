
class MealFoodsController < ApplicationController

  def destroy
    byebug
    MealFood.find_by(params[:id])
  end

end