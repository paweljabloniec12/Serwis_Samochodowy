document.addEventListener('DOMContentLoaded', function () {
    // Wyświetl okienko po odświeżeniu strony
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
});
// Zamknij okienko po kliknięciu "X"
const closePopup = document.getElementById('close-popup');
closePopup.addEventListener('click', function () {
    popup.style.display = 'none';
});

// Kliknięcie przycisku telefonu
const callButton = document.getElementById('call-button');
callButton.addEventListener('click', function () {
    window.location.href = 'tel:513150535';
});

// Pobierz wszystkie elementy galerii
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

// Otwórz lightbox po kliknięciu zdjęcia
galleryItems.forEach((item, index) => {
    item.addEventListener('click', function () {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentIndex = index;
    const fullImgSrc = galleryItems[currentIndex].getAttribute('data-full');
    lightboxImg.src = fullImgSrc;
    lightbox.style.display = 'flex';
}

// Zamknij lightbox po kliknięciu X lub poza zdjęciem
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
        lightbox.style.display = 'none';
    }
});

// Przewijanie zdjęć
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

function showPrevImage() {
    currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
    openLightbox(currentIndex);
}

function showNextImage() {
    currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
    openLightbox(currentIndex);
}

// Przewijanie klawiaturą
document.addEventListener('keydown', function (event) {
    if (lightbox.style.display === 'flex') {
        if (event.key === 'ArrowLeft') {
            showPrevImage();
        } else if (event.key === 'ArrowRight') {
            showNextImage();
        } else if (event.key === 'Escape') {
            lightbox.style.display = 'none';
        }
    }
});

