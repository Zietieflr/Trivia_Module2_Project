// const form = document.getElementById('login')
const url = 'http://localhost:3000/users'
const users = []

fetch(url)
  .then(response => response.json())
  .then(results => getUsers(results))

function getUsers(usersData) {
  usersData.forEach(userData => {
    users.push({
      id: userData.id,
      username: userData.username, 
      password: userData.password
  })})
}

document.getElementById('new_user').addEventListener("click", verifyNewUser)
document.getElementById('existing_user').addEventListener("click", verifyExistingUser)

function getFieldData() {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  if (!username) {return alert('Please enter a username and/or password!')}
  if (!password) {return alert('Please enter a password!')}
  return {username: username, password: password}
}

function verifyNewUser() {
  const fieldData = getFieldData()
  confirmNewName(fieldData) ? userExists() : createUser(fieldData)
}

function confirmNewName(user) {
  let existingName = false
  users.forEach(userData => {
    if ( userData.username.localeCompare(user.username) === 0 ) {
      existingName = true
    }
  })
  return existingName
}

function userExists() {
  alert('Oh no! That username already exists!')
}

function createUser(user) {
  fetch(`http://localhost:3000/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then(results => redirectTo(results))
}

function redirectTo(user) {
  window.location.href = `http://localhost:3001/user.html?userId=${user.id}`
}

function verifyExistingUser() {
  const fieldData = getFieldData()
  confirmNewName(fieldData) ? login(fieldData) : wrongInfo()
}

function wrongInfo() {
  alert('That username does not match anything in our records!')
}

function login(user) {
  password(user) ? correctPassword(user) : wrongPassword()
}

function password(user) {
  let correctPassword = false
  users.forEach(userData => {
    if (userData.username.localeCompare(user.username) === 0 && userData.password.localeCompare(user.password) === 0) {
      correctPassword = true
    }
  })
  return correctPassword
}

function wrongPassword() {
  alert(`That password does not match our records for that username!`)
}

function correctPassword(user) {
  redirectTo(users.find(userData => userData.username === user.username))
}