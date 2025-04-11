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
