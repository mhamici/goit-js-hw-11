export function fetchPhotos(query) {
  const searchParams = new URLSearchParams({
    key: "45999766-9f9a6b82db6e56573d0cf5f49",  // Ваш API-ключ
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  });

  const url = `https://pixabay.com/api/?${searchParams.toString()}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.hits;
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}
