const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('userId')
const hidden_name_id = document.getElementById('user_name_id')
hidden_name_id.value = id
console.log(hidden_name_id)
fetch(`http://localhost:3000/users/${id}`)  
    .then(response => response.json())
    .then(result => nameAndCards(result))



function nameAndCards(result){
    renderUserInfo(result.username, result.scorecards)
    renderScorecardInfo(result.scorecards)
    renderDifficulty(result.scorecards)
    renderCorrect(result.scorecards)
    displayScorecards(result.scorecards)
}

function displayScorecards(scorecards) {
    const scorecard_div = document.getElementById('scorecards')
    console.log(scorecard_div)
    scorecards.forEach(scorecard => {showScoreCards(scorecard, scorecard_div)})
}

function showScoreCards(scorecard, scorecard_div) {
        console.log(scorecard_div)
        const fullScorecard = document.createElement('ul')
        fullScorecard.append(renderScorecardInfo(scorecard.category), renderDifficulty(scorecard.difficulty), renderCorrect(scorecard.correct))
        scorecard_div.append(fullScorecard)
}


const showUser = document.getElementById('show-user')
const showScorecards = document.getElementById('scorecard-list')
const showDifficulty = document.getElementById('difficulty')
const showCorrect = document.getElementById('percent')
const showFullCard = document.getElementById('full-card')


function renderUserInfo(username){
    const nameElement = document.createElement('h1')
    nameElement.innerText = username
    showUser.append(nameElement)
}

function renderScorecardInfo(category){
        const scorecardList = document.createElement('li')
        scorecardList.classList.add('category')
        scorecardList.innerText = category
        return scorecardList    
}

function renderDifficulty(difficulty){
        const scorecardDifficulty = document.createElement('li')
        scorecardDifficulty.classList.add('difficulty')
        scorecardDifficulty.innerText = difficulty
        return scorecardDifficulty
}

function renderCorrect(correct){
        const scorecardCorrect = document.createElement('li')
        scorecardCorrect.classList.add('correct')
        scorecardCorrect.innerText = correct
        return scorecardCorrect
}


fetch(`http://localhost:3000/users/${id}`)
    .then(response => response.json())
    .then(results => friendsListOptions(results))

function friendsListOptions(results){
    const select = document.getElementById('Friends-List')
    results.friends.forEach(friend => {
        const option = document.createElement('option')
        option.innerHTML = `<a href='http://localhost:3000/users/${friend.id}'>${friend.username}</a>`
        select.append(option)
    })
}


fetch(`https://opentdb.com/api_category.php`)
    .then(response => response.json())
    .then(results => categorySelector(results))


function categorySelector(results){
    console.log(results)
    const category_select = document.getElementById('Category-List')
    results.trivia_categories.forEach(trivia_category => {
        const category_option = document.createElement('option')
        category_option.innerText = `${trivia_category.name}`
        category_select.append(category_option)
    })
}

