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

function formatPhoneNumber(event) {
    let input = event.target;
    let value = input.value;

    // Если строка пустая, оставляем только плюс
    if (value === '') {
        input.value = '+';
        return;
    }

    value = value.replace(/[^0-9\+\(\)\-\s]/g, '');

    if (value[0] !== '+') {
        value = '+' + value;
    }

    input.value = value;

    updateFlag(value);
}

function updateFlag(value) {
    const flagElement = document.getElementById('flag');
    let countryCode = value.slice(0, 3)
    const flagUrls = {
        '+7': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/320px-Flag_of_Russia.svg.png', // Раша
        '+998': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/1200px-Flag_of_Uzbekistan.svg.png?20241226145433', // Узб
        '+1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/320px-Flag_of_the_United_States.svg.png', // АсЭшАй
        '+44': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_Kingdom.svg/320px-Flag_of_the_United_Kingdom.svg.png', // Великобритания
        '+91': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/320px-Flag_of_India.svg.png', // Индия
        '+81': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Japan.svg/320px-Flag_of_Japan.svg.png', // Япония
        '+996': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flag_of_Kyrgyzstan.svg/320px-Flag_of_Kyrgyzstan.svg.png', // Киргизия
        '+375': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Flag_of_Belarus.svg/500px-Flag_of_Belarus.svg.png', // Беларусь
        '+55': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/320px-Flag_of_Brazil.svg.png', // Бразилия
        '+33': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/320px-Flag_of_France.svg.png', // Франция
        '+49': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/320px-Flag_of_Germany.svg.png', // Германия
        '+39': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/320px-Flag_of_Italy.svg.png', // Италия
        '+34': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/320px-Flag_of_Spain.svg.png', // Испания
        '+61': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Australia.svg/320px-Flag_of_Australia.svg.png', // Австралия
        '+27': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_South_Africa.svg/320px-Flag_of_South_Africa.svg.png', // Южная Африка
    };

    if (flagUrls[countryCode]) {
        flagElement.style.backgroundImage = `url(${flagUrls[countryCode]})`;
    } else {
        countryCode = value.slice(0, 4)
        if (flagUrls[countryCode]) {
            flagElement.style.backgroundImage = `url(${flagUrls[countryCode]})`;
        } else {
            flagElement.style.backgroundImage = "none"
        }
    }
}

document.getElementById('phone').addEventListener('input', formatPhoneNumber);
