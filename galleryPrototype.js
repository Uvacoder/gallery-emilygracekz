  function Gallery(gallery) {
  if (!gallery) {
    throw new Error("No Gallery Found!");
  }
  this.gallery = gallery;
  //select the elements we need
  this.images = Array.from(gallery.querySelectorAll("img"));
   this.modal = document.querySelector(".modal");
   this.prevButton = this.modal.querySelector(".prev");
   this.nextButton = this.modal.querySelector(".next");    

    //bind methods to instance when needed
    this.showNextImage = this.showNextImage.bind(this);
    this.showPrevImage = this.showPrevImage.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

  //highlight the pic selected
  this.images.forEach(image =>
    image.addEventListener("click", e => this.showImage(e.currentTarget))
  );

  //loop over each image
  this.images.forEach(image => {
      //if key is enter open image
      image.addEventListener("keyup", e => {
          if(e.key === "Enter") {
              this.showImage(e.currentTarget);
          }
      });
  });

  this.modal.addEventListener("click", this.handleClickOutside);
}
Gallery.prototype.openModal = function() {
console.info("opening Modal...");

    //first check if modal is already open
    if (this.modal.matches(".open")) {
      console.info("Modal is already open");
      return; //stop function from running
    }
    this.modal.classList.add("open");

    //event listeners to be bound when we open the modal
  window.addEventListener("keyup", this.handleKeyUp);
  this.nextButton.addEventListener("click", this.showNextImage);
  this.prevButton.addEventListener("click", this.showPrevImage);
  }

  //close the modal
  Gallery.prototype.closeModal = function() {
    this.modal.classList.remove("open");

    window.removeEventListener("keyup", this.handleKeyUp);
    nextButton.removeEventListener("click", this.showNextImage);
    prevButton.removeEventListener("click", this.showPrevImage);
  }

  //close modal if clicked outside
  Gallery.prototype.handleClickOutside = function(e) {
    if (e.target === e.currentTarget) {
      this.closeModal();
    }
  }

  //escape to close modal
  Gallery.prototype.handleKeyUp = function(event) {
    if (event.key === "Escape") return this.closeModal();
    if(event.key === "ArrowRight") return this.showNextImage();
    if(event.key === "ArrowLeft") return this.showPrevImage();
  }

  //show the next image
  Gallery.prototype.showNextImage = function() {
this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
  }

  Gallery.prototype.showPrevImage = function() {
    this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);
      }

  Gallery.prototype.showImage = function(el) {
    if (!el) {
      console.info("no image to show");
      return;
    }

    //update modal with this info
    console.log(el);
    this.modal.querySelector("img").src = el.src;
    this.modal.querySelector("h2").textContent = el.title;
    this.modal.querySelector("figure p").textContent = el.dataset.description;
    this.currentImage = el;
    this.openModal();
  }

//use it on the page
const gallery1 = new Gallery(document.querySelector(".gallery1"));
const gallery2 = new Gallery(document.querySelector(".gallery2"));

console.log(gallery1, gallery2);