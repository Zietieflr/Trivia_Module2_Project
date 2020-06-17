// const form = document.getElementById('login')
const url = 'http://localhost:3000/users'

fetch(url)
  .then(response => response.json())
  .then(getResults = results => results)

document.getElementById('new_user').addEventListener("click", createAccount(getResults()))
document.getElementById('existing_user').addEventListener("click", login(getResults()))


function createAccount(results) {
  const filled_form = new FormData(document.querySelector('form'))
  console.log(filled_form)
  // results.includes
}

function login(results) {
  // return window.location.replace(`"http://localhost:3001/user.html?userId=${@user.id}"`)
}

