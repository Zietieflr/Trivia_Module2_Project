class User < ApplicationRecord
  has_many :scorecards

  has_many :friended_users, foreign_key: :friender_id, class_name: 'Friend'
  has_many :friends, through: :friended_users

  has_many :requests, foreign_key: :friend_id, class_name: 'Friend'
  has_many :frienders, through: :requests
end
