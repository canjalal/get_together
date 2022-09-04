class Api::SessionsController < ApplicationController
  def show
    @user = current_user

    render 'api/users/show'
  end

  def create
    @user = User.find_by_credentials(params[:email], params[:password])
    if(@user)
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid'] }, status: :unauthorized
    end
  end

  def destroy
    if(current_user)
      logout!
      render json: { message: 'success' }
    end
  end
end
