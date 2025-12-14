// auth.js

function checkAuth() {
  const loggedIn = localStorage.getItem("loggedIn");
  const page = window.location.pathname.split("/").pop();

  if (!loggedIn) {
    // só redireciona se não estiver logado e não for a página de login
    if (page !== "index.html") {
      window.location.href = "index.html";
    }
  } else {
    // se já estiver logado e tentar acessar login, manda para main.html
    if (page === "index.html") {
      window.location.href = "main.html";
    }
  }
}

// Executa a verificação ao carregar
document.addEventListener("DOMContentLoaded", checkAuth);

// Função de login
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass })
      });

      if (!res.ok) {
        alert("Erro ao validar login. Status: " + res.status);
        return;
      }

      const data = await res.json();
      if (data.success) {
        // salva login ANTES de redirecionar
        localStorage.setItem("loggedIn", "true");
        // usa replace para não voltar ao index no histórico
        window.location.replace("main.html");
      } else {
        alert("Usuário ou senha inválidos!");
      }
    } catch (err) {
      alert("Erro de conexão ao validar login.");
    }
  });
});

// Função de logout
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.replace("index.html");
}
