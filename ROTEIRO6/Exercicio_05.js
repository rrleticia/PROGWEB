let clientesJSON = `[
{"nome": "Lucas", "idade": 30, "email": "lucas@email.com"},
{"nome": "Mariana", "idade": 25, "email": "mariana@email.com"}
]`;

const adicionarCliente = (json, nome, idade, email) => {
  let clientes = JSON.parse(json);
  clientes.push({ nome: nome, idade: idade, email: email });
  clientesJSON = JSON.stringify(clientes);
  return clientesJSON;
};

const buscarCliente = (json, nome) => {
  let clientes = JSON.parse(json);
  let target = clientes.find((cliente) => cliente.nome == nome);
  const resultado = `Cliente encontrado:
Nome: ${target.nome}
Idade: ${target.idade}
Email: ${target.email}`;
  return resultado;
};

// Testando...
clientesJSON = adicionarCliente(
  clientesJSON,
  "Roberto",
  40,
  "roberto@email.com"
);

console.log(buscarCliente(clientesJSON, "Roberto"));
