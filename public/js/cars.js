// Elements
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const header = document.querySelector('.header');
const logoName = document.querySelector('.logo-name');
let badges = document.querySelectorAll(".badge");
let captions = document.querySelectorAll("figcaption");
let details = document.querySelectorAll(".details");
let detailsContents = document.querySelectorAll(".details__content");
let figures = document.querySelectorAll("figure");


let showBackBtns = document.querySelectorAll(".show-back");
let showFrontBtns = document.querySelectorAll(".show-front");
let backs = document.querySelectorAll(".back");
let fronts = document.querySelectorAll(".front");
let moreCarss = document.querySelectorAll(".more-cars");


hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  menu.classList.toggle('active');
  logo.classList.toggle('hidden');// Toggle 'hidden' class for the logo
  header.classList.toggle('menu-active'); 
  logoName.classList.toggle('hidden');
});


// Figcaption Hover Preview
captions.forEach((caption, index) => {
  caption.addEventListener("mouseover", function () {
      var contentHeight = detailsContents[index].offsetHeight;
      details[index].style.height = contentHeight + 40 + "px";
  });

  caption.addEventListener("mouseout", function () {
    details[index].style.height = 0;
    
  });
});

// Card Flipping
showBackBtns.forEach((showBackBtn, index) => {
  showBackBtn.addEventListener("click", function () {
    backs[index].style.transform = "perspective( 2000px ) rotateY( 0deg )";
    fronts[index].style.transform = "perspective( 2000px ) rotateY( -180deg )";
  });
});

showFrontBtns.forEach((showFrontBtn, index) => {
  showFrontBtn.addEventListener("click", function () {
    fronts[index].style.transform = "perspective( 2000px ) rotateY( 0deg )";
    backs[index].style.transform = "perspective( 2000px ) rotateY( 180deg )";
  });
});

figures.forEach((figure, index) => {
  figure.addEventListener("mouseleave", function () {
    fronts[index].style.transform = "perspective(2000px) rotateY(0deg)";
    backs[index].style.transform = "perspective(2000px) rotateY(180deg)";
  });
});
fronts.forEach((front) => {
  front.style.transition = "transform 1s";
  front.style.transformStyle = "preserve-3d";
});

backs.forEach((back) => {
  back.style.transition = "transform 1s";
  back.style.transformStyle = "preserve-3d";
});

// More Cars
document.getElementById('see-more').addEventListener('click', function() {
  moreCarss.forEach((moreCars) => {
    moreCars.style.display = "flex";
    document.getElementById('see-more').style.display = "none";
  });
});


// console.log(loggedIn);
function redirectToSecondPage(container) {
  window.location.href = '/book?content=' + container;
}

// Function to get query parameter value by name
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Get the 'content' query parameter value
const contentParam = getQueryParam('content');
const background = document.querySelector('.background');
const carTitle = document.querySelector('.car-title');


const containerToShow = document.getElementById(contentParam);
  if (containerToShow) {
    console.log(containerToShow);

    containerToShow.style.display = 'flex'; // Show the container for the clicked button
    document.getElementById('price-'+contentParam).style.display = 'flex';
  }

  function updatePrice() {
    let prices = document.querySelectorAll(".price");
    let rates = document.querySelectorAll(".rate");

    for (let i = 0; i < prices.length; i++){ 
      prices[i].innerHTML = rates[i].value;
    }
  }

  document.querySelectorAll('ul a').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('ul a').forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });
