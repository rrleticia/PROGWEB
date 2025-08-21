let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

adicionaAoCarrinho = (nomeProduto, priceProduto) => {
  const produto = { nome: nomeProduto, price: priceProduto };
  carrinho.push(produto);
  atualizaContagemCarrinho();
  salvarCarrinho();
  alert(`O produto ${nomeProduto} foi adicionado ao seu carrinho.`);
};

atualizaContagemCarrinho = () => {
  document.getElementById("carrinho-contagem").textContent = carrinho.length;
};

salvarCarrinho = () => {
  sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
};

carregaCarrinho = () => {
  carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
  atualizaContagemCarrinho();
  mostrarItensCarrinho();
};

mostrarItensCarrinho = () => {
  const containerCarrinho = document.getElementById("carrinho-container");
  const totalCarrinho = document.getElementById("carrinho-total");
  containerCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((produto, indice) => {
    const itemCarrinho = document.createElement("div");
    itemCarrinho.classList.add("carrinho__item");

    itemCarrinho.innerHTML = `
            <img src="./img/${produto.nome}.jpg" alt="${produto.nome}">
            <div class="carrinho__item--detalhes">
                <h3>${produto.nome}</h3>
                <p>${produto.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}</p>
            </div>
            <button onclick="removerItemCarrinho(${indice})">Remover</button>
        `;

    containerCarrinho.appendChild(itemCarrinho);
    total += produto.price;
  });

  totalCarrinho.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

removerItemCarrinho = (indice) => {
  carrinho.splice(indice, 1);
  atualizaContagemCarrinho();
  salvarCarrinho();
  mostrarItensCarrinho();
};

limpaCarrinho = () => {
  carrinho = [];
  atualizaContagemCarrinho();
  salvarCarrinho();
  mostrarItensCarrinho();
};

//RESPOSTAS

//Etapa 02
//URL para buscar: https://viacep.com.br/ws/58400240/json/
//Método http para usar: GET
//Resposta do Reject: reject('Erro ao consultar o CEP'))
const buscarEndereco = async (cep) => {
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(`ViaCep HTTP ${res.status}`);
    }

    const data = await res.json();

    if (data.erro) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const consultaCep = async () => {
  const cep = document.getElementById("cep").value.replace(/\D/g, "");
  if (cep.length === 8) {
    try {
      const dados = await buscarEndereco(cep);
      console.log(dados);
      if (!dados) {
        alert("CEP inválido ou não encontrado.");
        return;
      }
      const byId = (id) => document.querySelector(`#${id}`);
      if (byId("logradouro")) byId("logradouro").value = dados.logradouro || "";
      if (byId("complemento"))
        byId("complemento").value = dados.complemento || "";
      if (byId("cidade")) byId("cidade").value = dados.localidade || "";
      if (byId("estado")) byId("estado").value = dados.uf || "";
    } catch (error) {
      alert(error);
    }
  } else {
    alert("CEP inválido!");
  }
};

//Etapa 03
const gerarTextoMarketeiro = (dadosFormulario) => {
  const card = document.createElement("div");
  card.style.width = "300px";
  card.style.border = "1px solid #ccc";
  card.style.borderRadius = "10px";
  card.style.padding = "15px";
  card.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.1)";
  card.style.margin = "10px auto";
  card.style.fontFamily = "Arial, sans-serif";
  card.style.backgroundColor = "#f9f9f9";

  card.innerHTML = `
    <p>Apresentamos ${dadosFormulario.nome}, um profissional altamente qualificado e referência no desenvolvimento avançado de
    software. Com uma trajetória pautada pela inovação e excelência, ${dadosFormulario.nome} tem se destacado na criação de
    soluções tecnológicas de alto impacto, na qual tem transformado desafios complexos em sistemas eficientes
    e escaláveis.</p>

    <p>Comunicável e estrategista, ${dadosFormulario.nome} pode ser contatado via e-mail em ${dadosFormulario.email}, mantendo-se sempre
    disponível para colaborações e projetos que demandem expertise em engenharia de software, inteligência
    artificial e programação web. Seu principal objetivo no momento é ${dadosFormulario.motivo}, reforçando sua busca contínua
    pelo aprimoramento e pela entrega de soluções robustas e inteligentes.</p>

    <p>Atualmente, ${dadosFormulario.nome} reside na dinâmica cidade de ${dadosFormulario.cidade}, no endereço ${dadosFormulario.endereco}, CEP ${dadosFormulario.cep}, onde
    continua sua missão de criar e arquitetar aplicações inovadoras. Seu conhecimento aprofundado em diversas
    linguagens, frameworks e metodologias ágeis o posiciona como um líder técnico capaz de elevar qualquer
    equipe ao mais alto nível de performance.</p>

    <p>Com uma visão futurista e uma abordagem precisa para o desenvolvimento de software, ${dadosFormulario.nome} segue
    transformando o cenário tecnológico com soluções que transcendem expectativas.</p>
  `;

  document.body.appendChild(card);
};

//Não mexer neste método
submeterDados = (event) => {
  event.preventDefault();
  const dadosFormulario = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    motivo: document.getElementById("motivo").value,
    cep: document.getElementById("cep").value,
    endereco: document.getElementById("logradouro").value,
    endereco: document.getElementById("complemento").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
  };

  gerarTextoMarketeiro(dadosFormulario);
};

//Etapa 04
//URL para buscar: https://fakestoreapi.com/products
//Método http para usar: GET
//Resposta do Reject: reject('Erro ao consultar os Produtos'))
const consultarProdutosExternos = async () => {
  try {
    const url = `https://fakestoreapi.com/products`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("Falha ao consultar concorrência");
    const lista = await resp.json();
    console.log(lista);
    return lista;
  } catch (e) {
    console.error(e);
  }
};

const alterarValoresTabela = async () => {
  const tabela = document
    .getElementById("tabelaProdutos")
    .getElementsByTagName("tbody")[0];

  const produtos = await consultarProdutosExternos().catch((error) =>
    alert(error)
  );
  modificaValores(produtos);
};

//Não mexer neste método
const modificaValores = ([
  produto1,
  produto2,
  produto3,
  produto4,
  produto5,
  produto6,
]) => {
  const tabela = document
    .getElementById("tabelaProdutos")
    .getElementsByTagName("tbody")[0];
  tabela.rows[0].cells[0].innerText = produto1.title;
  tabela.rows[0].cells[1].innerText = produto1.price;
  tabela.rows[0].cells[2].innerHTML = `<img src="${produto1.image}"/>`;
  tabela.rows[1].cells[0].innerText = produto2.title;
  tabela.rows[1].cells[1].innerText = produto2.price;
  tabela.rows[1].cells[2].innerHTML = `<img src="${produto2.image}"/>`;
  tabela.rows[2].cells[0].innerText = produto3.title;
  tabela.rows[2].cells[1].innerText = produto3.price;
  tabela.rows[2].cells[2].innerHTML = `<img src="${produto3.image}"/>`;
  tabela.rows[3].cells[0].innerText = produto4.title;
  tabela.rows[3].cells[1].innerText = produto4.price;
  tabela.rows[3].cells[2].innerHTML = `<img src="${produto4.image}"/>`;
  tabela.rows[4].cells[0].innerText = produto5.title;
  tabela.rows[4].cells[1].innerText = produto5.price;
  tabela.rows[4].cells[2].innerHTML = `<img src="${produto5.image}"/>`;
  tabela.rows[5].cells[0].innerText = produto6.title;
  tabela.rows[5].cells[1].innerText = produto6.price;
  tabela.rows[5].cells[2].innerHTML = `<img src="${produto6.image}"/>`;
};

window.onload = carregaCarrinho;
