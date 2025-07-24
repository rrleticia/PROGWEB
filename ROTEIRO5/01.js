const vendas = [
  {
    produto: "Notebook",
    preco: 4500,
    quantidade: 3,
    vendedor: "Sara",
  },
  {
    produto: "Smartphone",
    preco: 2300,
    quantidade: 5,
    vendedor: "Matheus",
  },
  {
    produto: "Monitor",
    preco: 12000,
    quantidade: 2,
    vendedor: "Gabriel",
  },
  {
    produto: "Teclado Mecânico",
    preco: 350,
    quantidade: 4,
    vendedor: "Sara",
  },
  {
    produto: "Notebook",
    preco: 4500,
    quantidade: 3,
    vendedor: "Gabriel",
  },
  {
    produto: "Monitor",
    preco: 1200,
    quantidade: 6,
    vendedor: "Matheus",
  },
];

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};

const gerarRelatorio = (vendas) => {
  let totalGeral = 0;
  let vendedores = [...new Set(vendas.map((venda) => venda.vendedor))];
  let comissoes = vendedores.map((vendedor) => ({
    vendedor: vendedor,
    comissao: 0,
  }));
  let relatorioStr = `Relatório de Vendas:
  `;

  vendas.forEach((venda) => {
    const valorTotal = venda.quantidade * venda.preco;
    totalGeral += valorTotal;

    const comisssao = valorTotal * 0.05;
    const vendedorComissoes = comissoes.find(
      (comissao) => comissao.vendedor == venda.vendedor
    );
    vendedorComissoes.comissao += comisssao;

    const vendaStr = `
- Produto: ${venda.produto}
Quantidade: ${venda.quantidade}
Preço Unitário: ${formatarMoeda(venda.preco)}
Total: ${formatarMoeda(valorTotal)}
Vendedor: ${venda.vendedor}
    `;

    relatorioStr += vendaStr;
  });

  relatorioStr += `
...
Total Geral: ${formatarMoeda(totalGeral)}
Total de comissão (5%):
`;

  comissoes.forEach((comissao) => {
    const comissaoStr = `${comissao.vendedor}: R$ ${formatarMoeda(
      comissao.comissao
    )}
`;
    relatorioStr += comissaoStr;
  });

  console.log(relatorioStr);
};

gerarRelatorio(vendas);
