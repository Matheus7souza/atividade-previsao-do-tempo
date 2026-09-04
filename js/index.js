const inputCidade = document.getElementById('input-cidade');
const listaCidades = document.getElementById('lista-cidades');
const resultadoPrevisao = document.getElementById('resultado-previsao');
const statusMensagem = document.getElementById('status-mensagem');

// Função auxiliar para exibir mensagens de status ou erro
function exibirMensagem(mensagem, tipo = 'info') {
    statusMensagem.textContent = mensagem;
    statusMensagem.classList.remove('hidden');
    if (tipo === 'erro') {
        statusMensagem.style.backgroundColor = '#fde8e8';
        statusMensagem.style.color = '#c0392b';
        statusMensagem.style.borderLeftColor = '#e74c3c';
    } else {
        statusMensagem.style.backgroundColor = '#e8f4fd';
        statusMensagem.style.color = '#2980b9';
        statusMensagem.style.borderLeftColor = '#3498db';
    }
}

function limparMensagem() {
    statusMensagem.textContent = '';
    statusMensagem.classList.add('hidden');
}

// Evento disparado ao pressionar uma tecla no input
inputCidade.addEventListener('keypress', function (evento) {
    if (evento.key === 'Enter') {
        const nomeCidade = inputCidade.value.trim();
        
        if (nomeCidade === '') {
            exibirMensagem('Por favor, digite o nome de uma cidade.', 'erro');
            return;
        }

        buscarCidades(nomeCidade);
    }
});

// Etapa 1: Pesquisa de cidades
async function buscarCidades(cidade) {
    exibirMensagem('Buscando...');
    listaCidades.innerHTML = '';
    resultadoPrevisao.innerHTML = '<p class="placeholder-texto">Selecione uma cidade ao lado para ver a previsão.</p>';

    try {
        const resposta = await fetch(`https://brasilapi.com.br/api/cptec/v1/cidade/${encodeURIComponent(cidade)}`);
        
        if (!resposta.ok) {
            throw new Error('Erro ao buscar as cidades. Tente novamente.');
        }

        const cidades = await resposta.json();
        limparMensagem();

        if (cidades.length === 0) {
            exibirMensagem('Nenhuma cidade encontrada com esse nome.', 'erro');
            return;
        }

        exibirCidades(cidades);

    } catch (erro) {
        console.error(erro);
        exibirMensagem('Ocorreu um erro na requisição das cidades. Verifique sua conexão.', 'erro');
    }
}

// Exibir lista de cidades retornadas
function exibirCidades(cidades) {
    cidades.forEach(cidade => {
        const li = document.createElement('li');
        li.textContent = `${cidade.nome} - ${cidade.estado} (${cidade.regiao || 'Região não informada'})`;
        
        // Ao clicar na cidade, faz a consulta da previsão do tempo usando o ID
        li.addEventListener('click', () => {
            buscarPrevisaoTempo(cidade.id, cidade.nome, cidade.estado);
        });

        listaCidades.appendChild(li);
    });
}

// Etapa 2: Consulta da previsão do tempo
async function buscarPrevisaoTempo(idCidade, nomeCidade, estadoCidade) {
    exibirMensagem('Buscando...');
    resultadoPrevisao.innerHTML = '<p class="placeholder-texto">Carregando previsão...</p>';

    try {
        const resposta = await fetch(`https://brasilapi.com.br/api/cptec/v1/clima/previsao/${idCidade}`);

        if (!resposta.ok) {
            throw new Error('Erro ao consultar a previsão do tempo.');
        }

        const dadosPrevisao = await resposta.json();
        limparMensagem();
        exibirPrevisao(dadosPrevisao, nomeCidade, estadoCidade);

    } catch (erro) {
        console.error(erro);
        exibirMensagem('Ocorreu um erro ao buscar a previsão do tempo.', 'erro');
        resultadoPrevisao.innerHTML = '<p class="placeholder-texto">Erro ao carregar dados.</p>';
    }
}

// Exibir dados da previsão do tempo na página
function exibirPrevisao(dados, nomeCidade, estadoCidade) {
    let html = `<h3>Previsão para: ${dados.cidade || nomeCidade} - ${dados.estado || estadoCidade}</h3>`;
    
    if (dados.atualizado_em) {
        html += `<p style="font-size: 0.85rem; color: #666; margin-bottom: 10px;">Atualizado em: ${dados.atualizado_em}</p>`;
    }

    if (!dados.clima || dados.clima.length === 0) {
        html += '<p class="placeholder-texto">Nenhuma previsão de clima disponível para esta cidade no momento.</p>';
        resultadoPrevisao.innerHTML = html;
        return;
    }

    dados.clima.forEach(item => {
        html += `
            <div class="previsao-item">
                <h3>Data: ${item.data}</h3>
                <p><strong>Condição:</strong> ${item.condicao_desc || item.condicao}</p>
                <p><strong>Mínima:</strong> ${item.min}°C | <strong>Máxima:</strong> ${item.max}°C</p>
                <p><strong>Índice UV:</strong> ${item.indice_uv}</p>
            </div>
        `;
    });

    resultadoPrevisao.innerHTML = html;
}