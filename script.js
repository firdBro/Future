        function showContactForm() {
            const form = document.getElementById("contact-form");
            form.style.display = "block";
            form.scrollIntoView({ behavior: "smooth" });
        }

        // Функция для переключения видимости меню
function toggleMenu() {
    const menu = document.getElementById('hamburger-menu');
    menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'flex' : 'none';
}

// Закрытие меню, если клик был вне меню
document.addEventListener('click', function (e) {
    const menu = document.getElementById('hamburger-menu');
    const hamburger = document.querySelector('.hamburger');

    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.style.display = 'none'; // Скрываем меню, если клик был вне
    }
});

// Функция для закрытия меню при клике на любой элемент меню
const menuItems = document.querySelectorAll('.hamburger-menu a');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const menu = document.getElementById('hamburger-menu');
        menu.style.display = 'none'; // Закрываем меню после клика
    });
});
