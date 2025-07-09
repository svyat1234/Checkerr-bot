document.addEventListener('DOMContentLoaded', () => {
    
    // Анимация текста и блока с видео в секции service
    function phoneVideoAnimation () {
        if (window.innerWidth > 900) {
            const textSections = document.querySelectorAll('.text-section');
            const videoItems = document.querySelectorAll('.video-item');
            
            // Начальная настройка
            gsap.set(textSections[0], { opacity: 1});
            videoItems[0].classList.add('active');
            textSections[0].classList.add('active');
    
            // Настройка прокрутки с GSAP
            gsap.registerPlugin(ScrollTrigger);
            
            // Создаем триггеры для каждой секции
            textSections.forEach((section, index) => {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => activateSection(index),
                    onEnterBack: () => activateSection(index),
                    scrub: true
                });
            });
    
            // Активация секции
            function activateSection(index) {
                // Сброс всех секций
                textSections.forEach(section => {
                    section.classList.remove('active');
                    gsap.to(section, {
                        opacity: 0,                           
                        duration: 0.3
                    });
                });
                
                // Активация текущей секции
                textSections[index].classList.add('active');
                gsap.to(textSections[index], {
                    opacity: 1,                       
                    duration: 0.5
                });
    
                // Смена видео
                videoItems.forEach(video => video.classList.remove('active'));
                videoItems[index].classList.add('active');
            }
        }
        
        // Ресайз-обработчик для переключения версий
        window.addEventListener('resize', () => {
            location.reload();
        });
    }

    // Swiper для блока отзывов
    const reviewsSwiper = new Swiper('.reviews-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000, // Интервал между автопрокрутками
            disableOnInteraction: false,
        },
        speed: 800,
        breakpoints: {
            1400: {
                slidesPerView: 2.5
            },
            1200: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 1.5
            },
        },
    });

    // Функционал для аккордеона вопросов
    function questionsAccordion() {
        const cards = document.querySelectorAll('.questions__card');
        const minHeight = 131;
        cards.forEach(card => {
            const textWrap = card.querySelector('.questions__card-text-wrap');
            // Сбросить начальное состояние
            if (card.classList.contains('questions__card--active')) {
                card.style.maxHeight = card.scrollHeight + 'px';
                textWrap.style.opacity = 1;
            } else {
                card.style.maxHeight = minHeight + 'px';
                textWrap.style.opacity = 0;
            }
            card.addEventListener('click', function() {
                const isActive = card.classList.contains('questions__card--active');
                // Закрыть все
                cards.forEach(c => {
                    c.classList.remove('questions__card--active');
                    const wrap = c.querySelector('.questions__card-text-wrap');
                    c.style.maxHeight = minHeight + 'px';
                    wrap.style.opacity = 0;
                });
                // Открыть текущую, если была закрыта
                if (!isActive) {
                    card.classList.add('questions__card--active');
                    requestAnimationFrame(() => {
                        card.style.maxHeight = card.scrollHeight + 'px';
                    });
                    textWrap.style.opacity = 1;
                }
            });
        });
        // Обновлять maxHeight при ресайзе (адаптивность)
        window.addEventListener('resize', () => {
            document.querySelectorAll('.questions__card--active').forEach(card => {
                card.style.maxHeight = card.scrollHeight + 'px';
            });
        });
    }

    questionsAccordion();

    phoneVideoAnimation()
});