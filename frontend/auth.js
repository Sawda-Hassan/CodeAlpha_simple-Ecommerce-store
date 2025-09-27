// REGISTER function
async function handleRegister(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    return alert("Passwords do not match!");
  }

  try {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    // ✅ Personalized success alert
    alert(`User created successfully! Welcome, ${data.user.name} 🎉`);

    // Redirect to login page
    window.location.href = "login.html";
  } catch (err) {
    alert(err.message);
  }
}

// LOGIN function
async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Save JWT + user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ Personalized login alert
    alert(`Welcome back, ${data.user.name}! 🎉`);

    // Redirect to home page
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
}

// Attach these functions to form submit events
document.getElementById("registerForm")?.addEventListener("submit", handleRegister);
document.getElementById("loginForm")?.addEventListener("submit", handleLogin);
