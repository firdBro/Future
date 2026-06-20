const courseData = {
    frontend: {
        formValue: "Frontend",
        benefits: [
            "Ученик сможет собирать адаптивные сайты и интерфейсы с нуля.",
            "Появится портфолио: лендинг, интерфейсный проект и интерактивные элементы.",
            "Будет понимание Figma, HTML, CSS, JavaScript и процесса от макета до готовой страницы.",
            "Это хорошая база для фриланса, стажировки или дальнейшего роста во Frontend."
        ]
    },
    python: {
        formValue: "Python",
        benefits: [
            "Ученик научится писать понятный код на Python и разбирать реальные задачи.",
            "Появится опыт создания Telegram-ботов, API и backend-логики.",
            "Будет понимание серверов, баз данных, деплоя и базовой безопасности.",
            "Это база для backend-разработки, автоматизации и более сложных IT-проектов."
        ]
    },
    ai: {
        formValue: "AI",
        benefits: [
            "Ученик начнет использовать AI осознанно: для учебы, работы, анализа и идей.",
            "Появится навык проектирования промптов, ассистентов и автоматизаций.",
            "Будет понимание ограничений моделей, проверки результата и AI-безопасности.",
            "Итогом станет собственный AI-проект: ассистент, бот, база знаний или рабочая автоматизация."
        ]
    }
};

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const benefitButtons = document.querySelectorAll("[data-benefit-course]");
const benefitList = document.getElementById("benefit-list");
const leadForm = document.getElementById("lead-form");
const courseSelect = document.getElementById("course");
const contactSection = document.getElementById("contact");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const phoneFlag = document.getElementById("phone-flag");
const contactMethodHint = document.getElementById("contact-method-error");

let activeCourse = "frontend";
let hasCourseIntent = false;

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

function closeMobileMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
}

function renderBenefits(courseKey) {
    if (!benefitList) return;
    const benefits = courseData[courseKey]?.benefits || courseData.frontend.benefits;
    benefitList.innerHTML = benefits.map((item) => `<li>${item}</li>`).join("");
}

function setBenefitCourse(courseKey) {
    benefitButtons.forEach((button) => {
        const isActive = button.dataset.benefitCourse === courseKey;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
    });

    renderBenefits(courseKey);
}

function setFormCourse(courseKeyOrName) {
    if (!courseSelect) return;

    const value = courseData[courseKeyOrName]?.formValue || courseKeyOrName;
    const option = Array.from(courseSelect.options).find((item) => item.value === value);
    if (option) {
        courseSelect.value = value;
    }
}

function setActiveCourse(courseKey, shouldScroll = false, updateForm = false) {
    if (!courseData[courseKey]) return;

    activeCourse = courseKey;

    document.querySelectorAll("[data-course-card]").forEach((card) => {
        card.classList.toggle("is-active", card.dataset.courseCard === courseKey);
    });

    document.querySelectorAll("[data-course-panel]").forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.coursePanel === courseKey);
    });

    document.querySelectorAll(".course-switcher [data-open-course]").forEach((button) => {
        const isActive = button.dataset.openCourse === courseKey;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
    });

    setBenefitCourse(courseKey);

    if (updateForm) {
        setFormCourse(courseKey);
    }

    if (shouldScroll) {
        document.getElementById("course-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function scrollToTrial(courseName) {
    if (courseName) {
        setFormCourse(courseName);
    } else if (hasCourseIntent) {
        setFormCourse(activeCourse);
    } else {
        setFormCourse("Не знаю, нужна консультация");
    }

    contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => document.getElementById("first-name")?.focus({ preventScroll: true }), 450);
    closeMobileMenu();
}

document.addEventListener("click", (event) => {
    const topLink = event.target.closest('a[href="#top"]');
    if (topLink) {
        event.preventDefault();
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        history.replaceState(null, "", window.location.pathname + window.location.search);
        closeMobileMenu();
        return;
    }

    const footerCourseLink = event.target.closest("[data-footer-course]");
    if (footerCourseLink) {
        event.preventDefault();
        const courseKey = footerCourseLink.dataset.footerCourse;
        hasCourseIntent = true;
        setActiveCourse(courseKey, false, true);
        document.getElementById(courseKey)?.scrollIntoView({ behavior: "smooth", block: "start" });
        closeMobileMenu();
        return;
    }

    const courseButton = event.target.closest("[data-open-course]");
    if (courseButton) {
        hasCourseIntent = true;
        setActiveCourse(courseButton.dataset.openCourse, true, true);
        closeMobileMenu();
        return;
    }

    const courseCard = event.target.closest("[data-course-card]");
    if (courseCard) {
        hasCourseIntent = true;
        setActiveCourse(courseCard.dataset.courseCard, true, true);
        return;
    }

    const trialButton = event.target.closest("[data-trial]");
    if (trialButton) {
        scrollToTrial(trialButton.dataset.course);
        return;
    }

    const clickedInsideMenu = event.target.closest(".mobile-menu");
    const clickedToggle = event.target.closest(".menu-toggle");
    if (!clickedInsideMenu && !clickedToggle) {
        closeMobileMenu();
    }
});

menuToggle?.addEventListener("click", toggleMobileMenu);

document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

document.querySelectorAll(".faq-item > button").forEach((button) => {
    button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        const isOpen = item.classList.contains("is-open");

        document.querySelectorAll(".faq-item").forEach((faqItem) => {
            faqItem.classList.remove("is-open");
            faqItem.querySelector("button")?.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
            item.classList.add("is-open");
            button.setAttribute("aria-expanded", "true");
        }
    });
});

benefitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const courseKey = button.dataset.benefitCourse;
        hasCourseIntent = true;
        setActiveCourse(courseKey, false, false);
    });
});

function updatePhoneFlag(value) {
    if (!phoneFlag) return;
    const cleaned = value.replace(/\s/g, "");
    const codes = [
        ["+998", "UZ"],
        ["+996", "KG"],
        ["+375", "BY"],
        ["+44", "UK"],
        ["+91", "IN"],
        ["+81", "JP"],
        ["+55", "BR"],
        ["+33", "FR"],
        ["+49", "DE"],
        ["+39", "IT"],
        ["+34", "ES"],
        ["+61", "AU"],
        ["+27", "ZA"],
        ["+7", "RU"],
        ["+1", "US"]
    ];

    const match = codes.find(([code]) => cleaned.startsWith(code));
    phoneFlag.textContent = match ? match[1] : "+";
}

function formatPhoneInput(event) {
    let value = event.target.value.replace(/[^\d+\s()-]/g, "");

    if (value && !value.startsWith("+")) {
        value = `+${value.replace(/^\+*/, "")}`;
    }

    event.target.value = value;
    updatePhoneFlag(value);
}

phoneInput?.addEventListener("input", formatPhoneInput);
phoneInput?.addEventListener("focus", () => {
    if (!phoneInput.value) {
        phoneInput.value = "+998 ";
        updatePhoneFlag(phoneInput.value);
    }
});

function hasContactMethod() {
    const email = emailInput?.value.trim() || "";
    const phoneDigits = phoneInput?.value.replace(/\D/g, "") || "";
    return Boolean(email) || phoneDigits.length >= 6;
}

function setContactError(isError) {
    if (!leadForm || !emailInput || !contactMethodHint) return;

    leadForm.classList.toggle("has-contact-error", isError);
    emailInput.setCustomValidity(isError ? "Укажите email или телефон." : "");
    contactMethodHint.textContent = isError
        ? "Укажите email или телефон, чтобы мы могли связаться."
        : "Достаточно указать email или телефон - как удобнее.";
}

function clearContactErrorIfReady() {
    if (hasContactMethod()) {
        setContactError(false);
    }
}

emailInput?.addEventListener("input", clearContactErrorIfReady);
phoneInput?.addEventListener("input", clearContactErrorIfReady);

leadForm?.addEventListener("submit", (event) => {
    if (!hasContactMethod()) {
        event.preventDefault();
        setContactError(true);
        emailInput?.reportValidity();
    }
});

const revealTargets = [
    ".section-head",
    ".intro-grid",
    ".course-card",
    ".course-switcher",
    ".course-detail",
    ".why-grid > div",
    ".why-list > div",
    ".step",
    ".faq-intro",
    ".faq-item",
    ".contact-copy",
    ".lead-form"
].join(",");

const revealItems = Array.from(document.querySelectorAll(revealTargets));
revealItems.forEach((item, index) => {
    item.dataset.reveal = "";
    item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
});

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

window.addEventListener("load", () => {
    const hashCourse = window.location.hash.replace("#", "");
    if (courseData[hashCourse]) {
        setActiveCourse(hashCourse, false);
    } else if (!window.location.hash) {
        setActiveCourse("frontend", false);
        requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    } else {
        setActiveCourse("frontend", false);
    }
});

setBenefitCourse(activeCourse);
