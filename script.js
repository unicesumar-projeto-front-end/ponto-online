// Função para obter a localização do usuário
async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.");
      reject("Geolocation not supported");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        alert("Não foi possível obter a localização.");
        reject(error);
      }
    );
  });
}

// Função para iniciar a câmera
async function startCamera() {
  const video = document.getElementById("camera");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("Problema para acessar a câmera");
  }
}

startCamera();

// Atualização do relógio
(() => {
  function updateClock() {
    let clock = document.getElementById("clock");
    if (!clock) return;

    let now = new Date();
    let day = String(now.getDate()).padStart(2, "0");
    let month = String(now.getMonth() + 1).padStart(2, "0");
    let year = now.getFullYear();
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");

    clock.innerText = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  setInterval(updateClock, 1000);
  updateClock();
})();

// Função para capturar imagem, localização e salvar no localStorage
async function captureAndSave() {
  const video = document.getElementById("camera");
  const nameInput = document.querySelector("input[type=text]");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!nameInput.value) {
    alert("Por favor, digite seu nome.");
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL("image/png");
  const timestamp = new Date().toISOString();

  try {
    const location = await getUserLocation();

    const newEntry = {
      name: nameInput.value,
      timestamp,
      image: imageData,
      location
    };

    const storedData = localStorage.getItem("ponto");
    let pontoList = storedData ? JSON.parse(storedData) : [];

    pontoList.push(newEntry);

    localStorage.setItem("ponto", JSON.stringify(pontoList));
    alert("Ponto registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao capturar localização:", error);
  }
}

const form = document.getElementById("ponto-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  captureAndSave();
});