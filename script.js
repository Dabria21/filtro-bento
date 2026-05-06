const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const button = document.getElementById("captureBtn");
const overlay = document.querySelector(".overlay");

// 🔢 contador persistente (não zera ao recarregar)
let photoCount = localStorage.getItem("photoCount") || 1;

// 📷 câmera com melhor qualidade possível
navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: "user",
    width: { ideal: 1920 },
    height: { ideal: 1080 }
  },
  audio: false
})
.then(stream => {
  video.srcObject = stream;
})
.catch(err => {
  alert("Erro ao acessar câmera: " + err.message);
});

// 📸 capturar foto
button.addEventListener("click", () => {
  const ctx = canvas.getContext("2d");

  // 🔥 usa resolução REAL do celular
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  // imagem mais nítida
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // desenha vídeo
  ctx.drawImage(video, 0, 0, width, height);

  // desenha filtro proporcional
  ctx.drawImage(overlay, 0, 0, width, height);

  // qualidade máxima
  const img = canvas.toDataURL("image/png", 1.0);

  // download automático
  const link = document.createElement("a");
  link.href = img;
  link.download = `foto_${photoCount}.png`;
  link.click();

  // incrementa e salva
  photoCount++;
  localStorage.setItem("photoCount", photoCount);
});
