// live_3vZ932cA3h4VazEOwxEEC0YV5LIOFsUTwToRXNlwal9kDv6iW9m3OXoEc1LpZPrR
import './styles.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const elements = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
};

const { select, loader, error, catInfo, } = elements;

catInfo.classList.add('is-hidden');
error.classList.add('is-hidden');
loader.classList.replace('loader', 'is-hidden');

let arrayIdBreeds = [];
fetchBreeds().then(data => {
    data.forEach(elem => {
        arrayIdBreeds.push({ value: elem.id, text: elem.name });
    });
    new SlimSelect({
        data: arrayIdBreeds,
        select: select
    })
}).catch(onErrorFetch);

function onErrorFetch() {
    loader.classList.replace('loader', 'is-hidden');
    select.classList.remove('is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page!')
};

select.addEventListener('change', onSelectBreedCats);

function onSelectBreedCats(evt) {
    loader.classList.replace('is-hidden', 'loader');
    select.classList.add('is-hidden');
    catInfo.classList.add('is-hidden');

    const breedId = evt.currentTarget.value;

    fetchCatByBreed(breedId).then(data => {
        loader.classList.replace('loader', 'is-hidden');
        select.classList.remove('is-hidden');
        const { url, breeds } = data[0];

        catInfo.innerHTML = `<div class="img">
        <img src="${url}" alt="${breeds[0].name}" width="600"/></div>
        <div class="info">
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p><i><b>Life_span: </b></i>${breeds[0].life_span} years</p>
        <p><i><b>Temperament:</b></i> ${breeds[0].temperament}</p></div>`
        catInfo.classList.remove('is-hidden');
    })
    .catch(onErrorFetch);
}

