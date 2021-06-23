class FoodsController < ApplicationController
  def index
    foods = Food.all
    render json: foods.to_json
  end
end
