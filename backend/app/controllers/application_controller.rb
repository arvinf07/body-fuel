class ApplicationController < ActionController::API
  
  
  private
  def current_user
    # @user ||= User.find_by_id(session[:user_id])
    User.find_by_id(session[:user_id])
  end

end
