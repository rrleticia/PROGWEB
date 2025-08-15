// Função que simula uma requisição (resolve em 'ms' milissegundos)
const simulateRequest = (
  url,
  { ms = 800, shouldFail = false, payload = { ok: true } } = {}
) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Falha ao acessar ${url}`));
      } else {
        resolve({ url, ...payload, fetchedAt: new Date().toISOString() });
      }
    }, ms);
  });

simulateRequest("https://api.exemplo.dev/recurso", {
  ms: 500,
  payload: { data: [1, 2, 3] },
})
  .then((resp) => {
    console.log("Q01 OK:", resp);
  })
  .catch((err) => console.error("Q01 ERRO:", err.message));
