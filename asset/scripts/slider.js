const sliderWrapper = document.getElementById("sliderWrapper");
const slides = document.querySelectorAll(".slider__image");

let currentSlide = 0;
let isDragging = false;
let startX = 0;
let autoPlayInterval;

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function goToNextSlide() {
  goToSlide(currentSlide + 1);
}

// Drag / Swipe
sliderWrapper.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.pageX;
});

sliderWrapper.addEventListener("mouseup", e => {
  if (!isDragging) return;
  const diff = e.pageX - startX;
  if (diff > 50) goToSlide(currentSlide - 1);
  else if (diff < -50) goToSlide(currentSlide + 1);
  isDragging = false;
});

sliderWrapper.addEventListener("mouseleave", () => {
  isDragging = false;
});

sliderWrapper.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
}, { passive: true });

sliderWrapper.addEventListener("touchend", e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff > 50) goToSlide(currentSlide - 1);
  else if (diff < -50) goToSlide(currentSlide + 1);
}, { passive: true });

// Auto play
function startAutoPlay() {
  autoPlayInterval = setInterval(goToNextSlide, 4000); // mỗi 4s
}
function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}
sliderWrapper.addEventListener("mouseenter", stopAutoPlay);
sliderWrapper.addEventListener("mouseleave", startAutoPlay);

// Init
goToSlide(0);
startAutoPlay();
