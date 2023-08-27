// live_3vZ932cA3h4VazEOwxEEC0YV5LIOFsUTwToRXNlwal9kDv6iW9m3OXoEc1LpZPrR
// import { fetchBreeds, fetchCatByBreed } from "./cat-api";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SlimSelect from 'slim-select'
// import 'slim-select/dist/slimselect.css';
// import './styles.css';

// const elements = {
//     select: document.querySelector('.breed-select'),
//     loader: document.querySelector('.loader'),
//     error: document.querySelector('.error'),
//     catInfo: document.querySelector('.cat-info'),
// };

// const { select, loader, error, catInfo, } = elements;

// catInfo.classList.add('is-hidden');
// error.classList.add('is-hidden');
// loader.classList.replace('loader', 'is-hidden');

// let arrayIdBreeds = [];
// fetchBreeds().then(data => {
//     data.forEach(element => {
//         arrayIdBreeds.push({ value: element.id, text: element.name });
//     });
//     new SlimSelect({
//         data: arrayIdBreeds,
//         select: select
//     })
// }).catch(onErrorFetch);

// function onErrorFetch() {
//     loader.classList.replace('loader', 'is-hidden');
//     select.classList.remove('is-hidden');

//     Notify.failure('Oops! Something went wrong! Try reloading the page!')
// };

// select.addEventListener('change', onSelectBreedCats);

// function onSelectBreedCats(evt) {
//     loader.classList.replace('is-hidden', 'loader');
//     select.classList.add('is-hidden');
//     catInfo.classList.add('is-hidden');

//     const breedId = evt.currentTarget.value;

//     fetchCatByBreed(breedId).then(data => {
//         loader.classList.replace('loader', 'is-hidden');
//         select.classList.remove('is-hidden');
//         const { url, breeds } = data[0];

//         catInfo.innerHTML = `<div class="img">
//         <img src="${url}" alt="${breeds[0].name}" width="600"/></div>
//         <div class="info">
//         <h1>${breeds[0].name}</h1>
//         <p>${breeds[0].description}</p>
//         <p><i><b>Life_span: </b></i>${breeds[0].life_span} years</p>
//         <p><i><b>Temperament:</b></i> ${breeds[0].temperament}</p></div>`
//         catInfo.classList.remove('is-hidden');
//     })
//     .catch(onErrorFetch);
// }

// Імпорт необхідних модулів та бібліотек
import { fetchBreeds, fetchCatByBreed } from "./cat-api"; // Імпорт функцій з cat-api.js
import Notiflix from 'notiflix'; // Імпорт бібліотеки для сповіщень
import SlimSelect from 'slim-select'; // Імпорт бібліотеки для стилізованого селекта
import 'slim-select/dist/slimselect.css'; // Імпорт стилів для стилізованого селекта
import './styles.css'; // Імпорт власних стилів з styles.css

// Оголошення елементів сторінки
const elements = {
    select: document.querySelector('.breed-select'), // Вибір породи (селект)
    loader: document.querySelector('.loader'), // Завантажувач
    error: document.querySelector('.error'), // Повідомлення про помилку
    catInfo: document.querySelector('.cat-info'), // Інформація про кота
};

// Розпакування елементів сторінки
const { select, loader, error, catInfo } = elements;

// Приховання селекту та відображення завантажувача
select.classList.add('is-hidden');
error.classList.add('is-hidden');
loader.classList.remove('is-hidden');

// Масив для опцій вибору породи кота
let breedOptions = [];

// Отримання інформації про породи котів і ініціалізація селекта
fetchBreeds()
    .then(data => {
        breedOptions = data.map(breed => ({ value: breed.id, text: breed.name }));
        initializeSelect();
        select.classList.remove('is-hidden'); // Відобразити селект
        loader.classList.add('is-hidden'); // Приховати завантажувач
    })
    .catch(onErrorFetch); // Обробка помилок при отриманні даних

// Ініціалізація стилізованого селекта
function initializeSelect() {
    new SlimSelect({
        select: select,
        data: breedOptions
    });
    select.addEventListener('change', onSelectBreedCats); // Додати обробник події для вибору породи
}

// Обробка помилок при отриманні даних
function onErrorFetch() {
    loader.classList.add('is-hidden'); // Приховати завантажувач
    select.classList.remove('is-hidden'); // Відобразити селект
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'); // Повідомлення про помилку
}

// Обробник події вибору породи кота
function onSelectBreedCats(evt) {
    loader.classList.remove('is-hidden'); // Відобразити завантажувач
    select.classList.add('is-hidden'); // Приховати селект
    catInfo.classList.add('is-hidden'); // Приховати інформацію про кота

    // Отримання інформації про кота обраної породи
    const breedId = evt.target.value;
    fetchCatByBreed(breedId)
        .then(data => {
            const { url, breeds } = data[0];

            // Відображення інформації про кота
            catInfo.innerHTML = `
                <div class="img">
                    <img src="${url}" alt="${breeds[0].name}" width="600"/>
                </div>
                <div class="info">
                    <h1>${breeds[0].name}</h1>
                    <p>${breeds[0].description}</p>
                    <p><i><b>Life_span: </b></i>${breeds[0].life_span} years</p>
                    <p><i><b>Temperament:</b></i> ${breeds[0].temperament}</p>
                </div>`;
            catInfo.classList.remove('is-hidden'); // Відобразити інформацію про кота
        })
        .catch(onErrorFetch) // Обробка помилок при отриманні даних
        .finally(() => {
            loader.classList.add('is-hidden'); // Приховати завантажувач
            select.classList.remove('is-hidden'); // Відобразити селект
        });
}