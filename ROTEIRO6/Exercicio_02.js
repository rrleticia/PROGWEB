const frases = [
  "JavaScript é poderoso!",
  "Callbacks são úteis.",
  "Arrow functions são mais curtas.",
];

const analisarTexto = (array, callback) => {
  return callback(array);
};

// Callback que conta o total de palavras em todas as frases
const contarPalavras = (array) => {
  const lista_frases = array.map((frase) => frase.split(" "));
  const lista_lengths = lista_frases.map((lista) => lista.length);
  const total = lista_lengths.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return total;
};

// Callback que encontra a frase com mais palavras
const maiorFrase = (array) => {
  const lista_frases = array.map((frase) => frase.split(" "));
  const lista_lengths = lista_frases.map((lista, index) => ({
    index: index,
    length: lista.length,
  }));
  const order_lengths = lista_lengths.sort((a, b) => b.length - a.length);
  const maior_frase = array[order_lengths[0].index];
  return maior_frase;
};
console.log(analisarTexto(frases, contarPalavras));
console.log(analisarTexto(frases, maiorFrase));
