# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Friend.destroy_all
Scorecard.destroy_all
User.destroy_all

austin = User.create(username: "AwesomeA", password: "aGoodOne")
logan = User.create(username: "LaconicL", password: "aBadOne")
un1 = User.create(username: "UN1", password: "aBadOne")
un2 = User.create(username: "UN2", password: "aBadOne")
un3 = User.create(username: "UN3", password: "aBadOne")

Scorecard.create(category: "Music", difficulty: "Medium", correct: 0.89, user: austin)
Scorecard.create(category: "Music", difficulty: "Hard", correct: 0.56, user: austin)
Scorecard.create(category: "Obscure", difficulty: "Hard", correct: 0.93, user: austin)
Scorecard.create(category: "That one", difficulty: "Hard", correct: 0.8, user: austin)
Scorecard.create(category: "Stuff", difficulty: "Medium", correct: 0.78, user: logan)
Scorecard.create(category: "Dragons", difficulty: "Hard", correct: 0.30, user: logan)
Scorecard.create(category: "Something Else", difficulty: "Easy", correct: 0.22, user: logan)
Scorecard.create(category: "DONE", difficulty: "Easy", correct: 0.90, user: logan)

Friend.create(friend: logan, friender: austin)
Friend.create(friend: austin, friender: logan)
Friend.create(friend: un1, friender: logan)
Friend.create(friend: un2, friender: austin)
Friend.create(friend: austin, friender: un1)
Friend.create(friend: austin, friender: un2)
Friend.create(friend: austin, friender: un3)
