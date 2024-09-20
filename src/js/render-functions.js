import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderGallery(images, galleryContainer) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <a href="${largeImageURL}" class="gallery-item">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p><b>Likes</b>: ${likes}</p>
            <p><b>Views</b>: ${views}</p>
            <p><b>Comments</b>: ${comments}</p>
            <p><b>Downloads</b>: ${downloads}</p>
          </div>
        </a>`
    )
    .join('');

  galleryContainer.innerHTML = markup;
  refreshLightbox();
}

function refreshLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
  lightbox.refresh();
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

export function showInfo(message) {
  iziToast.info({
    title: 'Info',
    message: message,
  });
}

export function showLoadingSpinner(loadingSpinner) {
  loadingSpinner.classList.remove('hidden');
}

export function hideLoadingSpinner(loadingSpinner) {
  loadingSpinner.classList.add('hidden');
}
