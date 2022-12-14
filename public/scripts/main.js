
let nav = document.querySelector('nav');
if(getCurrentUser()) {
  window.location.href = "note.html";
} else {
  nav.innerHTML = `
    <ul>
      <li><a href="login.html">Login</a></li>
      <li><a href="register.html">Sign Up</a></li>
    </ul>
  `
}
let logout = document.getElementById("logout-btn");
if(logout) logout.addEventListener('click', removeCurrentUser)

function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
  window.location.href = "note.html";
}

// getting current user function
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

// logout function for current user
function removeCurrentUser() {
  localStorage.removeItem('user');
  window.location.href = "login.html";
}