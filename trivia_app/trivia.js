const searchParams = new URLSearchParams (window.location.search)
const user = searchParams.get('user')
const amount = searchParams.get('amount')
const category = searchParams.get('category')
let categoryText = "Any"
const difficulty = searchParams.get('difficulty')
const $trivia = document.getElementById('trivia')
const $getResults = document.getElementById('results')
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
  holdResults(results)
  console.log('catetegoryText:', categoryText)
}

function holdResults(results) {
  return results 
}

function useableCategories(categories) {
  const selectedCategory = thisCategory(categories)
  changeCategoryName(selectedCategory)
}

function thisCategory(firstCategory) {
  if (category != 'any') {
    categoryText = firstCategory
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
  $li.className = 'question'
  $li.innerHTML = `${questionAndAnswers.question}`
  displayAnswers(questionAndAnswers.incorrect_answers, questionAndAnswers.correct_answer, $li, i)
}

function displayAnswers(wrongs, correct, $li, i) {
  correct_answers.push(correct)
  const answers = [decodeHTML(correct)]
  console.log(correct)
  wrongs.forEach(wrong => answers.push(wrong))
  answers.sort()
  populateAnswers(answers, $li, i)
}

function decodeHTML(html) {
  const $translation = document.createElement('textarea')
  $translation.innerHTML = html
  return $translation.value
}

function populateAnswers(answers, $li, i) {
  const $container = document.createElement('ul')
  $container.className = 'answerContainer'
  answers.forEach(answer => answerOption(answer, $container, i))
  $li.appendChild($container)
}

function answerOption(answer, $container, i){
  const $li = document.createElement('li')
  $li.innerHTML = `<label class="answers"><input type="radio" name="question${i}answer" value="${answer}" /> ${answer}</label>`
  $container.append($li)
}

function addToPage($li) {
  $trivia.append($li)
}

$getResults.addEventListener('click', displayResults)

function displayResults() {
  tallyCorrect()
  // createScorecard()
  // highlightCorrect()
  // userPage()
}

function tallyCorrect() {
  const $answerContainer = $trivia.querySelectorAll('.answerContainer')
  const numberCorrect = {count: 0}
  $answerContainer.forEach((questionAnswers, i) => parseSelected(questionAnswers, i, numberCorrect))
  createScorecard(numberCorrect.count)
}

function parseSelected(questionAnswers, i, numberCorrect) {
  const $selected = `input[name=question${i}answer]:checked`
  const $userAnswer = (questionAnswers.querySelector($selected) || {}).value
  if ($userAnswer === correct_answers[i]) {
    numberCorrect.count++
  }
}

function createScorecard(numberCorrect) {
  const scorecard = {
    'category': `${categoryText}`,
    'difficulty': `${capitalizeFirstLetter(difficulty)}`,
    'correct': `${numberCorrect}`,
    'user_id': `${user}`,
  }
  fetch('http://localhost:3000/scorecards', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(scorecard),
  })
    // .then(response => response.json())
    // .then(results => console.log('Success:', results))
}