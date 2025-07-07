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
        slidesPerView: 2.5,
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
    });

    phoneVideoAnimation()
});