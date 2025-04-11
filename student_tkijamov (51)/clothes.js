document.addEventListener('DOMContentLoaded', function() {
    const mainCarouselTrack = document.querySelector('.main-carousel-track');
    const mainCarouselItems = document.querySelectorAll('.main-carousel-item');
    const mainPrevButton = document.querySelector('.main-carousel-button.prev');
    const mainNextButton = document.querySelector('.main-carousel-button.next');

    const thumbnailTrack = document.querySelector('.thumbnail-track');
    const thumbnailItems = document.querySelectorAll('.thumbnail-item');

    let currentIndex = 0;
    let mainItemWidth = mainCarouselItems[0].offsetWidth;
    let itemsToShow = 1;

    function updateMainCarousel() {
        mainCarouselTrack.style.transform = `translateX(${-currentIndex * mainItemWidth}px)`;
        updateThumbnails();

        mainPrevButton.disabled = currentIndex === 0;
        mainNextButton.disabled = currentIndex >= mainCarouselItems.length - itemsToShow;
    }

    function updateThumbnails() {
        thumbnailItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    mainPrevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateMainCarousel();
        }
    });

    mainNextButton.addEventListener('click', () => {
        if (currentIndex < mainCarouselItems.length - itemsToShow) {
            currentIndex++;
            updateMainCarousel();
        }
    });
    thumbnailItems.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            updateMainCarousel();
        });
    });

    window.addEventListener('resize', () => {
        mainItemWidth = mainCarouselItems[0].offsetWidth;
        updateMainCarousel();
    });

    updateMainCarousel();
    updateThumbnails();
});

   
                  

    // Выбор размера
    const sizeOptions = $('.size-option');
    sizeOptions.on('click', function() {
        if (!$(this).hasClass('disabled')) {
            sizeOptions.removeClass('active');
            $(this).addClass('active');
        }
    });

    // Функция для создания звезд рейтинга (используем Font Awesome и JS для гибкости)
    function generateRatingStars(rating) {
        let starsHTML = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fa-solid fa-star"></i>';
        }
        if (hasHalfStar) {
            starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="fa-regular fa-star"></i>'; // Используйте fa-regular для пустых звезд (если Font Awesome 6)
        }
        return starsHTML;
    }

    // Пример данных отзывов (замените на реальные данные с сервера)
    const reviewsData = [
        {
            reviewerName: "Анна И.",
            reviewDate: "15 июля 2023",
            rating: 5,
            reviewText: "Отличные кроссовки! Очень удобные и стильные. Размер подошел идеально. Доставка быстрая, упаковка качественная. Рекомендую!",
            hasPhoto: false // Пример флага для фильтрации по фото
        },
        {
            reviewerName: "Иван П.",
            reviewDate: "28 июня 2023",
            rating: 3,
            reviewText: "В целом неплохо, но ожидал большего. Качество материалов на среднем уровне. Размер немного большемерит. За такую цену можно найти лучше.",
            hasPhoto: true // Пример флага для фильтрации по фото
        },
        {
            reviewerName: "Елена С.",
            reviewDate: "5 июля 2023",
            rating: 5,
            reviewText: "Просто супер! Кроссовки превзошли все мои ожидания. Комфорт на высоте, выглядят потрясающе. Спасибо магазину!",
            hasPhoto: false
        },
        // ... добавьте больше отзывов
    ];

    const reviewsListContainer = $('.reviews-list');

    function displayReviews(reviewsToDisplay) {
        reviewsListContainer.empty(); // Очищаем предыдущие отзывы
        if (reviewsToDisplay.length === 0) {
            reviewsListContainer.html('<p>Нет отзывов, соответствующих выбранным фильтрам.</p>');
            return;
        }
        reviewsToDisplay.forEach(review => {
            const reviewHTML = `
                <article class="review-item">
                    <div class="review-header">
                        <div class="reviewer-info">
                            <p class="reviewer-name">${review.reviewerName}</p>
                            <p class="review-date">${review.reviewDate}</p>
                        </div>
                        <div class="review-rating">
                            ${generateRatingStars(review.rating)}
                        </div>
                    </div>
                    <div class="review-body">
                        <p>${review.reviewText}</p>
                        ${review.hasPhoto ? '<p><i class="fa-solid fa-camera"></i> Есть фото</p>' : ''}  <!-- Пример отображения иконки фото -->
                    </div>
                </article>
            `;
            reviewsListContainer.append(reviewHTML);
        });
    }

    // Отображаем все отзывы по умолчанию
    displayReviews(reviewsData);

    // Фильтрация отзывов
    $('.filter-button').on('click', function() {
        $('.filter-button').removeClass('active');
        $(this).addClass('active');
        const filter = $(this).data('filter');
        let filteredReviews = reviewsData;

        if (filter === '5-star') {
            filteredReviews = reviewsData.filter(review => review.rating >= 5); // Фильтруем 5 звезд и выше
        } else if (filter === 'with-photo') {
            filteredReviews = reviewsData.filter(review => review.hasPhoto); // Фильтруем отзывы с фото
        } // 'all' - отображаем все, фильтрация не требуется

        displayReviews(filteredReviews);
    });

    // Пример расчета и отображения среднего рейтинга (на основе mock-данных)
    function updateAverageRating(reviews) {
        if (reviews.length === 0) {
            $('.rating-value').text('0');
            $('.star-rating').html(generateRatingStars(0));
            $('.review-count .count').text('0');
            return;
        }
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = (totalRating / reviews.length).toFixed(1); // Округляем до 1 знака
        $('.rating-value').text(averageRating);
        $('.star-rating').html(generateRatingStars(averageRating));
        $('.review-count .count').text(reviews.length);
    }

    updateAverageRating(reviewsData); // Инициализация среднего рейтинга при загрузке страницы

});
