const funcionarios = [
  { nome: "Ana", cargo: "Desenvolvedora", salario: 7000 },
  { nome: "Carlos", cargo: "Gerente", salario: 12000 },
  { nome: "Beatriz", cargo: "Analista", salario: 5000 },
];

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};

const gerarRelatorio = (funcionarios) => {
  let totalFuncionarios = 0;
  let totalSalarios = 0;
  let relatorio = `Relatório de Funcionários
------------------------------------`;
  funcionarios.forEach((funcionario) => {
    totalFuncionarios++;
    totalSalarios += funcionario.salario;
    relatorio += `
Nome: ${funcionario.nome} - Cargo: ${
      funcionario.cargo
    } - Salário: ${formatarMoeda(funcionario.salario)}`;
  });
  relatorio += `
------------------------------------
Total de funcionários: ${totalFuncionarios}
Salário médio: ${formatarMoeda(totalSalarios / totalFuncionarios)}
`;

  return relatorio;
};
console.log(gerarRelatorio(funcionarios));
