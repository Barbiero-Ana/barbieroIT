// scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navHeight = document.getElementById('mainNav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// navegação das tabs
const sobreItems = document.querySelectorAll('.sobre-item');
const contentItems = document.querySelectorAll('.content-item');

sobreItems.forEach(item => {
    item.addEventListener('click', function() {
        sobreItems.forEach(i => i.classList.remove('active'));
        contentItems.forEach(c => c.classList.remove('active'));

        this.classList.add('active');

        const targetId = this.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);

        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// formulário de contato
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            nome: document.getElementById('nome').value,
            sobrenome: document.getElementById('sobrenome').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            assunto: document.getElementById('assunto').value
        };

        if (!validateForm(formData)) {
            showMessage('Por favor, preencha todos os campos corretamente.', 'error');
            return;
        }

        submitForm(formData);
    });
}

function validateForm(data) {
    for (let key in data) {
        if (!data[key] || data[key].trim() === '') {
            return false;
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }

    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(data.telefone)) {
        return false;
    }

    return true;
}

function submitForm(data) {
    sendContactEmail(data).then(result => {
        if (result.success) {
            showMessage(result.message, 'success');
            contactForm.reset();
        } else {
            showMessage(result.message, 'error');
        }
    });
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// máscara do telefone
const phoneInput = document.getElementById('telefone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
            } else {
                value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            }
        }

        e.target.value = value;
    });
}

// controle do carrossel
const servicosCarousel = document.getElementById('servicosCarousel');
if (servicosCarousel) {
    servicosCarousel.addEventListener('mouseenter', function() {
        const carousel = bootstrap.Carousel.getInstance(servicosCarousel);
        if (carousel) {
            carousel.pause();
        }
    });

    servicosCarousel.addEventListener('mouseleave', function() {
        const carousel = bootstrap.Carousel.getInstance(servicosCarousel);
        if (carousel) {
            carousel.cycle();
        }
    });
}

// animações no scroll
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimation() {
    const animatedElements = document.querySelectorAll('.service-card, .relato-card, .team-member');

    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .relato-card, .team-member');

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });

    handleScrollAnimation();
});

window.addEventListener('scroll', handleScrollAnimation);

// link ativo na nav
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// loading da página
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

console.log('%c BarbieroIT ', 'background: #226f54; color: white; font-size: 20px; padding: 10px;');
console.log('%c Desenvolvido com ❤️ usando HTML, CSS, JavaScript e Bootstrap ', 'color: #226f54; font-size: 12px;');
