let campoCidade = document.querySelector("#cidade");
let elementoCidade = document.querySelector("#cidade-previsao");
let elementoPrevisao = document.querySelector("#previsao");
let elementoBuscar = document.querySelector("#buscando");

async function testar(evento) {
  if (evento.key == "Enter") {
    elementoBuscar.textContent = "Buscando..."
    let cidade = campoCidade.value;
    let resposta = await fetch(`https://brasilapi.com.br/api/cptec/v1/cidade/${cidade}`,);
    if (resposta.ok == false) {
      elementoPrevisao.innerHTML = "";
      elementoBuscar.innerHTML = "";
      let elementoErro = document.createElement("p") ;
      elementoErro.textContent = ("Essa cidade não existe em nosso banco");
      elementoPrevisao.appendChild(pErro);
    }
    if (resposta.ok) {
      let dados = await resposta.json();
      elementoPrevisao.innerHTML = "";
      elementoBuscar.innerHTML = "";
      for (let i = 0; i < dados.length; i = i + 1) {
        adicionarElemento(`${dados[i].nome}-${dados[i].estado}(${dados[i].regiao})`, dados[i].id);
      }
    }
  }
}
async function cliqueBotao(evento) {
  let id = evento.target.getAttribute('data-id');
  let resposta = await fetch(`https:brasilapi.com.br/api/cptec/v1/clima/previsao/${id}`,);
  let dados = await resposta.json();
  elementoPrevisao.innerHTML = "";
  for (let i = 0; i < dados.clima.length; i = i + 1) {
    console.log(dados.clima[i]);

    let pdata = document.createElement("p");
    pdata.textContent = `Data: ${dados.clima[i].data.split("-").reverse().join("/")}`;

    let pcondicao = document.createElement("p");
    pcondicao.textContent = `Condição: ${dados.clima[i].condicao_desc}`;

    let pmax = document.createElement("p");
    pmax.textContent = `Maxima: ${dados.clima[i].max}`;

    let pmin = document.createElement("p");
    pmin.textContent = `Minima: ${dados.clima[i].min}`;

    let pindice = document.createElement("p");
    pindice.textContent = `indice UV:  ${dados.clima[i].indice_uv}`;

    let divPainelprevisao = document.createElement("div");
    divPainelprevisao.classList.add("painel-cotacao");
    divPainelprevisao.appendChild(pdata);
    divPainelprevisao.appendChild(pcondicao);
    divPainelprevisao.appendChild(pmax);
    divPainelprevisao.appendChild(pmin);
    divPainelprevisao.appendChild(pindice);


    elementoPrevisao.appendChild(divPainelprevisao);

  }
}



function adicionarElemento(nome, idCidade) {
  // Cria dinamicamente uma tag de parágrafo (<p>)
  let elemento = document.createElement("button");
  elemento.textContent = nome;
  elemento.classList.add("painel-cidade");
  elemento.setAttribute('type', 'button');
  elemento.setAttribute('onclick', 'cliqueBotao(event)')
  elemento.setAttribute('data-id', idCidade);
  elementoPrevisao.appendChild(elemento);
}
