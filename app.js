// Prevent zooming on the webpage
window.addEventListener("wheel", (e)=> {
  const isPinching = e.ctrlKey
  if(isPinching) e.preventDefault()
}, { passive: false })

// Handle smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add intersection observer for animations
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('transition-all', 'duration-500', 'opacity-0', 'translate-y-4');
        observer.observe(section);
    });
    
    // Initialize all sections already in viewport
    setTimeout(() => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            ) {
                section.classList.add('opacity-100');
                section.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    }, 100);
});

// Responsive navigation
const handleResponsiveNav = () => {
    const width = window.innerWidth;
    const sections = document.querySelectorAll('section');
    
    if (width < 768) {
        sections.forEach(section => {
            section.classList.add('scroll-mt-16');
        });
    } else {
        sections.forEach(section => {
            section.classList.add('scroll-mt-24');
        });
    }
};

window.addEventListener('resize', handleResponsiveNav);
handleResponsiveNav();
