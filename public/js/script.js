const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const header = document.querySelector('.header');
const logoName = document.querySelector('.logo-name');
const buttonsWrapper = document.querySelector('.map');
const slides = document.querySelector('.inner');
const scrolll = document.querySelector('.wrapper');
const seeDetails = document.querySelectorAll('.see-details')
const modalCloseBtns = document.querySelectorAll('.close-button');
const rentNowBtns = document.querySelectorAll('.rent-now');


hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  menu.classList.toggle('active');
  logo.classList.toggle('hidden');// Toggle 'hidden' class for the logo
  header.classList.toggle('menu-active'); 
  logoName.classList.toggle('hidden');
});

function updateMap() {
  const scrollPercentage = (scrolll.scrollLeft / scrolll.scrollWidth*2) * 100;
  Array.from(buttonsWrapper.children).forEach((item) =>
    item.classList.remove('active')
  );

  if (scrollPercentage < 50) {
    buttonsWrapper.querySelector('.first').classList.add('active');
  } else if(scrollPercentage >= 50 && scrollPercentage < 100) {
    buttonsWrapper.querySelector('.second').classList.add('active');
  }
 
}

buttonsWrapper.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    Array.from(buttonsWrapper.children).forEach((item) =>
      item.classList.remove("active")
    );
    if (e.target.classList.contains("first")) {
      console.log(e.target.classList);
      slides.style.transform = "translateX(0%)";
      e.target.classList.add("active");
    } else if (e.target.classList.contains("second")) {
      slides.style.transform = "translateX(-50%)";
      e.target.classList.add("active");
      
    }
  }
});

scrolll.addEventListener('scroll', () => {
  updateMap();
});

seeDetails.forEach(button => {
  button.addEventListener('click', function(e) {
      const parentContainer = this.closest('.cars');

      // Get the index of the clicked button within its container
      const index = Array.from(parentContainer.querySelectorAll('.see-details')).indexOf(this);

      // Get the corresponding modal based on the index
      const carModals = parentContainer.querySelectorAll('.modal');
      const currentModal = carModals[index];

  console.log(index)
      // Get the car image element
      const carImage = this.parentElement.previousElementSibling.src;

      // Set the modal content with new car details
      currentModal.querySelector('.car-image').src = carImage;

      console.log(carImage);
      // Show the modal for the clicked car and hide other modals
      carModals.forEach(modal => {
          if (modal !== currentModal) {
              modal.style.display = 'none';
          }
      });
      currentModal.style.display = 'block';
      // Delay the changes to the opacity and transform properties
    setTimeout(() => {
      currentModal.style.opacity = '1';
      currentModal.style.transform = 'translateY(0)';
    }, 0);
      document.querySelector('.image-list').style.display = 'none';
      document.querySelector('.more-btn').style.display = 'none';
  });
});


// Add event listener for 'X' buttons
modalCloseBtns.forEach(button => {
  button.addEventListener('click', function() {
    // Get the modal and car container
    const modal = this.parentElement.parentElement;
    const container = modal.parentElement;
 
    setTimeout(() => {
      modal.style.display = 'none';
    },700)
    
    // Reset the opacity and transform properties
    modal.style.opacity = '0';
    modal.style.transform = 'translateY(20px)';
    
    const imageList = document.querySelector('.image-list');

    imageList.style.display = 'grid';
    imageList.style.gridTemplateColumns = 'repeat(3, 1fr)';
    imageList.style.gap = '10px';
    document.querySelector('.more-btn').style.display = 'block';


    // Apply responsive styles based on media queries
    const applyMediaQueryStyles = () => {
      if (window.innerWidth <= 880) {
        imageList.style.gridTemplateColumns = 'repeat(1, 1fr)';
      } else if (window.innerWidth <= 1200) {
        imageList.style.gridTemplateColumns = 'repeat(2, 1fr)';
      } else {
        imageList.style.gridTemplateColumns = 'repeat(3, 1fr)';
      }
    };
    // Add event listeners for window resize
    window.addEventListener('resize', applyMediaQueryStyles);
    // Call once to apply on load
    applyMediaQueryStyles();
    
  });
});

function redirectToSecondPage(container) {
  window.location.href = '/book?content=' + container; // Redirect with query parameter
}

