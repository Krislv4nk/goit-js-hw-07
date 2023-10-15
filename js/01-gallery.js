import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);


const createImagesListMarkup = (images) => images.map(({ original, preview, description }) => `
  <li class="gallery__item">
    <a class="gallery_link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
`).join("");

const listImages = document.querySelector(".gallery");

console.log(listImages);
const imagesMarkup = galleryItems ? createImagesListMarkup(galleryItems) : '';
listImages.insertAdjacentHTML('beforeend', imagesMarkup)
listImages.addEventListener('click', onCardsContainerClick);

function onCardsContainerClick(event) {
    
    if (event.target.nodeName !== 'IMG') {
      return;
    }
    
    event.preventDefault();
    const imageUrl = event.target.dataset.source;
    openModal(imageUrl);
}
let modal;
function openModal(imageUrl) {
  
  const modalTemplate = `
  <div class="modal">
    <img src="${imageUrl}" width="800" height="600">
  </div>
`;
  modal = basicLightbox.create(modalTemplate);
  modal.show();

  modal.element().addEventListener('click', () => {
    modal.close();
  });
} 

function closeModal(event) {
    if (event.code === 'Escape' && modal.visible()) {
      modal.close();
    }
}

document.addEventListener('keydown', closeModal);