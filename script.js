const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const button = document.getElementById("captureBtn");
const overlay = document.querySelector(".overlay");

let photoCount = 1;

navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" }
})
.then(stream => video.srcObject = stream)
.catch(err => alert("Erro ao acessar câmera: " + err));

button.addEventListener("click", () => {
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);
  ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

  const img = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = img;
  link.download = `foto_${photoCount}.png`;
  link.click();

  photoCount++;
});
