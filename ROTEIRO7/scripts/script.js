const map = L.map("map").setView([-15.7942, -47.8822], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let marcador;
const carrinho = [];

const adicionarCarrinho = (livro) => {
  carrinho.push(livro);
  atualizarCarrinho();
  alert(`Livro "${livro}" adicionado ao carrinho!`);
};

const atualizarCarrinho = () => {
  const contador = document.getElementById("carrinho-contador");
  const lista = document.getElementById("itens-carrinho");

  contador.textContent = carrinho.length;
  lista.innerHTML = "";

  carrinho.forEach((livro) => {
    const item = document.createElement("li");
    item.textContent = livro;
    lista.appendChild(item);
  });
};

const toggleCarrinho = () => {
  const carrinhoEl = document.getElementById("carrinho");
  carrinhoEl.style.display =
    carrinhoEl.style.display === "block" ? "none" : "block";
};

const esvaziarCarrinho = () => {
  carrinho.length = 0;
  atualizarCarrinho();
};

const localizarEndereco = () => {
  const cep = document.getElementById("cep").value;
  const endereco = document.getElementById("endereco").value;

  const query = encodeURIComponent(`${endereco}, ${cep}, Brasil`);

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        console.log(data);
        const { lat, lon } = data[0];

        map.setView([lat, lon], 16);

        if (marcador) {
          map.removeLayer(marcador);
        }

        marcador = L.marker([lat, lon])
          .addTo(map)
          .bindPopup("Endereço de entrega")
          .openPopup();
      } else {
        alert("Endereço não encontrado. Verifique os dados.");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Erro ao buscar localização. Tente novamente mais tarde.");
    });
};
