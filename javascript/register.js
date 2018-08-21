"use strict";


var usersForm;
var loginForm;
var users;
var user;
var mail;
var dateNasc;
var passWord;
var array;
var pass;
var utili;

document.addEventListener("DOMContentLoaded", function(event) {
    mainFunction()
});

function mainFunction(){
  users = 0;
  usersForm = document.forms.regi;
  loginForm = document.forms.tentUse;
  usersForm.elements.saveUsers.addEventListener("click", addUser);
}

function addUser(){
  array =[]
  user = usersForm.elements.username.value;      /* Dar às variáveis o valor que é colocado nos inputs no regito */
  mail = usersForm.elements.email.value;
  dateNasc = usersForm.elements.data.value;
  passWord = usersForm.elements.password.value;
  var tudoPren = true;
                                                 /* Vai servir para dar um alert se algum campo do registo não tiver preenchido */
  if(user == ""){
    tudoPren = false;
  }

  else if (mail == ""){
    tudoPren = false;
  }
  else if (dateNasc == "") {
    tudoPren = false;
  }
  else if (passWord == "") {
    tudoPren = false;
  }

  if (tudoPren === false){
      alert("Preencha todos os campos do Formulário");
      return tudoPren;
  }
  array = [user, mail, dateNasc, passWord];

  if (localStorage.getItem("user" + user) === null){    /* Se o valor do input do user for null, este vai registar, porque vê que o user ainda não foi utilizado */
    localStorage.setItem("user" + user, array)

    alert("Está registado");
    users++;
    document.forms.regi.reset()       /* Faz reset dos valores inseridos nos inputs */
  }
  else{
    alert("Esse utilizador já existe ou mail já existem");
  }
}


function thelogin(){
  pass = loginForm.elements.pwd.value;      /* Dar às variáveis os valores que é colocado nos inputs no login */
  utili = loginForm.elements.user.value;

  if (localStorage.getItem("user" + utili) == null){  /* Na localStorage vai ver se o user posto no input existe se for null  é porque não existe */
    alert("Não existe");
  }
  else{
    var o= localStorage.getItem("user" + utili).split(",")[3]   /* Dar à variável o o valor da posição 4 do array que é a password */
    o = o.replace('"','');
    o = o.replace('"','');
    o = o.replace(']','');
    console.log(o);
    if (o === pass ){                                           /* Se o valor inserido for igual à password vai entrar na página home */
      var logUser = localStorage.getItem("user" + utili).split(",")[0];
      logUser = logUser.replace('[','');
      logUser = logUser.replace('"','');
      logUser = logUser.replace('"','');
      localStorage.setItem("utilizador", logUser);
      window.location.href = "home.html";
    }
    else{
      alert("Utilizador ou Password incorreta");
    }
  }
}

function logout() {                                          /* Vai servir para sair da página com o utilizador logado */
    localStorage.removeItem("utilizador");
    localStorage.removeItem("modo");
    window.location.href = "prehome.html";
}
