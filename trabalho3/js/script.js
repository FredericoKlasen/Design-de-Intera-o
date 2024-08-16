// Componentes do bootstrap para usar no HTML
// INICIALIZANDO TOOLTIPS BOOTSTRAP CONFORME CONSTA NA DOCUMENTAÇÃO
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]'); // Tooltip para usar como informação em partes específicas no HTML.
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// INICIALIZANDO TOASTS DO BOOTSTRAP CONFORME CONSTA NA DOCUMENTAÇÃO
// const toastElList = document.querySelectorAll('.toast') // Toast para usar como notificação no HTML.
// const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, option))
const toast = new bootstrap.Toast('.toast');

// Busca taxas de juros do Brasil.
/* 
    1 - Faça uma página de utilidade pública baseada em consultas ao https://brasilapi.com.br/ (exceto a api dos correios).
    Em todos casos (Nos 4 casos) utilize o comando fetch e proteja as chamadas com try/catch ou then/catch.
    Coloque para cada caso uma explicação para o usuário saber o que ele está vendo ou escolhendo:


    1.a) Faça 2 consultas via programação e mostre os resultados na tela:

    Esta função é executada ao fim do carregamento do HTML da página, detectado pelo evento 'DOMContentLoaded'.
    Ao ser executada, ela faz uma chamada para a 'Brasil API' onde busca as taxas de Juros do Brasil.
    Após isso insere algumas das informações da resposta no HTML da página.
*/
document.addEventListener('DOMContentLoaded', function() {
    const resultadoDiv = document.getElementById('resultadoBuscaTaxas');
    const spinner = resultadoDiv.querySelector('.spinner-border'); // Efeito de carregamento da página usando Load Spinner do bootstrap
    spinner.classList.remove('d-none'); // Mostra o Load Spinner.
    
    fetch(`https://brasilapi.com.br/api/taxas/v1`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição.'); // Se a resposta da API não for 200 (ok), lança um erro que será capturado pelo .catch abaixo.
        }
        
        return response.json(); // Converte a resposta da API para o formato JSON.
    })
    .then(data => {
        data.forEach(taxa => { // Para cada objeto dentro do JSON, cria uma div com o conteúdo do objeto.
            const div = document.createElement('div');
            div.innerHTML = `
                <p><strong>Nome:</strong> ${taxa.nome}</p>
                <p><strong>Valor:</strong> ${taxa.valor}</p>
            `;

            resultadoDiv.appendChild(div); // Adiciona a div do objeto dentro da div do resultado que será mostrada no HTML.
        });
    })
    .catch(error => {
        resultadoDiv.innerText = 'Erro na requisição.'; // Caso dê erro na chamada, mostra esta mensagem dentro da div no HTML.
        console.error('Erro: ', error); // Mostra o erro no console do Javascript.
    }).finally(() => {
        // Após o término da chamada, adiciona a classe 'd-none' no Load Spinner para que ele desapareça e fique somente o resultado da chamada.
        spinner.classList.add('d-none');
    });
});

// Busca Feriados Nacionais pelo ano atual.
/* 
    1.a) Faça 2 consultas via programação e mostre os resultados na tela:

    Esta função é executada ao fim do carregamento do HTML da página, detectado pelo evento 'DOMContentLoaded'.
    Ao ser executada, ela faz uma chamada para a 'Brasil API' onde busca todos os feriados nacionais do ano atual.
    Após isso insere algumas das informações da resposta no HTML da página.
*/
document.addEventListener('DOMContentLoaded', function() {
    const resultadoDiv = document.getElementById('resultadoBuscaFeriados');
    const spinner = resultadoDiv.querySelector('.spinner-border');
    spinner.classList.remove('d-none');

    const anoAtual = new Date().getFullYear(); // Pega o ano atual para usar na chamada da API.
    
    fetch(`https://brasilapi.com.br/api/feriados/v1/${anoAtual}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição.');
        }
        
        return response.json();
    })
    .then(data => {
        data.forEach(feriado => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p><strong>Feriado:</strong> ${feriado.name}</p>
                <p><strong>Data:</strong> ${feriado.date}</p>
            `;

            resultadoDiv.appendChild(div);
        });
    })
    .catch(error => {
        resultadoDiv.innerText = 'Erro na requisição.';
        console.error('Erro: ', error);
    }).finally(() => {
        spinner.classList.add('d-none');
    });
});

// Busca CEP.
/*
    1.b) Faça 2 perguntas para o usuário via formulário. Para cada consulta mostre os resultados
        consultando em uma API os dados pedidos pelo usuário:

    Esta função é executada no envio do formulário preenchido pelo usuário, detectado pelo evento 'submit'.
    Ao ser executada, ela faz uma chamada para a 'Brasil API' onde busca um cep pelo número informado no formulário.
    Após isso insere algumas das informações da resposta no HTML da página.
*/
document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede que o formulário seja enviado vazio

    const cep = document.getElementById('cep').value; // Pega o valor do input numérico
    const button = document.getElementById('cepBtn');
    const spinner = button.querySelector('.spinner-border');

    button.disabled = true; // Desabilita o botão enquanto a chamada para a API é feita, não permitindo que o usuário faça novamente antes de terminar.
    spinner.classList.remove('d-none'); // Mostra o Load Spinner

    const cepValido = /^[0-9]{8}$/.test(cep); // Expressão Regex que valida se o CEP é composto por exatamente 8 dígitos (numéricos) sem pontos ou traços.

    if (!cepValido) { // Se não for um CEP válido, mostra um Toast do bootstrap com uma mensagem para o usuário corrigir o CEP.
        document.querySelector('.toast-body').innerText = 'Informe um número de CEP válido, composto por 8 dígitos sem pontos ou hífen.'; // Escreve a mensagem de erro.
        toast.show(); // Mostra o Toast.

        // Necessário voltar o status do botão e do Load Spinner aqui, para que seja possível realizar uma nova tentativa.
        button.disabled = false;
        spinner.classList.add('d-none');
    } else { // Caso seja válido o CEP, ele realiza a chamada para a API.
        const resultadoDiv = document.getElementById('resultadoBuscaCep');
    
        fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição.');
            }
            
            return response.json();
        })
        .then(data => {
            resultadoDiv.innerHTML = `
                <h5>Resultado</h5>
                <p><strong>CEP:</strong> ${data.cep}</p>
                <p><strong>Estado:</strong> ${data.state}</p>
                <p><strong>Cidade:</strong> ${data.city}</p>
                <p><strong>Bairro:</strong> ${data.neighborhood}</p>
                <p><strong>Rua:</strong> ${data.street}</p>
                <p><strong>Serviço:</strong> ${data.service}</p>
            `;
        })
        .catch(error => {
            resultadoDiv.innerText = 'Erro na requisição.';
            console.error('Erro: ', error);
        })
        .finally(() => {
            // Após finalizar a chamada a API, habilita novamente o botão e esconde o Load Spinner
            button.disabled = false;
            spinner.classList.add('d-none');
        });
    }
});

// Busca CNPJ.
/*
    1.b) Faça 2 perguntas para o usuário via formulário. Para cada consulta mostre os resultados
        consultando em uma API os dados pedidos pelo usuário:

    Esta função é executada no envio do formulário preenchido pelo usuário, detectado pelo evento 'submit'.
    Ao ser executada, ela faz uma chamada para a 'Brasil API' onde busca um CNPJ pelo número informado no formulário.
    Após isso insere algumas das informações da resposta no HTML da página.
*/
document.getElementById('cnpjForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede que o formulário seja enviado vazio

    const cnpj = document.getElementById('cnpj').value;
    const button = document.getElementById('cnpjBtn');
    const spinner = button.querySelector('.spinner-border');

    button.disabled = true;
    spinner.classList.remove('d-none');

    const cnpjValido = /^[0-9]{14}$/.test(cnpj); // Expressão Regex que valida se o CNPJ é composto por exatamente 14 dígitos (numéricos) sem pontos, traços ou barras.

    if (!cnpjValido) {
        document.querySelector('.toast-body').innerText = 'Informe um número de CNPJ válido, composto por 14 dígitos sem pontos, barra ou hífen.';
        toast.show();

        button.disabled = false;
        spinner.classList.add('d-none');
    } else {
        const resultadoDiv = document.getElementById('resultadoBuscaCnpj');

        fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição.');
            }
            
            return response.json();
        })
        .then(data => {
            resultadoDiv.innerHTML = `
                <h5>Resultado</h5>
                <p><strong>CNPJ:</strong> ${data.cnpj}</p>
                <p><strong>Razão Social:</strong> ${data.razao_social}</p>
                <p><strong>Nome Fantasia:</strong> ${data.nome_fantasia}</p>
                <p><strong>Atividade Econômica (CNAE):</strong> ${data.cnae_fiscal_descricao}</p>
                <p><strong>Início de Atividade:</strong> ${data.data_inicio_atividade}</p>
                <p><strong>Situação Cadastral:</strong> ${data.descricao_situacao_cadastral}</p>
                <p><strong>Data da Situação Cadastral:</strong> ${data.data_situacao_cadastral}</p>
                <p><strong>Endereço:</strong> ${data.descricao_tipo_de_logradouro} ${data.logradouro} (${data.complemento}), ${data.numero} - ${data.bairro}, ${data.municipio} - ${data.uf}, ${data.cep}</p>
            `;
        })
        .catch(error => {
            resultadoDiv.innerText = 'Erro na requisição.';
            console.error('Erro: ', error);
        })
        .finally(() => {
            button.disabled = false;
            spinner.classList.add('d-none');
        });
    }
});

// 2 - Acesse uma api a sua escolha e faça os seguintes exercícios:
/* 
    2.a) *** PROMISE RACE ***:

    Esta função é executada quando o Javascript detecta o evento de 'click' no botão que tem o Id 'promiseRaceBtn'
    e faz uma chamada para 3 APIs diferentes, pegando somente a resposta da primeira que responder ou da primeira que der erro.
    Após isto alguns campos da resposta são inseridos no HTML da página, via Javascript.
*/
document.getElementById('promiseRaceBtn').addEventListener('click', () => {
    const api1 = fetch('https://jsonplaceholder.typicode.com/posts/1');
    const api2 = fetch('https://jsonplaceholder.typicode.com/posts/2');
    const api3 = fetch('https://jsonplaceholder.typicode.com/posts/3');
    
    const resultadoDiv = document.getElementById('resultadoPromiseRace');

    Promise.race([api1, api2, api3])
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição.');
            }

            return response.json();
        })
        .then(data => {
            resultadoDiv.innerHTML = `
                <h4>Resultado</h4>
                <p><strong>Id:</strong> ${data.id}</p>
                <p><strong>Título:</strong> ${data.title}</p>
                <p><strong>Mensagem:</strong> ${data.body}</p>
                <p><strong>Id do Usuário:</strong> ${data.userId}</p>
            `;
        })
        .catch(error => {
            resultadoDiv.textContent = 'Erro na requisição.';
        });
});

/* 
    2.b) *** PROMISE ALL ***:
    
    Esta função é executada quando o Javascript detecta o evento de 'click' no botão que tem o Id 'promiseAllBtn'
    e faz uma chamada para 3 APIs diferentes aguardando e capturando a resposta das 3.
    Após isto alguns campos da resposta são inseridos no HTML da página, via Javascript.
*/
document.getElementById('promiseAllBtn').addEventListener('click', () => {
    const api1 = fetch('https://swapi.dev/api/planets/2');
    const api2 = fetch('https://swapi.dev/api/people/13');
    const api3 = fetch('https://swapi.dev/api/starships/10');

    const resultadoDiv = document.getElementById('resultadoPromiseAll');
    
    Promise.all([api1, api2, api3])
        .then(responses => Promise.all(responses.map(response => response.json()))) // Após as 3 APIs responderem, converte para um JSON único.
        .then(([response1, response2, response3]) => { // Captura os objetos convertidos para JSON em variáveis para usar separadamente.
            // Monta a estrutura HTML de como serão exibidos algumas informações do planeta.
            const planeta = `
                <h5>Planeta</h5>
                <p><strong>Nome:</strong> ${response1.name}</p>
                <p><strong>Clima:</strong> ${response1.climate}</p>
                <p><strong>Gravidade:</strong> ${response1.gravity}</p>
                <p><strong>Terreno:</strong> ${response1.terrain}</p>
                <p><strong>População:</strong> ${response1.population}</p>
                <p><strong>Diâmetro:</strong> ${response1.diameter}</p>
                <p><strong>Periodo de rotação:</strong> ${response1.rotation_period}</p>
                <p><strong>Periodo de orbital:</strong> ${response1.orbital_period}</p>
            `;
            
            // Monta a estrutura HTML de como serão exibidos algumas informações do personagem.
            const personagem = `
                <h5>Personagem</h5>
                <p><strong>Nome:</strong> ${response2.name}</p>
                <p><strong>Gênero:</strong> ${response2.gender}</p>
                <p><strong>Ano de nascimento:</strong> ${response2.birth_year}</p>
                <p><strong>Altura:</strong> ${response2.height} cm</p>
                <p><strong>Peso:</strong> ${response2.mass} Kg</p>
                <p><strong>Cor do cabelo:</strong> ${response2.hair_color}</p>
                <p><strong>Cor da pele:</strong> ${response2.skin_color}</p>
            `;

            // Monta a estrutura HTML de como serão exibidos algumas informações da nave espacial.
            const naveEspacial = `
                <h5>Nave espacial</h5>
                <p><strong>Nome:</strong> ${response3.name}</p>
                <p><strong>Modelo:</strong> ${response3.model}</p>
                <p><strong>Fabricante:</strong> ${response3.manufacturer}</p>
                <p><strong>Classe:</strong> ${response3.starship_class}</p>
                <p><strong>Comprimento:</strong> ${response3.lenght}</p>
                <p><strong>Tamanho da Tripulação:</strong> ${response3.crew}</p>
                <p><strong>Quantidade de passageiros:</strong> ${response3.passengers}</p>
                <p><strong>Capacidade de carga:</strong> ${response3.cargo_capacity}</p>
                <p><strong>Velocidade Máxima de Atmosfera:</strong> ${response3.max_atmosphering_speed}</p>
            `;
            
            // Monta o HTML da div onde irá ser mostrado o resultado.
            resultadoDiv.innerHTML = `
                <h4>Resultado</h4>
                <br>
                ${planeta}
                <hr>
                ${personagem}
                <hr>
                ${naveEspacial}
            `;
        })
        .catch(error => {
            resultadoDiv.textContent = 'Erro na requisição.';
        });
});