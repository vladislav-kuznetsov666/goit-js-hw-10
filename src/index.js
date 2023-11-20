import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  loader.style.display = 'none';
  error.style.display = 'none';

  // Завантаження списку порід при старті
  fetchBreeds()
    .then(breeds => {
      // Додавання опцій до селекту
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(() => {
      error.style.display = 'block';
    });

  // Обробка події вибору породи
  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    // Показ завантажувача
    loader.style.display = 'block';
    // Приховання інформації про кота
    catInfo.style.display = 'none';
    // Приховання повідомлення про помилку
    error.style.display = 'none';

    // Завантаження інформації про кота за обраною породою
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        // Оновлення інтерфейсу з інформацією про кота

        const catImage = document.createElement('img');
        catImage.src = catData[0].url; 
        

        const catName = document.createElement('h2');
        catName.textContent = catData[0].breeds[0].name;
        

        const catDescription = document.createElement('p');
        catDescription.textContent = catData[0].breeds[0].description;
        

        const catTemperament = document.createElement('p');
        catTemperament.textContent = catData[0].breeds[0].temperament;
       

        
        catInfo.innerHTML = '';
        
        catInfo.classList.add('flex-container')
        catInfo.appendChild(catImage);
        catInfo.appendChild(catName);
        catInfo.appendChild(catDescription);
        catInfo.appendChild(catTemperament);

        // Приховання завантажувача після завершення запиту
        loader.style.display = 'none';
        // Відображення інформації про кота
        catInfo.style.display = 'flex';
        catInfo.style.flexDirection = 'column';
        catInfo.style.alignitems = 'center';
      })
      .catch(() => {
        // Відобразити повідомлення про помилку
        error.style.display = 'block';
        // Приховати завантажувач
        loader.style.display = 'none';
      });
  });
});
