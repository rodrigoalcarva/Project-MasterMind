"use strict";

var cores = ["yellow","green","red","blue","orangered","brown"];
var cores1 = -1;
var tentativa = document.getElementsByClassName("corTentativa");
var blackWhite = document.getElementsByClassName("pretoEbranco");
var SecretCode;
var tentativa;
var tent;
var placesCor;
var lasTentativas;
var modo;
var theplays = 0;
var vitorias = 0;
var derrotas = 0;

document.addEventListener("DOMContentLoaded", function(event) {
    mainFunction()
});

function theSecret() {  /*Aqui vai ser definido o código secreto do jogo */
  lasTentativas = 0;
  tent = tentativa.length;
  placesCor = blackWhite.length;
  var contagem = 0;
  SecretCode = [];
  while (contagem < 4){
    var num = cores[Math.floor((Math.random() * 6))]
    if (!(SecretCode.includes(num))){                   /*Esta é a forma de não haver repetições de cores em que se num array não existir essa cor faz push para esse array */
      SecretCode.push(num);
      contagem ++;
    }
  }
  document.getElementById('check').disabled=false;
  for (var i= 0;i<tent;i++){                           /*Aqui vai colocar os botões das tentativas bloqueados e brancos */
    tentativa[i].disabled = true;
    tentativa[i].style.backgroundColor = "white";
    document.getElementById("textAlea").innerHTML = ""
    document.getElementById("feedBack").innerHTML = ""
    document.getElementById("pontu").innerHTML = "";
  }
  for (var i = 0; i < placesCor; i++) {
      blackWhite[i].style.backgroundColor = "transparent";
    }
  secret1.style.backgroundColor = "rgb(0, 179, 107)";
  secret2.style.backgroundColor = "rgb(0, 179, 107)";
  secret3.style.backgroundColor = "rgb(0, 179, 107)";
  secret4.style.backgroundColor = "rgb(0, 179, 107)";
  return SecretCode;
}



function adivinha() {                                       /*Define aqui como se faz para adivinhar a sequencia secreta */
  for (var i= (tent-4);i<tent;i++){
    tentativa[i].disabled = false;
    tentativa[i].addEventListener("click", theColor);
  }
}

function theColor() {               /* Esta função vai percorrer o array das cores e a cada clique vai mostrando a cor */
    if (cores1 < 5) {
      cores1 ++;
    }
    else {
      cores1 -= 5;
    }
    this.style.backgroundColor = cores[cores1];
}

var l;
function game(){                  /* Função que vai definir quase tudo do jogo */
  var points = 110;
  var infor =[];
  var teamCores = true;
  for (var i= (tent-4);i<tent;i++){                             /* Este for vai fazer que seja preciso colocar todas as cores, se não puser, dá um alert */
    if(!cores.includes(tentativa[i].style.backgroundColor)){
      teamCores = false;
      alert("Coloque todas as cores pff")
      i = tent;
    }
  }
  if (teamCores){
    for (var i= (tent-4);i<tent;i++){
      tentativa[i].disabled = true;
      infor.push(tentativa[i].style.backgroundColor);
    }

    var l = 0;                                                    /*Nesta parte vai ser a parte das peças pretas brancas e pretas */
    var l1 = 0;
    for (var i in infor){
      if (SecretCode[i] === infor[i]){
        l++;
      }
    }
    for (var i in infor){
      if (SecretCode.includes(infor[i])){
        l1++;
      }
    }

    if (l  === SecretCode.length){
      tentativa[i].disabled = true;
      parar();
      var array = [];
      var min = document.getElementById("Minutos").innerHTML;
      var seg = document.getElementById("Segundos").innerHTML;
      var mic = document.getElementById("Centesimas").innerHTML;
      array = [min + seg + mic];
      var valores = [];
      var pontus = (points - 10 * lasTentativas);
      if (localStorage.getItem("G10Tent") != null){
        theplays = 1 + parseInt(localStorage.getItem("G10Tent"));
        localStorage.setItem("G10Tent", theplays);
      }
      else{
        theplays = 1;
        localStorage.setItem("G10Tent", theplays);
      }
      if (localStorage.getItem("Vitorias") != null){
        vitorias = 1 + parseInt(localStorage.getItem("Vitorias"));
        localStorage.setItem("Vitorias", vitorias);
      }
      else{
        vitorias = 1;
        localStorage.setItem("Vitorias", vitorias);
      }
      secret1.style.backgroundColor = SecretCode[0];
      secret2.style.backgroundColor = SecretCode[1];
      secret3.style.backgroundColor = SecretCode[2];
      secret4.style.backgroundColor = SecretCode[3];
      document.getElementById("feedBack").innerHTML = "Ganhou!!!"
      document.getElementById("pontu").innerHTML = pontus;
      document.getElementById('newGame').disabled=false;
      document.getElementById('check').disabled=true;
      document.getElementById("textAlea").innerHTML = "Você é muito forte!";
      valores =[localStorage.getItem("utilizador"), modo, pontus, array];
      localStorage.setItem("valores" + localStorage.getItem("utilizador"), valores );
    }

    else if (lasTentativas === 9){
      tentativa[i].disabled = true;
      parar();
      if (localStorage.getItem("G10Tent") != null){
        theplays = 1 + parseInt(localStorage.getItem("G10Tent"));
        localStorage.setItem("G10Tent", theplays);
      }
      else{
        theplays = 1;
        localStorage.setItem("G10Tent", theplays);
      }
      if (localStorage.getItem("Derrotas") != null){
        derrotas = 1 + parseInt(localStorage.getItem("Derrotas"));
        localStorage.setItem("Derrotas", derrotas);
      }
      else{
        derrotas = 1;
        localStorage.setItem("Derrotas", derrotas);
      }
      secret1.style.backgroundColor = SecretCode[0];
      secret2.style.backgroundColor = SecretCode[1];
      secret3.style.backgroundColor = SecretCode[2];
      secret4.style.backgroundColor = SecretCode[3];
      document.getElementById("feedBack").innerHTML = "Perdeu!";
      document.getElementById("textAlea").innerHTML = "Tente Novamente!";
      document.getElementById("pontu").innerHTML = 0;
      document.getElementById('newGame').disabled=false;
      document.getElementById('check').disabled=true;
    }

    else{
      gerar();
      var corP = l;                                                       /*Define os divs que vão ter peça preta */
      var corB = l1 - l;                                                  /*Define os divs que vão ter peça branca */
      for (var i = placesCor - 4; i < placesCor; i++) {
        if (corP > 0) {
          blackWhite[i].style.backgroundColor = "black";
          corP --;
        }
        else if (corB > 0) {
          blackWhite[i].style.backgroundColor = "white";
          corB --;
        }
      }
      tent -=4;
      placesCor -=4;
      lasTentativas ++;
    }
  }
}


/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/
function mainFunction(){
  document.getElementById('check').disabled=true;
  modo= "Jogo 10 Tentativas";
  document.getElementById("theUser1").innerHTML = localStorage.getItem("utilizador");
  localStorage.setItem("Modo", modo);
  document.getElementById("newGame").addEventListener("click", theSecret);
  document.getElementById("newGame").addEventListener("click", adivinha);
  document.getElementById("newGame").addEventListener("click", reinicio);
  document.getElementById("newGame").addEventListener("click", inicio);
  document.getElementById("check").addEventListener("click", game);
  document.getElementById("check").addEventListener("click", adivinha);

}


/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/
var frases;
var rand;
function gerar() {                                  /*Vai gerar frases aleatórias a cada jogada que o jogador falha */
  frases = new Array();
  frases[0] = "Nem lá perto";
  frases[1] = "Continue a tentar";
  frases[2] = 'Quer mesmo jogar ?';
  frases[3] = 'Esforçe-se mais'
  frases[4] = 'Errooou'
  frases[5] = 'A tentativa já era'
  frases[6] = 'Tem qualidade para isto ?'
  frases[7] = 'Devia treinar mais'
  frases[8] = 'Você está todo trocado'
  frases[9] = 'Tenha cabeça!'
  frases[10] = "Uma ajudinha ?"
  rand = Math.floor((Math.random() * frases.length));
  document.getElementById("textAlea").innerHTML = frases[rand];

}
/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/
/*Vai ser o cronometro */

var centesimas = 0;
var segundos = 0;
var minutos = 0;
var control;

function inicio () {
	control = setInterval(cronometro,10);

}
/*-------------------------------------------------------------------------*/

function parar () {
	clearInterval(control);
}

/*-------------------------------------------------------------------------*/

function reinicio () {
	clearInterval(control);
	centesimas = 0;
	segundos = 0;
	minutos = 0;
	Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = "00";
}

/*-------------------------------------------------------------------------*/

function cronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
		Centesimas.innerHTML = ":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		Segundos.innerHTML = ":"+segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		Minutos.innerHTML = minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}

}
