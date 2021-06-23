class MealFoodsController < ApplicationController
  def destroy
    MealFood.find_by(id: params[:id]).delete
  end
end
