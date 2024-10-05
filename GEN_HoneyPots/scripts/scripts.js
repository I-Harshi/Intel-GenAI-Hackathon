const carousel = document.querySelector('.carousel');
let carouselIndex = 0;

function changeImage() {
  const images = carousel.querySelectorAll('img');
  images.forEach((img, index) => {
    img.style.transform = `translateX(-${carouselIndex * 100}%)`;
  });
  carouselIndex = (carouselIndex + 1) % images.length;
}

setInterval(changeImage, 3000);
