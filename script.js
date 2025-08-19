/**
 * Controla a aparência do cabeçalho e do banner conforme a rolagem da página.
 */
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const logo = document.getElementById('logo-img');
    const banner = document.querySelector('.free-banner'); // Seleciona o banner

    // Sai da função se os elementos não existirem
    if (!header || !logo || !banner) {
        console.warn('Header, logo ou banner não encontrados no DOM.');
        return;
    }

    const logoNormalSrc = logo.getAttribute('data-logo-normal');
    const logoScrolledSrc = logo.getAttribute('data-logo-scrolled');

    const handleScroll = () => {
        const scrollThreshold = 50; // Ponto em pixels para ativar a mudança

        if (window.scrollY > scrollThreshold) {
            if (!header.classList.contains('scrolled')) {
                header.classList.add('scrolled');
                logo.src = logoScrolledSrc;
                banner.classList.add('hidden'); // Adiciona classe para ocultar o banner
            }
        } else {
            if (header.classList.contains('scrolled')) {
                header.classList.remove('scrolled');
                logo.src = logoNormalSrc;
                banner.classList.remove('hidden'); // Remove a classe para mostrar o banner
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
});