const usuarios = [
  { nome: "Cleciana", idade: "25", ativo: "true", saldo: "1234.56" },
  { nome: "Gustavo", idade: 30, ativo: true, saldo: 980 },
  { nome: "Rayane", idade: null, ativo: "false", saldo: "1500.90" },
  { nome: "Igor", idade: "NaN", ativo: 1, saldo: undefined },
  { nome: "Samuel", idade: "22 anos", ativo: false, saldo: "0" },
];

const normalizarUsuario = (usuario) => {
  const idade = (() => {
    const num = parseInt(usuario.idade);
    return isNaN(num) ? null : num;
  })();

  const ativo = (() => {
    if (usuario.ativo === "true" || usuario.ativo === 1) return true;
    if (usuario.ativo === "false" || usuario.ativo === 0) return false;
    return Boolean(usuario.ativo);
  })();

  const saldo = (() => {
    const valor = parseFloat(usuario.saldo);
    return isNaN(valor) ? 0.0 : parseFloat(valor.toFixed(2));
  })();

  return {
    ...usuario,
    idade,
    ativo,
    saldo,
  };
};

const processarUsuario = (lista) => {
  lista.forEach((usuario) => {
    const normalizado = normalizarUsuario(usuario);
    console.log(normalizado);
  });
};

processarUsuario(usuarios);
