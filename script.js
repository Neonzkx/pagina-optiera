// ========== Theme Toggle ==========
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('optiver-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('optiver-theme', next);
});

// ========== Navbar Scroll Effect ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== Mobile Menu ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ========== Scroll Reveal Animations ==========
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========== Smooth scroll for anchor links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});



// ========== Form Handling ==========
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
        btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

// ========== Active nav link highlight on scroll ==========
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--cyan-primary)';
        }
    });
});

// ========== Image Lightbox ==========
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementById('modalClose');
const productImages = document.querySelectorAll('.product-image img');

if (productImages.length > 0 && modal && modalImg) {
    productImages.forEach(img => {
        img.addEventListener('click', function () {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            modalImg.src = this.src;
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                modalImg.src = '';
            }, 300);
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                modalImg.src = '';
            }, 300);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                modalImg.src = '';
            }, 300);
        }
    });
}

// ========== Catalog Filter ==========
(function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const grid = document.getElementById('catalogGrid');
    
    if (!filterBtns.length || !grid) return;
    
    const getAllCards = () => grid.querySelectorAll('.product-card[data-category]');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const cards = getAllCards();
            
            // First fade out all visible cards
            cards.forEach(card => {
                if (!card.classList.contains('hidden')) {
                    card.classList.add('fade-out');
                    card.classList.remove('fade-in');
                }
            });
            
            // After fade out animation, toggle visibility
            setTimeout(() => {
                let visibleIndex = 0;
                cards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    const shouldShow = (filter === 'todos' || category === filter);
                    
                    if (shouldShow) {
                        card.classList.remove('hidden');
                        // Stagger the fade-in for a cascade effect
                        const delay = visibleIndex * 40;
                        setTimeout(() => {
                            card.classList.remove('fade-out');
                            card.classList.add('fade-in');
                            // Re-trigger reveal animation
                            card.classList.add('visible');
                        }, delay);
                        visibleIndex++;
                    } else {
                        card.classList.add('hidden');
                        card.classList.remove('fade-out', 'fade-in');
                    }
                });
            }, 250);
            
            // Smooth scroll to the catalog section
            const coleccion = document.getElementById('coleccion');
            if (coleccion) {
                const offset = 100;
                const top = coleccion.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
})();

