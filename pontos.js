async function getStreetName(latitude, longitude) {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
  if (!response.ok) {
    console.error("Erro ao buscar o nome da rua");
    return "Não especificada";
  }
  const data = await response.json();
  return data.address && data.address.road ? data.address.road : "Não especificada";
}

async function displayPontos() {
  const storedData = localStorage.getItem("ponto");
  let pontoList = storedData ? JSON.parse(storedData) : [];

  const pontosContainer = document.getElementById("pontos-container");
  pontosContainer.innerHTML = "";

  if (pontoList.length === 0) {
    pontosContainer.innerHTML = "<p>Nenhum ponto registrado.</p>";
    return;
  }

  for (const entry of pontoList) {
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("ponto-entry");

    const name = document.createElement("p");
    name.textContent = `Nome: ${entry.name}`;

    const timestamp = document.createElement("p");
    timestamp.textContent = `Data e Hora: ${new Date(entry.timestamp).toLocaleString()}`;

    const location = document.createElement("p");
    if (entry.location && entry.location.latitude && entry.location.longitude) {
      const streetName = await getStreetName(entry.location.latitude, entry.location.longitude);
      location.textContent = `Localização: ${streetName}`;
    } else {
      location.textContent = "Localização: Não especificada";
    }

    const image = document.createElement("img");
    image.src = entry.image;
    image.alt = `ponto de ${entry.name}`;
    // image.style.width = "200px";

    entryDiv.appendChild(name);
    entryDiv.appendChild(timestamp);
    entryDiv.appendChild(location);
    entryDiv.appendChild(image);

    pontosContainer.appendChild(entryDiv);
  }
}

document.addEventListener("DOMContentLoaded", displayPontos);
