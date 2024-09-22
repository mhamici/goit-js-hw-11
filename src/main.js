import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Инициализация SimpleLightbox
const lightbox = new SimpleLightbox('.list-img a');

const formNew = document.querySelector(".formImg");
const photoList = document.querySelector(".list-img");
const loading = document.querySelector(".loader");
const inputSearch = document.getElementById("search-img");

import { renderUsers } from './js/render-functions.js'; // Функция рендеринга
import { fetchPhotos } from './js/pixabay-api.js'; // Запрос на API

formNew.addEventListener("submit", (event) => {
    event.preventDefault();
    
    photoList.innerHTML = ""; // Очистка галереи перед новым поиском
    loading.classList.remove("visually-hidden"); // Показываем спиннер

    const query = inputSearch.value.trim();
    if (query !== "") {
        fetchPhotos(query)
            .then((photos) => {
                loading.classList.add("visually-hidden"); // Скрываем спиннер
                if (photos.length > 0) {
                    renderUsers(photos, photoList); // Рендерим фото
                    lightbox.refresh(); // Обновляем SimpleLightbox
                } else {
                    iziToast.error({
                        title: 'Error',
                        message: 'Sorry, there are no images matching your search query. Please try again!',
                        position: 'topRight'
                    });
                }
            })
            .catch((error) => {
                loading.classList.add("visually-hidden");
                iziToast.error({
                    title: 'Error',
                    message: 'Error fetching images. Try again later.',
                    position: 'topRight'
                });
                console.error(error);
            });
    } else {
        loading.classList.add("visually-hidden");
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term!',
            position: 'topRight'
        });
    }
});