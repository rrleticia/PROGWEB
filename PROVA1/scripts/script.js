let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

function adicionaAoCarrinho(nomeProduto, precoProduto) {
  const produto = { nome: nomeProduto, preco: precoProduto };
  carrinho.push(produto);
  atualizaContagemCarrinho();
  salvarCarrinho();
  alert(`O produto ${nomeProduto} foi adicionado ao seu carrinho.`);
}

function atualizaContagemCarrinho() {
  document.getElementById("carrinho-contagem").textContent = carrinho.length;
}

function salvarCarrinho() {
  sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function carregaCarrinho() {
  carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
  atualizaContagemCarrinho();
  mostrarItensCarrinho();
}

function mostrarItensCarrinho() {
  const containerCarrinho = document.getElementById("carrinho-container");
  const totalCarrinho = document.getElementById("carrinho-total");
  containerCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((produto, indice) => {
    const itemCarrinho = document.createElement("div");
    itemCarrinho.classList.add("carrinho-item");
    const nomeProduto = produto.nome;
    const imgSource =
      String(nomeProduto).charAt(0).toLowerCase() +
      String(nomeProduto).slice(1);
    console.log(imgSource);
    itemCarrinho.innerHTML = `
            <img src="img/${imgSource}.jpg" alt="${produto.nome}">
            <div class="carrinho-item-detalhes">
                <h3>${produto.nome}</h3>
                <p>${produto.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}</p>
            </div>
            <button onclick="removerItemCarrinho(${indice})">Remover</button>
        `;

    containerCarrinho.appendChild(itemCarrinho);
    total += produto.preco;
  });

  totalCarrinho.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function removerItemCarrinho(indice) {
  carrinho.splice(indice, 1);
  atualizaContagemCarrinho();
  salvarCarrinho();
  mostrarItensCarrinho();
}

function limpaCarrinho() {
  carrinho = [];
  atualizaContagemCarrinho();
  salvarCarrinho();
  mostrarItensCarrinho();
}

// Linha para carregar o carrinho ao carregar a página
window.onload = carregaCarrinho;
