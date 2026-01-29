// Design carousel functionality
  const containerDes = document.querySelector('.container-apps-des');
  const designCards = Array.from(document.querySelectorAll('.container-apps-des > div'));
  const prevBtnDes = document.querySelector('.carousel-prev-des');
  const nextBtnDes = document.querySelector('.carousel-next-des');

  let currentScrollDes = 0;
  const cardWidth = 300; // card width
  const cardGap = 10; // gap between cards
  const cardsPerView = 3; // visible cards at once
  const totalCards = designCards.length;
  const maxScroll = Math.max(0, (totalCards - cardsPerView));

  function updateCarouselDes() {
    const translateValue = -(currentScrollDes * (cardWidth + cardGap));
    containerDes.style.left = `${translateValue}px`;

    // Hide/show arrows based on position
    prevBtnDes.style.opacity = currentScrollDes === 0 ? '0.3' : '1';
    prevBtnDes.style.pointerEvents = currentScrollDes === 0 ? 'none' : 'auto';

    nextBtnDes.style.opacity = currentScrollDes >= maxScroll ? '0.3' : '1';
    nextBtnDes.style.pointerEvents = currentScrollDes >= maxScroll ? 'none' : 'auto';
  }

  prevBtnDes.addEventListener('click', () => {
    if (currentScrollDes > 0) {
      currentScrollDes--;
      updateCarouselDes();
    }
  });

  nextBtnDes.addEventListener('click', () => {
    if (currentScrollDes < maxScroll) {
      currentScrollDes++;
      updateCarouselDes();
    }
  });

  updateCarouselDes();

  const track = document.querySelector('.carousel-track');
  const cards = Array.from(document.querySelectorAll('.job-card'));
  let current = 0;

  function applyClasses() {
    const total = cards.length;
    const prev = (current - 1 + total) % total;
    const next = (current + 1) % total;

    cards.forEach((card, idx) => {
      card.classList.remove('is-prev', 'is-active', 'is-next', 'is-hidden');
      if (idx === current) return card.classList.add('is-active');
      if (idx === prev) return card.classList.add('is-prev');
      if (idx === next) return card.classList.add('is-next');
      card.classList.add('is-hidden');
    });
  }

  function handleClick(e) {
    const card = e.currentTarget;
    if (card.classList.contains('is-prev')) {
      current = (current - 1 + cards.length) % cards.length;
      applyClasses();
    } else if (card.classList.contains('is-next')) {
      current = (current + 1) % cards.length;
      applyClasses();
    }
  }

  cards.forEach(card => card.addEventListener('click', handleClick));
  applyClasses();

  //for fade om animations 
  const els = document.querySelectorAll('.scroll-fade');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  els.forEach(el => observer.observe(el));

  // Modal functionality
  const modal = document.getElementById('designModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalImages = document.getElementById('modalImages');
  const modalClose = document.querySelector('.modal-close');

  const designData = {
    kiki: {
      title: "KiKi's Delivery Service",
      description: "Poster design inspired by KiKi's Delivery Service.",
      images: ['images/kikis-poster.png']
    },
    spirits: {
      title: 'Spirits Bath House',
      description: 'Spirited Away themed poster for a bath house',
      images: ['images/spirited-poster.png']
    },
    howl: {
      title: "Howl's Moving Company",
      description: "Poster for a moving company inspired by Howl's Moving Castle.",
      images: ['images/howl-poster.png']
    },
    ponyo: {
      title: 'Ponyo Shipping Company',
      description: 'Ponyo inspired poster for a shipping company. ',
      images: ['images/ponyo-poster.png']
    },
    laputa: {
      title: 'Laputa',
      description: 'Castle in the Sky inspired poster for a jewelry business.',
      images: ['images/laputa-poster.png']
    },
    totoro: {
      title: 'Totoro',
      description: 'Plant nursery inspired by Totoro.',
      images: ['images/totoro-poster.png']
    }
  };

  // Add click event to all design cards
  document.querySelectorAll('.poster-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // Only prevent default if it's a div (not an anchor link)
      if (card.tagName !== 'A') {
        e.preventDefault();
        e.stopPropagation();
      }

      const designId = card.getAttribute('data-design');
      const data = designData[designId];

      if (data) {
        // Only show modal for div cards, not anchor tags
        if (card.tagName !== 'A') {
          modalTitle.textContent = data.title;
          modalDescription.textContent = data.description;

          // Clear and add images
          modalImages.innerHTML = '';
          data.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = data.title;
            img.onerror = () => {
              img.src = 'images/placeholder.jpg';
            };
            modalImages.appendChild(img);
          });

          // Small delay to prevent immediate close
          setTimeout(() => {
            modal.style.display = 'block';
            modal.scrollTop = 0; // Scroll modal to top
            document.body.style.overflow = 'hidden';
          }, 10);
        }
      }
    });
  });

  // Close modal function
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Close button
  modalClose.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  });

  // Click outside modal to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Prevent clicks inside modal content from closing
  document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });

  //download resume from button click
  document.getElementById('download-resume').addEventListener('click', function(event) {
  event.preventDefault();
  const link = document.createElement('a');
  link.href = this.href;
  link.download = "Madison's Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});