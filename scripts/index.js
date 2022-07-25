const mobileMenuButton = document.querySelector('.mobile-nav-button');
const navMenu = document.querySelector('.navigation-bar');


mobileMenuButton.addEventListener('click', toggleMenu);

function toggleMenu() {
    navMenu.classList.toggle('menu-expanded');
    mobileMenuButton.classList.toggle('menu-expanded');
}