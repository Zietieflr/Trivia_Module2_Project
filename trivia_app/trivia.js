const searchParams = new URLSearchParams (window.location.search)
const user = searchParams.get('user')
const amount = searchParams.get('amount')
const category = searchParams.get('category')
const difficulty = searchParams.get('difficulty')

let triviaURL = `https://opentdb.com/api.php?amount=${amount}`
if (category != 'any') {
  triviaURL = `${triviaURL}&category=${category}`
}
if (difficulty != 'any') {
  triviaURL = `${triviaURL}&difficulty=${difficulty}`
}
const finalURL = `${triviaURL}&type=multiple`
const apiURL = `http://localhost:3000/users/${user}`


// console.log('url', triviaURL)
console.log('final url', finalURL)
// console.log('difficulty', difficulty)

// const testURL = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple'
// const testBaseURL = 'https://opentdb.com/api.php?amount=10'
fetch('https://opentdb.com/api_category.php')
  .then(response => response.json())
  .then(results => useableCategories(results))

fetch(finalURL)
  .then(response => response.json())
  .then(results => console.log('results', results))

fetch(apiURL)
  .then(response => response.json())
  .then(result => populateUserInfo(result))

function useableCategories(categories) {
  const selectedCategory = thisCategory(categories)
  changeCategoryName(selectedCategory)
}

function thisCategory(categories) {
  if (category != 'any') {
    return categories.trivia_categories[category].name
  } else {
    const any = 'All categories'
    return any
  }
}

function changeCategoryName(categoryText) {
  const $category = document.getElementById('category')
  $category.innerText = categoryText
}

function populateUserInfo(user) {
  username(user.username) 
}

function username(name) {
  const $username = document.getElementById('username')
  $username.innerText = name 
}

function populateTriviaInfo(trivia) {
  
}
