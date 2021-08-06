class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  
  private
  def current_user
    # @user ||= User.find_by_id(session[:user_id])
    User.find_by_id(session[:user_id])
  end
end
