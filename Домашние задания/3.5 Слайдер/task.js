const slides = Array.from(document.querySelectorAll('.slider__item'));
const dots = Array.from(document.querySelectorAll('.slider__dot'));
const prevArrow = document.querySelector('.slider__arrow_prev');
const nextArrow = document.querySelector('.slider__arrow_next');

let slideIndex = 0;

function activateSlide(index) {
    slides[slideIndex].classList.remove('slider__item_active');
    if (dots.length > 0) {
        dots[slideIndex].classList.remove('slider__dot_active');
    }

    slideIndex = index;

    slides[slideIndex].classList.add('slider__item_active');
    if (dots.length > 0) {
        dots[slideIndex].classList.add('slider__dot_active');
    }
}


nextArrow.onclick = function() {
    let newIndex = slideIndex + 1;
    if (newIndex >= slides.length) {
        newIndex = 0;
    }
    activateSlide(newIndex);
};

prevArrow.onclick = function() {
    let newIndex = slideIndex - 1;
    if (newIndex < 0) {
        newIndex = slides.length - 1;
    }
    activateSlide(newIndex);
};

dots.forEach((dot, index) => {
    dot.onclick = function() {
        activateSlide(index);
    }
});

const images = document.querySelectorAll('.slider__image');
images.forEach(img => {
    img.style.objectFit = 'contain';
    img.parentElement.style.background = '#000';
});