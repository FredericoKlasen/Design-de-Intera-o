
var etapa = 1;



function desabilitarTabela(etapaAtual) {
  var inputs = document.querySelectorAll('#etapa' + etapaAtual + '-table input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }
  document.querySelector('#etapa' + etapaAtual + ' button').disabled = true;
}

function calcularVencedorEtapa1() {
  
  var inputsEtapa1 = document.querySelectorAll('#etapa1-table input');
  var golsTime1 = parseInt(inputsEtapa1[1].value);
  var golsTime2 = parseInt(inputsEtapa1[4].value);

  if (golsTime1 < 0 || golsTime2 < 0) {
    alert("Por favor, insira valores válidos para o saldo de gols.");
    return;
  }

  var corTime1 = inputsEtapa1[2].value;
  var corTime2 = inputsEtapa1[5].value;

  if (golsTime1 > golsTime2) {
    inputsEtapa1[0].parentNode.style.backgroundColor = corTime1;
    inputsEtapa1[3].parentNode.style.backgroundColor = "transparent";
  } else if (golsTime2 > golsTime1) {
    inputsEtapa1[3].parentNode.style.backgroundColor = corTime2;
    inputsEtapa1[0].parentNode.style.backgroundColor = "transparent";
  } else {
    alert("Empate! Adicione gols de desempate.");
    return;
  }

  desabilitarTabela(1);

  etapa = 2;
  etapa2();
}

function calcularVencedorEtapa2() {
  var inputsEtapa2 = document.querySelectorAll('#etapa2-table input');
  var golsTime3 = parseInt(inputsEtapa2[1].value);
  var golsTime4 = parseInt(inputsEtapa2[4].value);

  if (golsTime3 < 0 || golsTime4 < 0) {
    alert("Por favor, insira valores válidos para o saldo de gols.");
    return;
  }

  var corTime3 = inputsEtapa2[2].value;
  var corTime4 = inputsEtapa2[5].value;

  if (golsTime3 > golsTime4) {
    inputsEtapa2[0].parentNode.style.backgroundColor = corTime3;
    inputsEtapa2[3].parentNode.style.backgroundColor = "transparent";
  } else if (golsTime4 > golsTime3) {
    inputsEtapa2[3].parentNode.style.backgroundColor = corTime4;
    inputsEtapa2[0].parentNode.style.backgroundColor = "transparent";
  } else {
    alert("Empate! Adicione gols de desempate.");
    return;
  }

  desabilitarTabela(2);
  etapa = 3;
  etapa3();
}

function calcularVencedorEtapa3() {
  var inputsEtapa3 = document.querySelectorAll('#etapa3-table input');
  var golsTime5 = parseInt(inputsEtapa3[1].value);
  var golsTime6 = parseInt(inputsEtapa3[4].value);

  if (golsTime5 < 0 || golsTime6 < 0) {
    alert("Por favor, insira valores válidos para o saldo de gols.");
    return;
  }

  var corTime5 = inputsEtapa3[2].value;
  var corTime6 = inputsEtapa3[5].value;

  if (golsTime5 > golsTime6) {
    inputsEtapa3[0].parentNode.style.backgroundColor = corTime5;
    inputsEtapa3[3].parentNode.style.backgroundColor = "transparent";
  } else if (golsTime6 > golsTime5) {
    inputsEtapa3[3].parentNode.style.backgroundColor = corTime6;
    inputsEtapa3[0].parentNode.style.backgroundColor = "transparent";
  } else {
    alert("Empate! Adicione gols de desempate.");
    return;
  }

  desabilitarTabela(3);
}