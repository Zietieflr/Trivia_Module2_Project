class ScorecardsController < ApplicationController
  
  # def index
  #   @scorecards = Scorecards.all
  # end

  # def show
  #   @scorecard = Scorecard.find(params[:id])
  # end

  def create
    Scorecard.create(
      category: params[:category],
      difficulty: params[:difficulty],
      correct: params[:correct],
      user_id: params[:id]
    )
  end
end
