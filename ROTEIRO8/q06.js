const colocarTodasLetrasEmMaiusculoEm500msAsync = async (valor) => {
  if (typeof valor !== "string") {
    throw new TypeError("O parâmetro deve ser do tipo String.");
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  return valor.toUpperCase();
};

const inverteTodasLetrasAsync = async (texto) => {
  return [...texto].reverse().join("");
};

const processarTexto = async (entrada) => {
  try {
    const mai = await colocarTodasLetrasEmMaiusculoEm500msAsync(entrada);
    const inv = await inverteTodasLetrasAsync(mai);
    console.log("Q06 resultado:", inv);
  } catch (err) {
    console.error("Q06 erro:", err.message);
  }
};

processarTexto("web i");
processarTexto(123); // erro esperado
