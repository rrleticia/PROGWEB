const somarParesConsecutivos = (x, callback) => {
  const inicio = x % 2 === 0 ? x : x + 1;
  const pares = Array.from({ length: 5 }, (_, i) => inicio + i * 2);
  const soma = callback(pares);
  console.log(soma);
};

// Callback para somar
const somatorio = (array) => array.reduce((acc, curr) => acc + curr, 0);

somarParesConsecutivos(4, somatorio); // Saída: 40
somarParesConsecutivos(11, somatorio); // Saída: 80
