document.getElementById("form-cartao").addEventListener("submit", function (event) { // Esta função detecta um evento de envio (submit) do formulário chamado "form-cartao"
    // Após detectar o evento de envio ela executa a função abaixo.
    event.preventDefault(); // Esta linha de código previne que a função prossiga executando caso os campos do formulário estejam vazios.

    // Buscando os elementos dos inputs do formulário e seus valores pelo id definido no html.
    var remetente = document.getElementById("remetente").value;
    var destinatario = document.getElementById("destinatario").value;
    var mensagem = document.getElementById("mensagem").value;
    var fundoCor = document.getElementById("cor-fundo").value;
    var bordaCor = document.getElementById("cor-borda").value;
    var fonteCor = document.getElementById("cor-fonte").value;
    var select = document.getElementById('fonte').value;

    // Buscando os elementos Radio do formulário.
    var radios = document.getElementsByName("inlineRadioOptions");
    var tipoCartao; // Variável auxiliar para conter o valor do radio.

    // Buscando o elemento card-body no HTML.
    var cardBody = document.getElementById("card-body");

    // Buscando o elemento da foto do card-body.
    var imagemCartao = document.getElementById("imagem-cartao");

    // Buscando o elemento cartão no HTML.
    var cartao = document.getElementById("cartao");

    // Buscando os elementos do cartão.
    var tituloCartao = document.getElementById("titulo-cartao");
    var cartaoRemetente = document.getElementById("card-remetente");
    var cartaoDestinatario = document.getElementById("card-destinatario");
    var cartaoMensagem = document.getElementById("card-mensagem");
    var labelCartaoRemetente = document.getElementById("label-card-remetente");
    var labelCartaoDestinatario = document.getElementById("label-card-destinatario");
    var labelCartaoMensagem = document.getElementById("label-card-mensagem");
    
    for (var i = 0; i < radios.length; i++) { // Percorrendo todos os Radio do formulário para ver qual está selecionado.
        if (radios[i].checked) {
            tipoCartao = radios[i].value; // Ao encontrar o Radio selecionado insere o valor dele na variável auxiliar tipoCartao.
            break;
        }
    }
    
    // Alterando o tamanho da fonte, devido as fontes personalizadas serem pequenas demais.
    labelCartaoRemetente.style.fontSize = '1.3rem';
    labelCartaoDestinatario.style.fontSize = '1.3rem';
    labelCartaoMensagem.style.fontSize = '1.3rem';
    cartaoRemetente.style.fontSize = '1.3rem';
    cartaoDestinatario.style.fontSize = '1.3rem';
    cartaoMensagem.style.fontSize = '1.3rem';
    
    // Validando qual fonte foi selecionada.
    if (select === 'poppins') {
        tituloCartao.style.fontFamily = 'Poppins, sans-serif'; // Trocando a fonte atual para a fonte escolhida no formulário,
        labelCartaoRemetente.style.fontFamily = 'Poppins, sans-serif';    // para todas as tags que contém texto dentro do cartão.
        labelCartaoDestinatario.style.fontFamily = 'Poppins, sans-serif';
        labelCartaoMensagem.style.fontFamily = 'Poppins, sans-serif';
        cartaoRemetente.style.fontFamily = 'Poppins, sans-serif';
        cartaoDestinatario.style.fontFamily = 'Poppins, sans-serif';
        cartaoMensagem.style.fontFamily = 'Poppins, sans-serif';

        // Esta fonte tem tamanho normal, portanto precisa redefinir o tamanho da fonte.
        labelCartaoRemetente.style.fontSize = '1rem';
        labelCartaoDestinatario.style.fontSize = '1rem';
        labelCartaoMensagem.style.fontSize = '1rem';
        cartaoRemetente.style.fontSize = '1rem';
        cartaoDestinatario.style.fontSize = '1rem';
        cartaoMensagem.style.fontSize = '1rem';
    } else if (select === 'lora') {
        tituloCartao.style.fontFamily = 'Lora, serif';
        labelCartaoRemetente.style.fontFamily = 'Lora, serif';
        labelCartaoDestinatario.style.fontFamily = 'Lora, serif';
        labelCartaoMensagem.style.fontFamily = 'Lora, serif';
        cartaoRemetente.style.fontFamily = 'Lora, serif';
        cartaoDestinatario.style.fontFamily = 'Lora, serif';
        cartaoMensagem.style.fontFamily = 'Lora, serif';

        // Esta fonte tem tamanho normal, portanto precisa redefinir o tamanho da fonte.
        labelCartaoRemetente.style.fontSize = '1rem';
        labelCartaoDestinatario.style.fontSize = '1rem';
        labelCartaoMensagem.style.fontSize = '1rem';
        cartaoRemetente.style.fontSize = '1rem';
        cartaoDestinatario.style.fontSize = '1rem';
        cartaoMensagem.style.fontSize = '1rem';
    } else if (select === 'great-vibes') {
        tituloCartao.style.fontFamily = 'Great Vibes, cursive';
        labelCartaoRemetente.style.fontFamily = 'Great Vibes, cursive';
        labelCartaoDestinatario.style.fontFamily = 'Great Vibes, cursive';
        labelCartaoMensagem.style.fontFamily = 'Great Vibes, cursive';
        cartaoRemetente.style.fontFamily = 'Great Vibes, cursive';
        cartaoDestinatario.style.fontFamily = 'Great Vibes, cursive';
        cartaoMensagem.style.fontFamily = 'Great Vibes, cursive';
    } else if (select === 'parisienne') {
        tituloCartao.style.fontFamily = 'Parisienne, cursive';
        labelCartaoRemetente.style.fontFamily = 'Parisienne, cursive';
        labelCartaoDestinatario.style.fontFamily = 'Parisienne, cursive';
        labelCartaoMensagem.style.fontFamily = 'Parisienne, cursive';
        cartaoRemetente.style.fontFamily = 'Parisienne, cursive';
        cartaoDestinatario.style.fontFamily = 'Parisienne, cursive';
        cartaoMensagem.style.fontFamily = 'Parisienne, cursive';
    }
    
    // Preenchendo no cartão as informações que vieram no formulário.
    cartaoRemetente.textContent = remetente;
    cartaoDestinatario.textContent = destinatario;
    cartaoMensagem.textContent = mensagem;
    
    // Alterando a cor do fundo, da borda e da fonte do cartão.
    cardBody.style.backgroundColor = fundoCor;
    cardBody.style.borderColor = bordaCor;
    cartao.style.color = fonteCor;
    
    // Validando qual o tipo de cartão foi selecionado.
    if (tipoCartao === "natal") {
        tituloCartao.textContent = "Feliz Natal!"; // Trocando a mensagem do título do cartão de acordo com o tipo do cartão.
        imagemCartao.src = "imagens/natal.png"; // Adicionando o relativo da imagem ao src da tag <img>.
        imagemCartao.style.display = "block"; // Mostrando a imagem, visto que ela é invisível originalmente (display: none).
    } else if (tipoCartao === "pascoa") {
        tituloCartao.textContent = "Feliz Páscoa!";
        imagemCartao.src = "imagens/pascoa.png";
        imagemCartao.style.display = "block";
    } else if (tipoCartao === "aniversario") {
        tituloCartao.textContent = "Feliz Aniversário!";
        imagemCartao.src = "imagens/aniversario.png";
        imagemCartao.style.display = "block";
    }
    
});
