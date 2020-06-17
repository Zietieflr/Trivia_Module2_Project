const searchParams = new URLSearchParams (window.location.search)
const user = searchParams.get('user')
const amount = searchParams.get('amount')
const category = searchParams.get('category')
const difficulty = searchParams.get('difficulty')
const $trivia = document.getElementById('trivia')
const correct_answers = []

let triviaURL = `https://opentdb.com/api.php?amount=${amount}`
if (category != 'any') {
  triviaURL = `${triviaURL}&category=${category}`
}
if (difficulty != 'any') {
  triviaURL = `${triviaURL}&difficulty=${difficulty}`
}
const finalURL = `${triviaURL}&type=multiple`
const apiURL = `http://localhost:3000/users/${user}`

// console.log('final url', finalURL)

// fetch('https://opentdb.com/api_category.php')
//   .then(response => response.json())
//   .then(results => populateUniversalProperties(results))

fetch(finalURL)
  .then(response => response.json())
  .then(results => populatePage(results.results))

fetch(apiURL)
  .then(response => response.json())
  .then(result => populateUserInfo(result))

function populatePage(results) {
  useableCategories(results[0].category)
  displayDifficulty(difficulty)
  populateTriviaInfo(results)
}

function useableCategories(categories) {
  const selectedCategory = thisCategory(categories)
  changeCategoryName(selectedCategory)
}

function thisCategory(firstCategory) {
  if (category != 'any') {
    return firstCategory
  } else {
    const any = 'All categories'
    return any
  }
}

function changeCategoryName(categoryText) {
  const $category = document.getElementById('category')
  $category.innerText = categoryText
}

function displayDifficulty(difficulty) {
  const $difficulty = document.getElementById('difficulty')
  $difficulty.innerText = capitalizeFirstLetter(difficulty)
}

function capitalizeFirstLetter(word) {
  return word.toLowerCase().charAt(0).toUpperCase() + word.slice(1)
}

function populateUserInfo(user) {
  username(user.username) 
}

function username(name) {
  const $username = document.getElementById('username')
  $username.innerText = name 
}

function populateTriviaInfo(trivia) {
  const $ol = document.createElement('ol')
  trivia.forEach((questionAndAnswers, i) => {
    const $li = document.createElement('li')
    displayQuestion(questionAndAnswers, $li, i)
    $ol.append($li)
  })
  addToPage($ol)
}

function displayQuestion(questionAndAnswers, $li, i) {
  // const $ul = document.createElement('ul')
  $li.className = 'question'
  $li.innerText = questionAndAnswers.question
  displayAnswers(questionAndAnswers.incorrect_answers, questionAndAnswers.correct_answer, $li, i)
  // $li.append($ul) 
}

function displayAnswers(wrongs, correct, $li, i) {
  correct_answers.push(correct)
  const answers = [correct]
  wrongs.forEach(wrong => answers.push(wrong))
  answers.sort()
  populateAnswers(answers, $li, i)
}

function populateAnswers(answers, $li, i) {
  const $container = document.createElement('ul')
  answers.forEach(answer => answerOption(answer, $container, i))
  $li.appendChild($container)
}

function answerOption(answer, $container, i){
  const $li = document.createElement('li')
  $li.innerHTML = `<label><input type="radio" name="question${i}answer" value="${answer}" /> ${answer}</label>`
  $container.append($li)
}

function addToPage($li) {
  $trivia.append($li)
}