const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const map = L.map("map", { zoomControl: true });
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let marcadorDestino = null;
let marcadorOrigem = null;
let origemCoords = null;

const ORIGIN_NAME = "UFCG (Campus Campina Grande)";
const ORIGIN_ADDRESS =
  "Universidade Federal de Campina Grande, Campina Grande - PB, Brasil";

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

const fetchJSON = async (url) => {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

const geocode = async (query) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&accept-language=pt-BR&q=${encodeURIComponent(
    query
  )}`;
  const data = await fetchJSON(url);
  if (!data.length) return null;
  const { lat, lon, display_name } = data[0];
  return { lat: Number(lat), lon: Number(lon), label: display_name };
};

const routeDistanceKm = async ({ fromLon, fromLat, toLon, toLat }) => {
  const url = `https://router.project-osrm.org/route/v1/driving/${fromLon},${fromLat};${toLon},${toLat}?overview=false&alternatives=false&steps=false`;
  const data = await fetchJSON(url);
  if (!data?.routes?.length) throw new Error("Rota não encontrada");
  const meters = data.routes[0].distance;
  return meters / 1000;
};

const showToast = (msg) => alert(msg);

const setCard = ({ origem, destino, km }) => {
  const card = qs("#distancia-card");
  const kmEl = qs("#km");
  const custoEl = qs("#custo");
  const origemInfo = qs("#origem-info");
  const destinoInfo = qs("#destino-info");

  origemInfo.textContent = `Origem: ${origem}`;
  destinoInfo.textContent = `Destino: ${destino}`;

  const kmFmt = km.toLocaleString("pt-BR", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });
  kmEl.textContent = `${kmFmt} km`;

  const custo = km * 1.2;
  custoEl.textContent = BRL.format(custo);

  card.hidden = false;
};

const viaCepLookup = async (cepRaw) => {
  const cep = (cepRaw || "").replace(/\D/g, "");
  if (cep.length !== 8) return null;

  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`ViaCep HTTP ${res.status}`);
  const data = await res.json();

  if (data.erro) return null;

  const { logradouro, bairro, localidade, uf } = data;
  const partes = [logradouro, bairro].filter(Boolean).join(", ");
  const cidadeUf = [localidade, uf].filter(Boolean).join(" - ");
  return [partes, cidadeUf].filter(Boolean).join(", ");
};

const carrinho = [];

const atualizarCarrinho = () => {
  qs("#carrinho-contador").textContent = String(carrinho.length);

  const lista = qs("#itens-carrinho");
  lista.innerHTML = "";
  carrinho.forEach((livro) => {
    const li = document.createElement("li");
    li.textContent = livro;
    lista.appendChild(li);
  });
};

const adicionarCarrinho = (titulo) => {
  carrinho.push(titulo);
  atualizarCarrinho();
  showToast(`Livro "${titulo}" adicionado ao carrinho!`);
};

const toggleCarrinho = (forceOpen = null) => {
  const el = qs("#carrinho");
  const open =
    forceOpen === null ? el.getAttribute("aria-hidden") !== "false" : forceOpen;
  el.setAttribute("aria-hidden", open ? "false" : "true");
};

const esvaziarCarrinho = () => {
  carrinho.length = 0;
  atualizarCarrinho();
};

const bindUI = () => {
  qsa(".add").forEach((btn) => {
    btn.addEventListener("click", () => adicionarCarrinho(btn.dataset.title));
  });

  qs("#btn-carrinho").addEventListener("click", () => toggleCarrinho());
  qs("#btn-fechar-carrinho").addEventListener("click", () =>
    toggleCarrinho(false)
  );
  qs("#btn-esvaziar").addEventListener("click", esvaziarCarrinho);

  qs("#btn-localizar").addEventListener("click", localizarEndereco);

  const cepInput = qs("#cep");
  const endInput = qs("#endereco");

  let cepTimer = null;
  let ultimoEndereco = null;

  const triggerLookup = async (showError = false) => {
    try {
      const value = cepInput.value;
      const endereco = await viaCepLookup(value);
      if (endereco) {
        endInput.value = endereco;
        ultimoEndereco = endereco;
      } else {
        ultimoEndereco = null;
        if (showError && value.replace(/\D/g, "").length === 8) {
          showToast("CEP não encontrado no ViaCep.");
        }
      }
    } catch (e) {
      console.error(e);
      if (showError) {
        showToast("Falha ao consultar o ViaCep.");
      }
    }
  };

  cepInput.addEventListener("input", () => {
    clearTimeout(cepTimer);
    cepTimer = setTimeout(() => triggerLookup(false), 400);
  });

  cepInput.addEventListener("blur", () => triggerLookup(true));
};

const initOrigem = async () => {
  try {
    const origem = await geocode(ORIGIN_ADDRESS);
    if (!origem) throw new Error("Origem não encontrada");

    origemCoords = origem;
    const { lat, lon } = origem;

    map.setView([-15.775, -47.797], 5);

    if (marcadorOrigem) map.removeLayer(marcadorOrigem);
    marcadorOrigem = L.marker([lat, lon], { title: ORIGIN_NAME })
      .addTo(map)
      .bindPopup(`${ORIGIN_NAME}`)
      .openPopup();
  } catch (err) {
    console.error(err);
    showToast("Não foi possível localizar a origem (UFCG).");
  }
};

const localizarEndereco = async () => {
  const cep = qs("#cep").value.trim();
  const end = qs("#endereco").value.trim();

  if (!cep || !end) {
    showToast("Por favor, preencha o CEP e o endereço completo.");
    return;
  }
  if (!origemCoords) {
    showToast("Aguarde carregar a origem (UFCG) e tente novamente.");
    return;
  }

  try {
    const destino = await geocode(`${end}, ${cep}, Brasil`);
    if (!destino) {
      showToast("Endereço não encontrado. Verifique os dados.");
      return;
    }

    if (marcadorDestino) map.removeLayer(marcadorDestino);
    marcadorDestino = L.marker([destino.lat, destino.lon], {
      title: "Endereço de entrega",
    })
      .addTo(map)
      .bindPopup("Endereço de entrega")
      .openPopup();

    const bounds = L.latLngBounds(
      [origemCoords.lat, origemCoords.lon],
      [destino.lat, destino.lon]
    );
    map.fitBounds(bounds, { padding: [40, 40] });

    const km = await routeDistanceKm({
      fromLon: origemCoords.lon,
      fromLat: origemCoords.lat,
      toLon: destino.lon,
      toLat: destino.lat,
    });

    setCard({
      origem: ORIGIN_NAME,
      destino: destino.label,
      km,
    });
  } catch (err) {
    console.error(err);
    showToast("Erro ao calcular a rota. Tente novamente mais tarde.");
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  bindUI();
  atualizarCarrinho();
  await initOrigem();
});
