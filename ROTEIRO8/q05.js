const colocarTodasLetrasEmMaiusculoEm500ms = (valor) =>
  new Promise((resolve, reject) => {
    if (typeof valor !== "string") {
      reject(new TypeError("O parâmetro deve ser do tipo String."));
      return;
    }
    setTimeout(() => resolve(valor.toUpperCase()), 500);
  });

const inverteTodasLetras = (texto) =>
  new Promise((resolve) => {
    const invertida = [...texto].reverse().join("");
    resolve(invertida);
  });

colocarTodasLetrasEmMaiusculoEm500ms("web i")
  .then((mai) => inverteTodasLetras(mai))
  .then((res) => console.log("Q05 resultado:", res)) // "I BEW" -> "I BEW" invertido
  .catch((err) => console.error("Q05 erro:", err.message));

colocarTodasLetrasEmMaiusculoEm500ms(123)
  .then(inverteTodasLetras)
  .then((res) => console.log("Q05 (não deveria chegar aqui):", res))
  .catch((err) => console.error("Q05 erro esperado:", err.message));
