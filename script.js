document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const banner = document.querySelector('.free-banner');
    const nav = document.querySelector('.header-nav');
    const headerContent = document.querySelector('.header-content');

    if (!header || !banner) return;

    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Menu de navegação');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    if (headerContent && nav) {
        headerContent.insertBefore(hamburger, nav);

        const toggleMenu = (forceClose = false) => {
            const isActive = forceClose ? false : !nav.classList.contains('active');
            hamburger.classList.toggle('active', isActive);
            nav.classList.toggle('active', isActive);
            hamburger.setAttribute('aria-expanded', isActive);
        };

        hamburger.addEventListener('click', () => toggleMenu());

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });

        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && nav.classList.contains('active')) {
                toggleMenu(true);
            }
        });
    }
});
