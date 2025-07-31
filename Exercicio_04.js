const jsonVendas = `[
{"produto": "Notebook", "valor": 4500},
{"produto": "Smartphone", "valor": 2500},
{"produto": "Tablet", "valor": 1800},
{"produto": "Monitor", "valor": 1200}
]`;
const filtrarVendas = (json, minimo) => {
  const vendas = JSON.parse(json);
  const vendas_filtrado = vendas.filter((venda) => venda.valor > minimo);
  const resultado = {
    totalVendas: vendas_filtrado.length,
    vendas: vendas_filtrado,
  };
  return resultado;
};

console.log(filtrarVendas(jsonVendas, 2000));
