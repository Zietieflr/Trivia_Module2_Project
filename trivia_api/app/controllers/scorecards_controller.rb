class ScorecardsController < ApplicationController
  
  def index
    @scorecards = Scorecard.all
    render json: @scorecards 
  end

  # def show
  #   @scorecard = Scorecard.find(params[:id])
  # end

  def create
    @scorecard = Scorecard.create(
      category: params[:category],
      difficulty: params[:difficulty],
      correct: params[:correct],
      user_id: params[:user_id]
    )
    render json: @scorecard
  end
end
