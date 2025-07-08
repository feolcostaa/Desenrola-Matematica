const header = document.getElementById('main-header');
const logo = document.getElementById('logo-img');

// Caminhos das logos
const logoNormal = 'images/logo-branca.png';     // Logo grande
const logoScroll = 'images/logo-azul.png';   // Ícone pequeno

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        logo.src = logoScroll;
    } else {
        header.classList.remove('scrolled');
        logo.src = logoNormal;
    }
});
