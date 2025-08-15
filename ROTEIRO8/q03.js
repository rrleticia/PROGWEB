const combineObjects = (
  objA,
  objB,
  cb = (x) => console.log("Q03 combinado:", x)
) => {
  const combined = { ...objA, ...objB };
  cb(combined);
  return combined;
};

combineObjects({ id: 1, nome: "Teclado" }, { preco: 199.9, estoque: 10 });
