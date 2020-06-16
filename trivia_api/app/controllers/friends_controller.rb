class FriendsController < ApplicationController
  before_action only: [:show, :destroy]
  def index
    @friends = Friend.all
    render json: @friends
  end

  def show
    render json: @friend
  end

  def create
    @friend = Friend.create(
      friend_id: params[:friend_id],
      friender_id: params[:friender_id]
    )
  end

  def destroy
    @friend.destroy 

    render status: :no_content
    # redirect_to Reload page? 
  end

  def find_friend
    @friend = Friend.params[:id]
  end
end
