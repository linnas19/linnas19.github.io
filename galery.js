// Массив с изображениями
const images = [
    { url: 'https://picsum.photos/400/300?random=1', title: 'Горы' },
    { url: 'https://picsum.photos/400/300?random=2', title: 'Море' },
    { url: 'https://picsum.photos/400/300?random=3', title: 'Лес' },
    { url: 'https://picsum.photos/400/300?random=4', title: 'Закат' },
    { url: 'https://picsum.photos/400/300?random=5', title: 'Город' },
    { url: 'https://picsum.photos/400/300?random=6', title: 'Водопад' },
    { url: 'https://picsum.photos/400/300?random=7', title: 'Поле' },
    { url: 'https://picsum.photos/400/300?random=8', title: 'Озеро' }
];

// Получаем элементы DOM
const gallery = document.getElementById('gallery');
const counter = document.getElementById('counter');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');

// Переменные для автопрокрутки
let autoScrollInterval;

// Создание галереи
function createGallery() {
    gallery.innerHTML = '';
    
    images.forEach(function(img, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const imgElement = document.createElement('img');
        imgElement.src = img.url;
        imgElement.alt = img.title;
        imgElement.loading = 'lazy';
        
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.textContent = img.title;
        
        item.appendChild(imgElement);
        item.appendChild(overlay);
        
        item.addEventListener('click', function() {
            openModal(index);
        });
        
        gallery.appendChild(item);
    });
    
    updateCounter();
}

// Обновление счетчика
function updateCounter() {
    const total = images.length;
    const visible = gallery.querySelectorAll('.gallery-item').length;
    counter.textContent = visible + ' / ' + total;
}

// Прокрутка галереи
function scrollGallery(direction) {
    const scrollAmount = 220;
    gallery.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Открытие модального окна
function openModal(index) {
    modal.classList.add('active');
    modalImage.src = images[index].url;
    modalImage.alt = images[index].title;
    document.body.style.overflow = 'hidden';
    
    // Закрытие по клику вне изображения
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeModal();
        }
    };
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', handleEscape);
}

// Закрытие модального окна
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleEscape);
}

// Обработка клавиши Escape
function handleEscape(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// Автоматическая прокрутка
function startAutoScroll() {
    autoScrollInterval = setInterval(function() {
        const maxScroll = gallery.scrollWidth - gallery.clientWidth;
        
        if (gallery.scrollLeft >= maxScroll - 10) {
            gallery.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            gallery.scrollBy({
                left: 220,
                behavior: 'smooth'
            });
        }
    }, 3000);
}

// Остановка автопрокрутки
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Навигация с клавиатуры
function handleKeyboardNavigation(e) {
    if (e.key === 'ArrowLeft') {
        scrollGallery(-1);
        e.preventDefault();
    } else if (e.key === 'ArrowRight') {
        scrollGallery(1);
        e.preventDefault();
    }
}

// Инициализация
function initGallery() {
    createGallery();
    startAutoScroll();
    
    // События
    gallery.addEventListener('mouseenter', stopAutoScroll);
    gallery.addEventListener('mouseleave', startAutoScroll);
    gallery.addEventListener('scroll', updateCounter);
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    console.log('🌟 Галерея загружена!');
    console.log('📸 Всего изображений: ' + images.length);
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', initGallery);