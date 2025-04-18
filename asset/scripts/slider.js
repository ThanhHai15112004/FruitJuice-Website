const sliderWrapper = document.getElementById("sliderWrapper");
const slides = document.querySelectorAll(".slider__image");

let currentSlide = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;
let autoPlayInterval;

// Chuyển tới slide chỉ định
function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Slide tiếp theo
function goToNextSlide() {
  goToSlide(currentSlide + 1);
}

// === Drag trên desktop ===
sliderWrapper.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  sliderWrapper.style.cursor = "grabbing";

  const onMouseMove = (eMove) => {
    currentX = eMove.pageX;
    const diff = currentX - startX;
    if (Math.abs(diff) > 50) {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      if (diff > 0) goToSlide(currentSlide - 1);
      else goToSlide(currentSlide + 1);
    }
  };

  const onMouseUp = () => {
    isDragging = false;
    sliderWrapper.style.cursor = "grab";
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

// === Swipe trên điện thoại ===
sliderWrapper.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
  },
  { passive: true }
);

sliderWrapper.addEventListener(
  "touchmove",
  (e) => {
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(currentSlide - 1);
      else goToSlide(currentSlide + 1);
      startX = currentX; // reset start để không bị spam trượt
    }
  },
  { passive: true }
);

// === Auto play sau mỗi 30 giây ===
function startAutoPlay() {
  autoPlayInterval = setInterval(goToNextSlide, 30000); // 30s
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

sliderWrapper.addEventListener("mouseenter", stopAutoPlay);
sliderWrapper.addEventListener("mouseleave", startAutoPlay);

// === Khởi chạy ===
goToSlide(0);
startAutoPlay();
