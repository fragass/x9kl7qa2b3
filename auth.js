// auth.js

function checkAuth() {
  const loggedIn = localStorage.getItem("loggedIn");
  const currentPage = window.location.pathname.split("/").pop();

  if (!loggedIn && currentPage !== "index.html") {
    window.location.href = "index.html";
  }

  if (loggedIn && currentPage === "index.html") {
    window.location.href = "main.html";
  }
}

document.addEventListener("DOMContentLoaded", checkAuth);

// Função de login
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;

      // Faz requisição ao endpoint /api/login
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass })
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "main.html";
      } else {
        alert("Usuário ou senha inválidos!");
      }
    });
  }
});

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}