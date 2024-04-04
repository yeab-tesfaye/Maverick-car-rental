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


  // Function to get query parameter value by name
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Get the 'content' query parameter value
  const contentParam = getQueryParam('content');
  const background = document.querySelector('.background');
  const carTitle = document.querySelector('.car-title');

// Change the background image of the body based on the 'content' parameter
if (contentParam === 'container1') {
  background.style.backgroundImage = "url('images/yellow.jpg')";
  background.style.backgroundSize= 'cover';
  background.style.backgroundPosition = 'center';
}  

else if (contentParam === 'container2') {
  background.style.backgroundImage = "url('images/car3.jpg')";
  background.style.backgroundSize= 'cover';
  background.style.backgroundPosition = 'center';

}
else if (contentParam === 'container3') {
  background.style.backgroundImage = "url('images/car-8.jpg')";
  background.style.backgroundSize= 'cover';
  background.style.backgroundPosition = 'center';

}
else if (contentParam === 'container4') {
  background.style.backgroundImage = "url('images/car-3.jpg')";
  background.style.backgroundSize= 'cover';
  background.style.backgroundPosition = 'center';

}
else if (contentParam === 'container5') {
  background.style.backgroundImage = "url('images/car-4.jpg')";
  background.style.backgroundSize= 'cover';
  background.style.backgroundPosition = 'center';

}
else if (contentParam === 'container6') {
  background.style.backgroundImage = "url('images/car-6.jpg')";
  background.style.backgroundSize= 'cover';
  background.style.backgroundPosition = 'center';

}
else if (contentParam === 'container7') {
  background.style.backgroundImage = "url('images/car1.jpg')";
  background.style.backgroundSize= 'cover';
  background.style.backgroundPosition = 'center';

  }
else if (contentParam === 'container8') {
    background.style.backgroundImage = "url('images/Audi-A4-Avant-1.jpg')";
    background.style.backgroundSize= 'cover';
    background.style.backgroundPosition = 'center';

 }
else if (contentParam === 'container9') {
  background.style.backgroundImage = "url('images/BMW-M4.jpg')";
  background.style.backgroundSize= 'cover';
  background.style.backgroundPosition = 'center';

  }
else if (contentParam === 'container10') {
  background.style.backgroundImage = "url('images/car-7.jpg')";
  background.style.backgroundSize= 'cover';
  background.style.backgroundPosition = 'center';

} 

  console.log(contentParam);
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
 