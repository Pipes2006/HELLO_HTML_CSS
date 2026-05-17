document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const updateYear = root => {
        root.querySelectorAll('.footer-year').forEach(el => {
            el.textContent = currentYear;
        });
    };

    const setActiveNavItem = root => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        root.querySelectorAll('.navbar-nav a.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    };

    const loadComponent = async (selector, path) => {
        const container = document.querySelector(selector);
        if (!container) return;
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            container.innerHTML = await response.text();
            updateYear(container);
            setActiveNavItem(container);
        } catch (error) {
            console.error(`No se pudo cargar ${path}:`, error);
            container.innerHTML = '<!-- No se pudo cargar el componente -->';
        }
    };

    const initWhatsappContactForm = () => {
        const form = document.querySelector('#contact-form');
        if (!form) return;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const name = document.querySelector('#name')?.value.trim();
            const email = document.querySelector('#email')?.value.trim();
            const message = document.querySelector('#message')?.value.trim();

            if (!name || !message) {
                alert('Por favor completa tu nombre y el mensaje antes de enviar.');
                return;
            }

            const whatsappPhone = '3124120017'; // Numero de Telefono
            const text = `Hola, mi nombre es ${name}.\nEmail: ${email || 'No proporcionado'}\n\nMensaje:\n${message}`;
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedText}`;

            window.location.href = whatsappUrl;
        });
    };

    updateYear(document);
    loadComponent('#navbar-placeholder', 'components/navbar.html');
    loadComponent('#footer-placeholder', 'components/footer.html');
    initWhatsappContactForm();
});
