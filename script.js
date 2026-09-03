document.addEventListener('DOMContentLoaded', () => {

  const video = document.getElementById('curtainVideo');
  const playOverlay = document.getElementById('playOverlay');

  const music = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');

  let isPlaying = false;
  let shouldResumeOnVisible = false;

  function updateMusicButton() {
    if (musicIcon) {
      musicIcon.textContent = isPlaying ? '🔊' : '🔇';
    }
  }

  function pauseMusicForVisibility() {
    if (music && isPlaying && !music.paused) {
      music.pause();
      isPlaying = false;
      shouldResumeOnVisible = true;
      updateMusicButton();
    }
  }

  function resumeMusicForVisibility() {
    if (!music || !shouldResumeOnVisible) return;

    music.play()
      .then(() => {
        isPlaying = true;
        shouldResumeOnVisible = false;
        updateMusicButton();
      })
      .catch((err) => {
        console.log(err);
        shouldResumeOnVisible = false;
      });
  }

  // PREVENT SCROLL BEFORE OPEN
  document.body.style.overflow = 'hidden';

  // START EXPERIENCE
  function startExperience() {

    // HIDE OVERLAY
    playOverlay.style.opacity = '0';

    setTimeout(() => {
      playOverlay.style.display = 'none';
    }, 500);

    // PLAY VIDEO
    video.play().catch((err) => {
      console.log(err);
    });

    // PLAY MUSIC
    if (music) {

      music.volume = 0.3;

      music.play()
        .then(() => {

          isPlaying = true;
          musicIcon.textContent = '🔊';

        })
        .catch((err) => {
          console.log(err);
        });

    }

  }

  // CLICK EVENTS
  playOverlay.addEventListener('click', startExperience);

  playOverlay.addEventListener(
    'touchstart',
    startExperience,
    { passive:true }
  );

  // VIDEO END
  video.addEventListener('ended', () => {

    const heroSection = document.querySelector('.hero-section');

    heroSection.classList.add('hide');

    setTimeout(() => {

      heroSection.style.display = 'none';

      document.body.style.overflow = 'auto';

      window.scrollTo(0, 0);

    }, 1500);

  });

  // MUSIC TOGGLE
  musicToggle.addEventListener('click', () => {

    if (isPlaying) {

      music.pause();
      isPlaying = false;
      shouldResumeOnVisible = false;
      updateMusicButton();

    } else {

      music.play()
        .then(() => {
          isPlaying = true;
          shouldResumeOnVisible = false;
          updateMusicButton();
        })
        .catch((err) => {
          console.log(err);
        });

    }

  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseMusicForVisibility();
    } else {
      resumeMusicForVisibility();
    }
  });

  window.addEventListener('blur', pauseMusicForVisibility);
  window.addEventListener('focus', resumeMusicForVisibility);

});