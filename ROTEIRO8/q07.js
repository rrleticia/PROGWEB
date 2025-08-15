// Q07 — Integração com API REST fictícia (mockable.io) usando async/await + try/catch
// Requisitos:
//  - Criar funções separadas: buscar produtos (GET /produtos) e cadastrar produto (POST /produtos)
//  - Exibir produtos formatados no console
//  - Enviar novo produto e confirmar criação no console
//  - Comentários explicando cada etapa do código

const BASE_URL = "http://demo9223255.mockable.io/";

// -------- Utilitários de formatação --------

// Formata um produto de modo resiliente (campos podem variar no mock)
const formatarProduto = (p) => {
  const id = p.id ?? p.codigo ?? p.sku ?? "-";
  const nome = p.nome ?? p.name ?? "Sem nome";
  const preco = p.preco ?? p.price ?? p.valor ?? null;
  const categoria = p.categoria ?? p.category ?? null;

  let linha = `ID: ${id} | Nome: ${nome}`;
  if (categoria) linha += ` | Categoria: ${categoria}`;
  if (typeof preco === "number") linha += ` | Preço: R$ ${preco.toFixed(2)}`;
  return linha;
};

const exibirProdutos = (lista) => {
  if (!Array.isArray(lista)) {
    console.log("Resposta inesperada (não é array):", lista);
    return;
  }
  console.log("=== Lista de Produtos ===");
  for (const p of lista) {
    console.log(formatarProduto(p));
  }
};

// -------- Funções de API --------

// Busca produtos (GET /produtos)
const buscarProdutos = async () => {
  // try/catch para tratar erros de rede/API
  try {
    const resp = await fetch(`${BASE_URL}/produtos`, { method: "GET" });
    if (!resp.ok) {
      throw new Error(`GET /produtos falhou com status ${resp.status}`);
    }
    const data = await resp.json();
    return data;
  } catch (err) {
    // Propaga o erro para quem chamar lidar
    throw err;
  }
};

// Cadastra produto (POST /produtos)
const cadastrarProduto = async (produto) => {
  try {
    const resp = await fetch(`${BASE_URL}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });
    if (!resp.ok) {
      throw new Error(`POST /produtos falhou com status ${resp.status}`);
    }
    const data = await resp.json();
    return data;
  } catch (err) {
    throw err;
  }
};

// -------- Fluxo principal (demonstração) --------
const main = async () => {
  try {
    // 1) Buscar produtos existentes e exibir formatado
    const produtos = await buscarProdutos();
    exibirProdutos(produtos);

    // 2) Criar um novo produto (exemplo) e enviar via POST
    const novoProduto = {
      id: "p-999",
      nome: "Mouse Gamer",
      preco: 149.9,
      categoria: "Periféricos",
    };
    const respostaCriacao = await cadastrarProduto(novoProduto);

    // 3) Confirmar criação (mensagem genérica e resiliente)
    const status = respostaCriacao.status ?? "criado";
    console.log(`Produto "${novoProduto.nome}" ${status} com sucesso!`);
    console.log("Resposta da API:", respostaCriacao);
  } catch (err) {
    console.error("Erro no fluxo principal:", err.message);
  }
};

// Executa somente se rodar diretamente via Node
if (typeof require !== "undefined" && require.main === module) {
  main();
}
