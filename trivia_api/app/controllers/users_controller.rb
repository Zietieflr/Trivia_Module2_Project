class UsersController < ApplicationController
  before_action :find_user, only: [:show, :destroy, :update]

  def index
    @users = User.all

    render json: @users, include: [:scorecards, :friends] 
  end

  def show
    render json: @user, include: [:scorecards, :friends]
    # redirect_to "http://localhost:3001/user.html?userId=#{@user.id}"
  end

  def create
    @user = User.create(
      username: params[:username],
      password: params[:password]
    )
    # redirect_to "http://localhost:3001/user.html?userId=#{@user.id}"
    render json: @user, include: [:scorecards, :friends]
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

  def go_to_trivia
    @trivia = {
      hidden_name_id: params[:hidden_name_id],
      trivia_categories: params[:trivia_categories],
      difficulty: params[:difficulty],
      number_of_questions: params[:number_of_questions]
    }
    redirect_to "http://localhost:3001/trivia.html?user=#{@trivia[:hidden_name_id]}&amount=#{@trivia[:number_of_questions]}&category=#{@trivia[:trivia_categories]}&difficulty=#{@trivia[:difficulty]}"
  end
end
