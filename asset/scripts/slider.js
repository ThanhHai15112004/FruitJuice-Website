document.addEventListener("DOMContentLoaded", function() {
  const sliderWrapper = document.getElementById("sliderWrapper");
  const slides = document.querySelectorAll(".slider__image");
  
  // Check if elements exist to prevent errors
  if (!sliderWrapper || slides.length === 0) {
      console.error("Slider elements not found!");
      return;
  }
  
  let currentSlide = 0;
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let autoPlayInterval;

  // Make sure slider wrapper has the correct initial width
  sliderWrapper.style.width = `${slides.length * 100}%`;
  slides.forEach(slide => {
      slide.style.width = `${100 / slides.length}%`;
  });

  // Chuyển tới slide chỉ định
  function goToSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      sliderWrapper.style.transform = `translateX(-${currentSlide * (100 / slides.length)}%)`;
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

      function onMouseMove(eMove) {
          if (!isDragging) return;
          
          currentX = eMove.pageX;
          const diff = currentX - startX;
          if (Math.abs(diff) > 50) {
              isDragging = false;
              if (diff > 0) goToSlide(currentSlide - 1);
              else goToSlide(currentSlide + 1);
              
              document.removeEventListener("mousemove", onMouseMove);
              document.removeEventListener("mouseup", onMouseUp);
          }
      }

      function onMouseUp() {
          isDragging = false;
          sliderWrapper.style.cursor = "grab";
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      
      // Prevent default to avoid text selection during drag
      e.preventDefault();
  });

  // === Swipe trên điện thoại ===
  sliderWrapper.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
  }, { passive: true });

  sliderWrapper.addEventListener("touchmove", (e) => {
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      if (Math.abs(diff) > 50) {
          if (diff > 0) goToSlide(currentSlide - 1);
          else goToSlide(currentSlide + 1);
          startX = currentX; // reset start để không bị spam trượt
      }
  }, { passive: true });

  // === Auto play sau mỗi 5 giây (thay vì 30) để dễ kiểm tra ===
  function startAutoPlay() {
      stopAutoPlay(); // Clear any existing interval first
      autoPlayInterval = setInterval(goToNextSlide, 5000); // 5s for testing
  }

  function stopAutoPlay() {
      if (autoPlayInterval) {
          clearInterval(autoPlayInterval);
      }
  }

  sliderWrapper.addEventListener("mouseenter", stopAutoPlay);
  sliderWrapper.addEventListener("mouseleave", startAutoPlay);
  
  // Touch events should also stop/start autoplay
  sliderWrapper.addEventListener("touchstart", stopAutoPlay);
  sliderWrapper.addEventListener("touchend", startAutoPlay);

  // === Khởi chạy ===
  goToSlide(0);
  startAutoPlay();
  
  // Add debugging
  console.log("Slider initialized with", slides.length, "slides");
});