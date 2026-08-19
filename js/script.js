document.addEventListener('DOMContentLoaded', () => {
    /* --- Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar-premium');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    /* --- Scroll Reveal Animation --- */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    /* --- Premium Hero Carousel --- */
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const heroSection = document.querySelector('.hero-section');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;
        const intervalTime = 3000;
        
        const goToSlide = (index) => {
            // Remove active classes
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Handle loop
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            // Set new active class
            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            
            currentSlide = index;
        };
        
        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);
        
        // Auto-play
        const startAutoPlay = () => {
            clearInterval(slideInterval); // Prevent multiple overlapping intervals
            slideInterval = setInterval(nextSlide, intervalTime);
        };
        
        const stopAutoPlay = () => {
            clearInterval(slideInterval);
        };
        
        // Event Listeners
        if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                startAutoPlay();
            });
        });
        
        // Removed 'Pause on hover' so the animation never stops unexpectedly in between
        
        // Init
        goToSlide(0);
        startAutoPlay();
    }

    /* --- Gallery Lightbox --- */
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.style.display = 'none';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.className = 'lightbox-img';
        
        const lightboxClose = document.createElement('button');
        lightboxClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        lightboxClose.className = 'lightbox-close';
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(lightboxClose);
        document.body.appendChild(lightbox);
        
        // Add styles dynamically for lightbox
        const style = document.createElement('style');
        style.innerHTML = `
            .lightbox-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 2000; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
            .lightbox-overlay.active { opacity: 1; }
            .lightbox-img { max-width: 90%; max-height: 90vh; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: scale(0.95); transition: transform 0.3s; }
            .lightbox-overlay.active .lightbox-img { transform: scale(1); }
            .lightbox-close { position: absolute; top: 20px; right: 30px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer; transition: color 0.2s; }
            .lightbox-close:hover { color: var(--color-red); }
        `;
        document.head.appendChild(style);
        
        // Open lightbox
        galleryItems.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
                // Trigger reflow
                void lightbox.offsetWidth;
                lightbox.classList.add('active');
            });
        });
        
        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => { lightbox.style.display = 'none'; }, 300);
        };
        
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }
});
