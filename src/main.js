import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showError, showInfo, showLoadingSpinner, hideLoadingSpinner } from './js/render-functions.js';

const form = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');
const loadingSpinner = document.getElementById('loading-spinner');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const query = document.getElementById('query').value.trim();
  if (!query) {
    showError('Search query cannot be empty!');
    return;
  }

  galleryContainer.innerHTML = '';
  showLoadingSpinner(loadingSpinner);

  try {
    const response = await fetchImages(query);
    const images = response.hits;

    if (images.length === 0) {
      showInfo('Sorry, there are no images matching your search query.');
    } else {
      renderGallery(images, galleryContainer);
    }
  } catch (error) {
    showError('Something went wrong. Please try again later.');
  } finally {
    hideLoadingSpinner(loadingSpinner);
  }
});
