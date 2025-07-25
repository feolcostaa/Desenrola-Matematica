const header = document.getElementById('main-header');
const logo = document.getElementById('logo-img');

const logoNormal = 'images/logo-branca.png';
const logoScroll = 'images/logo-azul.png';

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        logo.src = logoScroll;
    } else {
        header.classList.remove('scrolled');
        logo.src = logoNormal;
    }
});
