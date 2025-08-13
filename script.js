const nav = document.getElementById('siteNav');
const menu = document.getElementById('menu');
const links = document.querySelectorAll('.nav-link');
const hambtn = document.getElementById('hambtn');

// Toggle mobile menu
hambtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  hambtn.setAttribute('aria-expanded', open);
});

// Close menu on link click (mobile)
links.forEach(link => link.addEventListener('click', () => {
  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
    hambtn.setAttribute('aria-expanded', 'false');
  }
}));

// Scroll behavior
function updateNavOnScroll(){
  if (window.scrollY > 48){
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

// Active link update
const sectionElements = Array.from(links).map(l => document.getElementById(l.dataset.target));
function updateActiveLink(){
  let active = sectionElements[0];
  const navHeight = nav.classList.contains('scrolled') ? 56 : 76;

  sectionElements.forEach(section => {
    if (section.getBoundingClientRect().top - navHeight <= 0) {
      active = section;
    }
  });

  links.forEach(link => {
    link.classList.toggle('active', link.dataset.target === active.id);
  });
}

// Initial setup
updateNavOnScroll();
updateActiveLink();

window.addEventListener('scroll', () => {
  updateNavOnScroll();
  updateActiveLink();
});

// Smooth scroll offset fix
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(link.dataset.target);
    const navHeight = nav.classList.contains('scrolled') ? 56 : 76;
    const offsetTop = window.scrollY + target.getBoundingClientRect().top - navHeight - 8;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
});