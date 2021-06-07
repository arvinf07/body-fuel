class UsersController < ApplicationController

  def edit
    current_user
  end

  def update

  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to user_workouts_path(@user)
    else
      @errors = @user.errors.full_messages
      render 'new'
    end  
  end
  
  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :height, :weight)
  end
  
end
