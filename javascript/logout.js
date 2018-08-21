function logout() {                                          /* Vai servir para sair da página com o utilizador logado */
    localStorage.removeItem("utilizador");
    localStorage.removeItem("modo");
    window.location.href = "prehome.html";
}
