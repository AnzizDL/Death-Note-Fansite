// ========================================
// DEATH NOTE FANSITE - JAVASCRIPT INTERACTIF
// ========================================

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MENU MOBILE
    // ========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            if (menuIcon && closeIcon) {
                menuIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            }
        });
    }

    // ========================================
    // BOUTON SCROLL TO TOP
    // ========================================
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Afficher/masquer le bouton selon le scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollToTopBtn.classList.add('opacity-100');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                scrollToTopBtn.classList.remove('opacity-100');
            }
        });

        // Smooth scroll vers le haut
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // ANIMATIONS AU SCROLL (Intersection Observer)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe 'fade-in-up'
    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // ========================================
    // GALERIE LIGHTBOX
    // ========================================
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    if (galleryImages.length > 0) {
        // Créer le lightbox
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'fixed inset-0 bg-black bg-opacity-95 z-50 hidden flex items-center justify-center p-4';
        lightbox.innerHTML = `
            <button id="lightbox-close" class="absolute top-4 right-4 text-white text-4xl hover:text-red-500 transition-colors z-50">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
            <button id="lightbox-prev" class="absolute left-4 text-white text-4xl hover:text-red-500 transition-colors z-50">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
            </button>
            <button id="lightbox-next" class="absolute right-4 text-white text-4xl hover:text-red-500 transition-colors z-50">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </button>
            <img id="lightbox-img" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl" src="" alt="">
            <div id="lightbox-caption" class="absolute bottom-8 left-0 right-0 text-center text-white text-xl font-semibold px-4"></div>
        `;
        document.body.appendChild(lightbox);

        let currentImageIndex = 0;
        const imagesArray = Array.from(galleryImages);

        function showImage(index) {
            const img = imagesArray[index];
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = img.alt || '';
            currentImageIndex = index;
        }

        function openLightbox(index) {
            showImage(index);
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = '';
        }

        // Ajouter les événements aux images
        galleryImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => openLightbox(index));
        });

        // Boutons de navigation
        document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
        
        document.getElementById('lightbox-prev').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
            showImage(currentImageIndex);
        });

        document.getElementById('lightbox-next').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
            showImage(currentImageIndex);
        });

        // Fermer avec Echap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft' && !lightbox.classList.contains('hidden')) {
                currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
                showImage(currentImageIndex);
            }
            if (e.key === 'ArrowRight' && !lightbox.classList.contains('hidden')) {
                currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
                showImage(currentImageIndex);
            }
        });

        // Fermer en cliquant sur le fond
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // ========================================
    // VALIDATION FORMULAIRE DE CONTACT
    // ========================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs
            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const sujet = document.getElementById('sujet') ? document.getElementById('sujet').value.trim() : '';
            const message = document.getElementById('message').value.trim();
            
            // Validation
            let isValid = true;
            let errorMessage = '';
            
            if (nom.length < 2) {
                isValid = false;
                errorMessage += '• Le nom doit contenir au moins 2 caractères\n';
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                isValid = false;
                errorMessage += '• Veuillez entrer une adresse email valide\n';
            }
            
            if (message.length < 10) {
                isValid = false;
                errorMessage += '• Le message doit contenir au moins 10 caractères\n';
            }
            
            if (isValid) {
                // Afficher un message de succès
                showNotification('✅ Message envoyé avec succès !', 'success');
                contactForm.reset();
            } else {
                // Afficher les erreurs
                showNotification('❌ Erreurs de validation :\n' + errorMessage, 'error');
            }
        });
    }

    // ========================================
    // SYSTÈME DE NOTIFICATIONS
    // ========================================
    function showNotification(message, type = 'info') {
        // Supprimer les notifications existantes
        const existingNotifs = document.querySelectorAll('.notification');
        existingNotifs.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification fixed top-24 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl transform translate-x-full transition-transform duration-300 max-w-md ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 
            'bg-blue-600'
        } text-white`;
        
        notification.innerHTML = `
            <div class="flex items-start">
                <div class="flex-1 whitespace-pre-line">${message}</div>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animer l'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // ========================================
    // FILTRE GALERIE (si présent)
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Mettre à jour les boutons actifs
                filterButtons.forEach(btn => btn.classList.remove('active', 'bg-death-red'));
                this.classList.add('active', 'bg-death-red');
                
                // Filtrer les items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.classList.add('fade-in-up');
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ========================================
    // EFFET PARALLAX SUR LE HERO
    // ========================================
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (heroSection.querySelector('img')) {
                heroSection.querySelector('img').style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ========================================
    // COMPTEUR ANIMÉ (si présent)
    // ========================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ========================================
    // SMOOTH SCROLL POUR LES ANCRES
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // EASTER EGG : Konami Code
    // ========================================
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
        
        if (konamiCode.join('').includes(konamiSequence.join(''))) {
            activateEasterEgg();
        }
    });

    function activateEasterEgg() {
        showNotification('🍎 Le Death Note est activé ! Light Yagami approuve...', 'success');
        document.body.style.animation = 'pulse-red 1s ease-in-out 3';
    }

    console.log('%c⚠️ DEATH NOTE', 'color: #8b0000; font-size: 30px; font-weight: bold;');
    console.log('%cCe site est un hommage à l\'univers Death Note. Utilisez-le avec sagesse !', 'color: #666; font-size: 14px;');
});
