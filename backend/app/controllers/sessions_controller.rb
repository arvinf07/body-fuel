class SessionsController < ApplicationController

  def create
    if user = User.find_by_username(params[:username])&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user.to_json({include: [:meals], except: [:created_at, :updated_at]})
    else
      # just do catch the error in the async function
      redirect_to new_session_path, alert: "The password and/or email are incorrect"
    end
  end

  # def destroy
  #   reset_session
  # end

end
