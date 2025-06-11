class PresentationApp {
  constructor() {
    this.slides = [
      "slides/1-about-me.html",
      "slides/2-my-journey.html",
      "slides/3-my-time-at-ncino.html",
      "slides/4-motivation.html",
      "slides/5-grow-together.html",
    ];

    this.currentSlide = 0;
    this.isAutoPlay = false;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 10000; // 10 seconds
    this.isFullscreen = false;
    this.controlsTimeout = null;

    this.initializeElements();
    this.attachEventListeners();
    this.setupKeyboardShortcuts();
    this.showWelcomeScreen();
  }

  initializeElements() {
    this.slideFrame = document.getElementById("slideFrame");
    this.controls = document.getElementById("controls");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.playPauseBtn = document.getElementById("playPauseBtn");
    this.fullscreenBtn = document.getElementById("fullscreenBtn");
    this.helpBtn = document.getElementById("helpBtn");
    this.slideCounter = document.getElementById("slideCounter");
    this.progressBar = document.getElementById("progressBar");
    this.loading = document.getElementById("loading");
    this.welcomeScreen = document.getElementById("welcomeScreen");
    this.startBtn = document.getElementById("startBtn");
    this.helpOverlay = document.getElementById("helpOverlay");
  }

  attachEventListeners() {
    this.startBtn.addEventListener("click", () => this.startPresentation());
    this.prevBtn.addEventListener("click", () => this.previousSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());
    this.playPauseBtn.addEventListener("click", () => this.toggleAutoPlay());
    this.fullscreenBtn.addEventListener("click", () => this.toggleFullscreen());
    this.helpBtn.addEventListener("click", () => this.toggleHelp());

    // Mouse movement to show/hide controls
    document.addEventListener("mousemove", () => this.showControls());
    document.addEventListener("mouseleave", () => this.hideControls());

    // Fullscreen change event
    document.addEventListener("fullscreenchange", () =>
      this.handleFullscreenChange()
    );
    document.addEventListener("webkitfullscreenchange", () =>
      this.handleFullscreenChange()
    );
    document.addEventListener("mozfullscreenchange", () =>
      this.handleFullscreenChange()
    );
    document.addEventListener("MSFullscreenChange", () =>
      this.handleFullscreenChange()
    );

    // Iframe load event
    this.slideFrame.addEventListener("load", () => this.handleSlideLoad());
  }

  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Don't handle shortcuts if help is visible
      if (this.helpOverlay.style.display === "flex") {
        if (e.key === "Escape" || e.key === "h" || e.key === "H") {
          this.toggleHelp();
        }
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          this.nextSlide();
          break;
        case "ArrowLeft":
        case "Backspace":
          e.preventDefault();
          this.previousSlide();
          break;
        case "Home":
          e.preventDefault();
          this.goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          this.goToSlide(this.slides.length - 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case "h":
        case "H":
          e.preventDefault();
          this.toggleHelp();
          break;
        case "Escape":
          if (this.isFullscreen) {
            this.exitFullscreen();
          }
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
          e.preventDefault();
          const slideNumber = parseInt(e.key) - 1;
          if (slideNumber >= 0 && slideNumber < this.slides.length) {
            this.goToSlide(slideNumber);
          }
          break;
      }
    });
  }

  showWelcomeScreen() {
    this.welcomeScreen.style.display = "flex";
  }

  startPresentation() {
    this.welcomeScreen.style.opacity = "0";
    setTimeout(() => {
      this.welcomeScreen.style.display = "none";
      this.loadSlide(0);
      this.showControls();
    }, 500);
  }

  loadSlide(index) {
    if (index < 0 || index >= this.slides.length) return;

    this.showLoading();
    this.currentSlide = index;
    this.slideFrame.src = this.slides[index];
    this.updateUI();
  }

  handleSlideLoad() {
    this.hideLoading();
  }

  nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.loadSlide(this.currentSlide + 1);
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.loadSlide(this.currentSlide - 1);
    }
  }

  goToSlide(index) {
    this.loadSlide(index);
  }

  toggleAutoPlay() {
    this.isAutoPlay = !this.isAutoPlay;

    if (this.isAutoPlay) {
      this.startAutoPlay();
      this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      this.stopAutoPlay();
      this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }

  startAutoPlay() {
    this.stopAutoPlay(); // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      if (this.currentSlide < this.slides.length - 1) {
        this.nextSlide();
      } else {
        this.stopAutoPlay();
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.isAutoPlay = false;
      }
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  toggleFullscreen() {
    if (!this.isFullscreen) {
      this.enterFullscreen();
    } else {
      this.exitFullscreen();
    }
  }

  enterFullscreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  handleFullscreenChange() {
    this.isFullscreen = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    if (this.isFullscreen) {
      this.fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
      document.body.style.cursor = "none";
    } else {
      this.fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
      document.body.style.cursor = "default";
    }
  }

  toggleHelp() {
    if (this.helpOverlay.style.display === "flex") {
      this.helpOverlay.style.display = "none";
    } else {
      this.helpOverlay.style.display = "flex";
    }
  }

  showControls() {
    this.controls.classList.add("visible");
    document.body.style.cursor = "default";

    // Auto-hide controls after 3 seconds
    clearTimeout(this.controlsTimeout);
    this.controlsTimeout = setTimeout(() => {
      if (this.isFullscreen) {
        this.hideControls();
      }
    }, 3000);
  }

  hideControls() {
    if (this.isFullscreen) {
      this.controls.classList.remove("visible");
      document.body.style.cursor = "none";
    }
  }

  showLoading() {
    this.loading.classList.remove("hidden");
  }

  hideLoading() {
    this.loading.classList.add("hidden");
  }

  updateUI() {
    // Update slide counter
    this.slideCounter.textContent = `${this.currentSlide + 1} / ${
      this.slides.length
    }`;

    // Update progress bar
    const progress = ((this.currentSlide + 1) / this.slides.length) * 100;
    this.progressBar.style.width = `${progress}%`;

    // Update navigation buttons
    this.prevBtn.disabled = this.currentSlide === 0;
    this.nextBtn.disabled = this.currentSlide === this.slides.length - 1;

    // Update page title
    const slideNames = [
      "About Me",
      "My Journey",
      "My Time at nCino",
      "What Drives Me",
      "Growing Together",
    ];
    document.title = `${slideNames[this.currentSlide]} - Yoonsoo Park`;
  }
}

// Global function for help overlay (called from HTML)
function toggleHelp() {
  if (window.presentationApp) {
    window.presentationApp.toggleHelp();
  }
}

// Initialize the presentation when the page loads
document.addEventListener("DOMContentLoaded", () => {
  window.presentationApp = new PresentationApp();
});

// Handle page visibility change (pause auto-play when tab is not visible)
document.addEventListener("visibilitychange", () => {
  if (window.presentationApp) {
    if (document.hidden && window.presentationApp.isAutoPlay) {
      window.presentationApp.stopAutoPlay();
    }
  }
});

// Prevent context menu in fullscreen mode
document.addEventListener("contextmenu", (e) => {
  if (window.presentationApp && window.presentationApp.isFullscreen) {
    e.preventDefault();
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  // Ensure proper scaling on window resize
  if (window.presentationApp) {
    window.presentationApp.showControls();
  }
});
