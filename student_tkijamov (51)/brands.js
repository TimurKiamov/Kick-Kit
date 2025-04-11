/*
// JavaScript для простой карусели (если вы решите добавить карусель в карточки)
function nextSlide(productCard) {
    const carouselImages = productCard.querySelector('.carousel-images');
    if (!carouselImages) return; // Если карусели нет - выходим
    const images = carouselImages.querySelectorAll('.carousel-image');
    let currentIndex = parseInt(carouselImages.dataset.index) || 0; // Получаем текущий индекс или 0

    currentIndex = (currentIndex + 1) % images.length;
    carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
    carouselImages.dataset.index = currentIndex; // Сохраняем индекс
}

function prevSlide(productCard) {
    const carouselImages = productCard.querySelector('.carousel-images');
    if (!carouselImages) return; // Если карусели нет - выходим
    const images = carouselImages.querySelectorAll('.carousel-image');
    let currentIndex = parseInt(carouselImages.dataset.index) || 0; // Получаем текущий индекс или 0

    currentIndex = (currentIndex - 1 + images.length) % images.length;
    carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
    carouselImages.dataset.index = currentIndex; // Сохраняем индекс
}
*/
// Фильтрация по категориям (простой пример, можно улучшить)
const filterButtons = document.querySelectorAll('.filter-button');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active')); // Снять активность со всех кнопок
        this.classList.add('active'); // Активировать текущую кнопку

        const category = this.textContent.toLowerCase(); // Получить категорию из текста кнопки

        productCards.forEach(card => {
            const cardCategory = card.dataset.category ? card.dataset.category.toLowerCase() : 'все'; // Предполагаем, что у карточек есть data-category
            if (category === 'все' || cardCategory === category) {
                card.style.display = 'block'; // Показать
            } else {
                card.style.display = 'none'; // Скрыть
            }
        });
    });
});

// Для примера фильтрации - добавьте data-category к карточкам товаров в HTML, например:
// <div class="product-card" data-category="одежда"> ... </div>
// <div class="product-card" data-category="обувь"> ... </div>
