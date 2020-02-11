function Gallery(gallery) {
  if (!gallery) {
    throw new Error("No Gallery Found!");
  }

  //select the elements we need
  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");
  let currentImage;

  function openModal() {
    console.info("opening Modal...");

    //first check if modal is already open
    if (modal.matches(".open")) {
      console.info("Modal is already open");
      return; //stop function from running
    }
    modal.classList.add("open");

    //event listeners to be bound when we open the modal
  window.addEventListener("keyup", handleKeyUp);
  nextButton.addEventListener("click", showNextImage);
  prevButton.addEventListener("click", showPrevImage);
  }

  

  //close the modal
  function closeModal() {
    modal.classList.remove("open");

    window.removeEventListener("keyup", handleKeyUp);
    nextButton.removeEventListener("click", showNextImage);
    prevButton.removeEventListener("click", showPrevImage);
  }

  //close modal if clicked outside
  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  //escape to close modal
  function handleKeyUp(event) {
    if (event.key === "Escape") return closeModal();
    if(event.key === "ArrowRight") return showNextImage();
    if(event.key === "ArrowLeft") return showPrevImage();
  }

  //show the next image
  function showNextImage() {
showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
      }

  function showImage(el) {
    if (!el) {
      console.info("no image to show");
      return;
    }

    //update modal with this info
    console.log(el);
    modal.querySelector("img").src = el.src;
    modal.querySelector("h2").textContent = el.title;
    modal.querySelector("figure p").textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  //highlight the pic selected
  images.forEach(image =>
    image.addEventListener("click", e => showImage(e.currentTarget))
  );

  //loop over each image
  images.forEach(image => {
      //if key is enter open image
      image.addEventListener("keyup", e => {
          if(e.key === "Enter") {
              showImage(e.currentTarget);
          }
      });
  });

  modal.addEventListener("click", handleClickOutside);
}

//use it on the page
const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));
