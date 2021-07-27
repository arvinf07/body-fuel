class SessionsController < ApplicationController
  def create
    if user = User.find_by_username(params[:username])&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user.to_json({ include: {meals: {include: :meal_foods}},  except: %i[created_at updated_at password_digest] })
    else
      errors = user.errors.full_messages
      render json: errors.to_json
    end
  end

  # def destroy
  #   reset_session
  # end
end
