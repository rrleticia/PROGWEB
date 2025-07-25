const exportacao = {
  paisDestino: "Estados Unidos",
  produto: {
    nome: "aço",
    valorEmDolares: 100000,
    taxaImposta: 0.25,
  },
  empresa: "Siderúrgica Brasil Ltda",
};

const {
  produto: { nome, valorEmDolares, taxaImposta },
  empresa,
} = exportacao;

const valorComTarifa = valorEmDolares * (1 + taxaImposta);

console.log(`Produto: ${nome}`);
console.log(`Empresa: ${empresa}`);
console.log(`Valor original: US$ ${valorEmDolares}`);
console.log(`Taxa: ${taxaImposta * 100}%`);
console.log(`Valor com tarifa: US$ ${valorComTarifa}`);
