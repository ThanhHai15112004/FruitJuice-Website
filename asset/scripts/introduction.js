document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector("#introSliderTrack");
    const slides = document.querySelectorAll(".intro-slide");
    const prevBtn = document.querySelector(".prev-slide");
    const nextBtn = document.querySelector(".next-slide");
  
    let currentSlide = 0;
  
    function updateSlider() {
      track.style.transform = `translateX(-${currentSlide * 100}vw)`;
    }
  
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    });
  
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    });
  
    window.addEventListener("resize", updateSlider);
    updateSlider(); // initialize
  });
  