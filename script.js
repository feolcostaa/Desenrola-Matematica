/**
 * Controla a aparência do cabeçalho e do banner conforme a rolagem da página.
 * Também gerencia o menu hamburger para dispositivos móveis.
 */
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const logo = document.getElementById('logo-img');
    const banner = document.querySelector('.free-banner');
    const nav = document.querySelector('.header-nav');

    // Sai da função se os elementos não existirem
    if (!header || !logo || !banner) {
        console.warn('Header, logo ou banner não encontrados no DOM.');
        return;
    }

    const logoNormalSrc = logo.getAttribute('data-logo-normal');
    const logoScrolledSrc = logo.getAttribute('data-logo-scrolled');

    // Controle de scroll do header
    const handleScroll = () => {
        const scrollThreshold = 50;

        if (window.scrollY > scrollThreshold) {
            if (!header.classList.contains('scrolled')) {
                header.classList.add('scrolled');
                logo.src = logoScrolledSrc;
                banner.classList.add('hidden');
            }
        } else {
            if (header.classList.contains('scrolled')) {
                header.classList.remove('scrolled');
                logo.src = logoNormalSrc;
                banner.classList.remove('hidden');
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Criar e adicionar botão hamburger
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Menu de navegação');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    // Inserir hamburger antes da navegação
    const headerContent = document.querySelector('.header-content');
    if (headerContent && nav) {
        headerContent.insertBefore(hamburger, nav);

        // Toggle do menu mobile
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });

        // Fechar menu ao clicar em um link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});