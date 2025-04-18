//on off menu

function toggleMenu(forceClose = false) {
  const nav = document.getElementById("mainNav");
  const overlay = document.getElementById("headerOverlay");

  if (forceClose || nav.classList.contains("show")) {
    nav.classList.remove("show");
    overlay.classList.remove("show");
  } else {
    nav.classList.add("show");
    overlay.classList.add("show");
  }
}

// Bắt sự kiện click ra ngoài menu
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("headerOverlay");

  overlay.addEventListener("click", () => {
    toggleMenu(true); // Force đóng
  });
});
