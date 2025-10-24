// GSAP анимация для кругов прогресса
document.addEventListener('DOMContentLoaded', function() {
    
    // Получаем элементы кругов прогресса
    const progress70 = document.getElementById('progress-70');
    const progress99 = document.getElementById('progress-99');
    
    if (!progress70 || !progress99) {
        console.warn('Элементы кругов прогресса не найдены');
        return;
    }
    
    // Для кругов рассчитываем длину окружности: 2 * π * r
    const radius = 105;
    const circumference = 2 * Math.PI * radius;
    
    // Устанавливаем начальные значения stroke-dasharray и stroke-dashoffset
    // Для движения против часовой стрелки используем отрицательный offset
    progress70.style.strokeDasharray = circumference;
    progress70.style.strokeDashoffset = -circumference;
    
    progress99.style.strokeDasharray = circumference;
    progress99.style.strokeDashoffset = -circumference;
    
    // Создаем timeline для анимации
    const tl = gsap.timeline({
        delay: 0.5, // Небольшая задержка перед началом анимации
        ease: "power2.out"
    });
    
    // Анимация для первого круга (70%) - против часовой стрелки
    tl.to(progress70, {
        strokeDashoffset: -circumference * 0.3, // 70% заполнения против часовой
        duration: 2,
        ease: "power2.out"
    });
    
    // Анимация для второго круга (99%) с небольшой задержкой - против часовой стрелки
    tl.to(progress99, {
        strokeDashoffset: -circumference * 0.01, // 99% заполнения против часовой
        duration: 2.5,
        ease: "power2.out"
    }, "-=1"); // Начинаем на 1 секунду раньше окончания предыдущей анимации
    
    // Дополнительная анимация для процентов (появление с масштабированием)
    const percentages = document.querySelectorAll('.statistic-card__percentage');
    
    gsap.fromTo(percentages, 
        {
            scale: 0,
            opacity: 0
        },
        {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 1.2
        }
    );
    
    // Анимация для подписей (появление снизу)
    const labels = document.querySelectorAll('.statistic-card__label');
    
    gsap.fromTo(labels,
        {
            y: 30,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 1.8,
            stagger: 0.2 // Небольшая задержка между элементами
        }
    );
    
    console.log('GSAP анимация кругов прогресса инициализирована');
});
