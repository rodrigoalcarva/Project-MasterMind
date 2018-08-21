"use strict";


  var table
  var row;
  var cell1;
  var cell2;
  var cell3;
  var cell4;
  var cicle = 0;
  var val = [];
  var tableta;

  document.addEventListener("DOMContentLoaded", function(event) {
      mainFunction()
  });


function mainFunction(){
  table = document.getElementById("ranking").getElementsByTagName("tbody")[0]; /* Vai buscar ao id "ranking" que é uma tabela e defini-lo como table */
  if (cicle >= 1) {
    while (table.rows.length > 1) {
      table.deleteRow(1);                  /* Vai servir para não repetir linhas da tabela*/
    }
  }

  for (var i in localStorage){
    if (i[0] === "v"){                                    /* Vai procurar no localStorage as key que começam por "v" */
      val.push(localStorage.getItem(i).split(","));       /* Para um array faz push dos arrays que as suas keys começam por "v" */
    }
  }

  for (var e = 0; e < val.length; e++) {
    row = table.insertRow(-1);               /* Irá criar a linha */
    cell1 = row.insertCell(0);               /* Irá criar as células */
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);
    cell1.innerHTML = val[e][0];             /* Na células colocará os valores do array */
    cell2.innerHTML = val[e][1];
    cell3.innerHTML = val[e][2];
    cell4.innerHTML = val[e][3];
  }
  cicle ++;

  document.getElementById("jgsTent1").innerHTML = localStorage.getItem("G5Tent");
  document.getElementById("jgsTent2").innerHTML = localStorage.getItem("G10Tent");
  document.getElementById("jgsTent3").innerHTML = localStorage.getItem("GMulty");
  document.getElementById("jgsTent4").innerHTML = localStorage.getItem("G10Cores");
  document.getElementById("jgsTent5").innerHTML = localStorage.getItem("G1/5C");
  document.getElementById("jgsTent6").innerHTML = localStorage.getItem("G2/5C");
  document.getElementById("jgsTent7").innerHTML = localStorage.getItem("G1/10C");
  document.getElementById("jgsTent8").innerHTML = localStorage.getItem("G2/10C");
  document.getElementById("Vit").innerHTML = localStorage.getItem("Vitorias");
  document.getElementById("Derr").innerHTML = localStorage.getItem("Derrotas");


  }


  function logout() {                                          /* Vai servir para sair da página com o utilizador logado */
      localStorage.removeItem("utilizador");
      localStorage.removeItem("modo");
      window.location.href = "prehome.html";
  }
