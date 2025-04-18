function toggleMenu() {
  const nav = document.getElementById("mainNav");
  const overlay = document.getElementById("headerOverlay");
  nav.classList.toggle("show");
  overlay.classList.toggle("show");
}

function toggleSubmenu() {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("show");
}
