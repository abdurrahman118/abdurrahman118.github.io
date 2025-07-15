// Navbar active link highlight on scroll
const navLinks = document.querySelectorAll('.nav-links a');
function setActiveNavLink() {
  let fromTop = window.scrollY + 120;
  navLinks.forEach(link => {
    let section = document.querySelector(link.hash);
    if (section &&
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', setActiveNavLink);

// Main button ripple animation
document.querySelectorAll('.animated-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    let circle = document.createElement('span');
    circle.classList.add('ripple');
    circle.style.left = `${e.offsetX}px`;
    circle.style.top = `${e.offsetY}px`;
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});

// Auto-shuffle portfolio images and videos
function startPortfolioShuffle() {
  const shuffleCards = document.querySelectorAll('.auto-shuffle');
  
  shuffleCards.forEach((card, index) => {
    // Stagger the start time for each card
    setTimeout(() => {
      const mainMedia = card.querySelector('.portfolio-img-main, .portfolio-video-main');
      const altMedia = card.querySelector('.portfolio-img-alt, .portfolio-video-alt');
      
      if (mainMedia && altMedia) {
        // Play videos if they exist
        if (mainMedia.tagName === 'VIDEO') {
          mainMedia.play();
        }
        if (altMedia.tagName === 'VIDEO') {
          altMedia.play();
        }
        
        // Random interval between 3-6 seconds for each card
        const randomInterval = 3000 + Math.random() * 3000;
        
        setInterval(() => {
          altMedia.style.animation = 'none';
          setTimeout(() => {
            altMedia.style.animation = 'imageShuffle 4s infinite';
            if (altMedia.tagName === 'VIDEO') {
              altMedia.play();
            }
          }, 100);
        }, randomInterval);
      }
    }, index * 500); // Stagger start by 500ms for each card
  });
}

// Start shuffle when page loads
window.addEventListener('load', startPortfolioShuffle);

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      
      // Trigger skill bar animation and counting
      if (entry.target.classList.contains('skills-grid')) {
        animateSkillBars();
      }
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-heading, .animate-heading-center, .animate-text, .skills-grid').forEach(el => {
  observer.observe(el);
});

// Animate skill bars with counting
function animateSkillBars() {
  document.querySelectorAll('.skill-bar').forEach(el => {
    const percent = parseInt(el.getAttribute('data-skill'));
    const fill = el.querySelector('.skill-bar-fill');
    const percentSpan = el.querySelector('span');
    
    fill.style.width = '0%';
    
    // Count up animation
    let currentPercent = 0;
    const increment = percent / 60; // 60 frames for smooth animation
    
    const countUp = () => {
      currentPercent += increment;
      if (currentPercent >= percent) {
        currentPercent = percent;
        percentSpan.textContent = Math.round(currentPercent) + '%';
        fill.style.width = currentPercent + '%';
        return;
      }
      
      percentSpan.textContent = Math.round(currentPercent) + '%';
      fill.style.width = currentPercent + '%';
      requestAnimationFrame(countUp);
    };
    
    setTimeout(() => {
      countUp();
    }, 400);
  });
}

// Project data
const projectData = {
  project1: {
    title: "AI Video Generation",
    category: "AI Videos",
    date: "June 2025",
    client: "Anik Singal, Complily, Inc.",
    brief: "Produced a high-impact AI-generated video campaign using advanced tools for voiceover, visual creation, and post-production. Combined natural-sounding AI voiceovers with dynamic visuals and smooth editing to create a polished, engaging final product. The project demonstrated the power of AI in accelerating content production while maintaining high visual and audio quality.",
    videos: ["Funeral video ad.mp4", "dreamina-2025-07-04-9470-Cinematic Jurassic Park-style Velocirapt....mp4"]
  },
  project2: {
    title: "Graphic Designing",
    category: "Branding & Canva Designing",
    date: "November 2024",
    client: "Ty Smith,Creative Agency",
    brief: "Clients Wants Stunning Logo's and poster designs for their brands companies or products I create them Professional and stunning Logos and posters .Result : Clients were amazed and satisfied with my work",
    images: ["upwork client ty ad template.jpg", "Add a heading.jpg"]
  },
 
  project3: {
    title: "AI Image Generation",
    category: "Digital Art",
    date: "Feb 2025",
    client: "Robin Upwork Client",
    brief: "Produced a series of custom AI-generated images for social media campaigns and advertising materials,Arts, Avatars... Leveraged cutting-edge AI image generation tools to create unique, on-brand visuals that increased social media engagement.",
    images: ["472531613e03a0489b8d73c14838dd8e.jpg", "whats-the-most-realistic-ai-photo-generator-online-v0-gk14w6sox4vd1.jpg"]
  },

  project4: {
    title: "Video Editing",
    category: "Video Editing",
    date: "January 2025",
    client: "Marketing Company,Brands.",
    brief: "Edit Long or short video content for organic growth and audience engagment",
    videos: ["Video Ad   2.mp4", "WhatsApp Video 2025-07-04 at 2.57.02 PM.mp4"]
  },
  
  project5: {
    title: "Off-Page SEO",
    category: "Guest Posting",
    date: "December 2024",
    client: "E-commerce Platform",
    brief: "Implemented a comprehensive SEO content strategy that boosted organic traffic by 180%.Buil Authority with high DA Guestposts, Created AI-optimized blog posts, product descriptions, and meta content that improved search rankings while maintaining authentic, engaging copy.",
    images: ["Screenshot 2025-07-06 032220.jpg", "Screenshot 2025-07-06 032420.jpg"]
  },
  
};

// Project modal logic
const modalBg = document.getElementById('modal-bg');
const projectModal = document.getElementById('project-modal');

document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.getAttribute('data-project');
    const project = projectData[projectId];
    
    if (project) {
      const mediaContent = project.videos ? 
        `<video src="${project.videos[0]}" controls class="modal-video"></video>
         <video src="${project.videos[1]}" controls class="modal-video"></video>` :
        `<img src="${project.images[0]}" alt="${project.title}">
         <img src="${project.images[1]}" alt="${project.title} Preview">`;
      
      projectModal.innerHTML = `
        <div class="modal-close" id="modal-close">&times;</div>
        <div class="modal-content-top">
          <h3 class="modal-title">${project.title}</h3>
          <div class="modal-brief">
            <strong>Project Brief:</strong>
            <p>${project.brief}</p>
          </div>
          <div class="project-info">
            <div class="project-info-item">
              <span class="project-info-label">Category</span>
              <span class="project-info-value">${project.category}</span>
            </div>
            <div class="project-info-item">
              <span class="project-info-label">Date</span>
              <span class="project-info-value">${project.date}</span>
            </div>
            <div class="project-info-item">
              <span class="project-info-label">Client</span>
              <span class="project-info-value">${project.client}</span>
            </div>
          </div>
        </div>
        <div class="modal-images-bottom">
          ${mediaContent}
        </div>
      `;
      modalBg.classList.add('active');
      projectModal.classList.add('active');
      document.getElementById('modal-close').onclick = closeModal;
    }
  });
});

modalBg.onclick = closeModal;
function closeModal() {
  modalBg.classList.remove('active');
  projectModal.classList.remove('active');
  // Reset modal transform after animation
  setTimeout(() => {
    if (!projectModal.classList.contains('active')) {
      projectModal.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }
  }, 300);
}
