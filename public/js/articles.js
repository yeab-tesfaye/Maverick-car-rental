// Elements
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const header = document.querySelector('.header');
const logoName = document.querySelector('.logo-name');



hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  menu.classList.toggle('active');
  logo.classList.toggle('hidden');// Toggle 'hidden' class for the logo
  header.classList.toggle('menu-active'); 
  logoName.classList.toggle('hidden');
});

