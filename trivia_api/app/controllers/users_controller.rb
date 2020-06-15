class UsersController < ApplicationController
  before_action :find_user, only: [:show, :destroy, :update]

  def show
    render json: @user, include: :scorecards
  end

  def create
    @user = User.create(
      username: params[:username],
      password: params[:password]
    )
    render json: @user
  end

  def destroy
    @user.scorecards.destroy_all
    @user.destroy
    render status: :no_content
    # redirect_to LOGIN
  end

  def update
    @user.update(
      username: params[:username],
      password: params[:password]
    )

    render json: @user, include: :scorecards
  end

  def find_user
    @user = User.find(params[:id])
  end
end
