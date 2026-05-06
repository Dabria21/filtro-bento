const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const button = document.getElementById("captureBtn");
const overlay = document.querySelector(".overlay");

// contador persistente
let photoCount = localStorage.getItem("photoCount") || 1;

// iniciar câmera
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

// tirar foto
button.addEventListener("click", () => {
  const ctx = canvas.getContext("2d");

  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // vídeo
  ctx.drawImage(video, 0, 0, width, height);

  // overlay proporcional
  ctx.drawImage(overlay, 0, 0, width, height);

  const img = canvas.toDataURL("image/png", 1.0);

  const link = document.createElement("a");
  link.href = img;
  link.download = `foto_${photoCount}.png`;
  link.click();

  photoCount++;
  localStorage.setItem("photoCount", photoCount);
});
