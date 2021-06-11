class UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user.to_json
    else
      errors = user.errors.full_messages
      # render json: errors.to_json DOES THIS WORK?
    end  
  end
  
  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :height, :weight)
  end

end
