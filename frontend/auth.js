// Authentication functionality
function handleLogin(event) {
  event.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // Simulate login (in real app, this would call your backend API)
  if (email && password) {
    const user = {
      name: email.split("@")[0],
      email: email,
      isAdmin: false,
    }

    localStorage.setItem("user", JSON.stringify(user))
    alert("Login successful!")
    window.location.href = "index.html"
  } else {
    alert("Please fill in all fields")
  }
}

function handleRegister(event) {
  event.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirmPassword").value

  if (password !== confirmPassword) {
    alert("Passwords do not match")
    return
  }

  if (name && email && password) {
    const user = {
      name: name,
      email: email,
      isAdmin: false,
    }

    localStorage.setItem("user", JSON.stringify(user))
    alert("Registration successful!")
    window.location.href = "index.html"
  } else {
    alert("Please fill in all fields")
  }
}

function logout() {
  localStorage.removeItem("user")
  window.location.href = "login.html"
}

// Check if user is logged in
function checkAuth() {
  const user = JSON.parse(localStorage.getItem("user"))
  if (user) {
    const userNameElement = document.getElementById("user-name")
    if (userNameElement) {
      userNameElement.textContent = `Welcome, ${user.name}!`
    }
  }
}

// Initialize auth check
document.addEventListener("DOMContentLoaded", checkAuth)
