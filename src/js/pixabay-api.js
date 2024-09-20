const API_KEY = '46086824-2983fdd94aba44351510a0e76'; // Встав свій ключ
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 12) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error fetching images from Pixabay');
  }

  return await response.json();
}
