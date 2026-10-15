// Появляющиеся плашки

let options = {
    root: null,
    rootMargin: '5px',
    threshold: 0.5
}

let callback = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active')

            observer.unobserve(entry.target)
        } 
    })
}

let observer = new IntersectionObserver(callback, options);

let targets = document.querySelectorAll('.anim');

targets.forEach(target => {
    observer.observe(target);
});

// Слайдер для отзывов
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider-block');
    const slidesAll = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.button-prev');
    const nextBtn = document.querySelector('.button-next');

    if (slider && slidesAll.length > 0) {
        const slidesLength = slidesAll.length;
        let currentIndex = 0;

        function sliderPosition() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slidesLength - 1) {
                currentIndex++
            } else {
                currentIndex = 0
            }
            sliderPosition()
        })

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--
            } else {
                currentIndex = slidesLength - 1;
            }
            sliderPosition()
        })

        sliderPosition()
    }

    // ===== СЛАЙДЕР УСЛУГ =====
    const servicesSlider = document.querySelector('.services-slider-block');
    const servicesSlides = document.querySelectorAll('.service-slide');
    const servicesPrevBtn = document.querySelector('.services-button-prev');
    const servicesNextBtn = document.querySelector('.services-button-next');

    if (servicesSlider && servicesSlides.length > 0) {
        const servicesLength = servicesSlides.length;
        let currentServiceIndex = 0;

        function servicesSliderPosition() {
            servicesSlider.style.transform = `translateX(-${currentServiceIndex * 100}%)`
        }

        servicesNextBtn.addEventListener('click', () => {
            if (currentServiceIndex < servicesLength - 1) {
                currentServiceIndex++
            } else {
                currentServiceIndex = 0
            }
            servicesSliderPosition()
        })

        servicesPrevBtn.addEventListener('click', () => {
            if (currentServiceIndex > 0) {
                currentServiceIndex--
            } else {
                currentServiceIndex = servicesLength - 1;
            }
            servicesSliderPosition()
        })

        servicesSliderPosition()
    }

    // ===== АНИМАЦИЯ ЦИФР =====
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const increment = Math.ceil(target / 60);
            
            function updateNumber() {
                current += increment;
                if (current > target) {
                    current = target;
                }
                stat.textContent = current;
                
                if (current < target) {
                    requestAnimationFrame(updateNumber);
                }
            }
            
            if (stat.closest('.anim').classList.contains('active')) {
                updateNumber();
            } else {
                const observerCallback = function(mutations) {
                    mutations.forEach(mutation => {
                        if (mutation.target.classList.contains('active')) {
                            updateNumber();
                            observer.disconnect();
                        }
                    });
                };
                
                const observer = new MutationObserver(observerCallback);
                observer.observe(stat.closest('.anim'), {
                    attributes: true,
                    attributeFilter: ['class']
                });
            }
        });
    }

    setTimeout(animateNumbers, 500);
})