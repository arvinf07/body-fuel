class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      byebug
      session[:user_id] = user.id
      render json: user.to_json({ include: {meals: {include: :meal_foods}}, except: [:password_digest] })
    else
      errors = user.errors.full_messages
      render json: errors.to_json
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :age, :password, :password_confirmation, :gender, :height, :weight)
  end
end
