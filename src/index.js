import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import templateContriesList from './templates/contriesList.hbs';
import templateContryCard from './templates/contryCard.hbs';

const inputText = document.querySelector('#search-box');
// console.log(inputText);

const listContries = document.querySelector('.country-list');
// console.log(listContries);

const cardContry = document.querySelector('.country-info');
// console.log(cardContry);

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

function checkEnterContry(event) {
    // console.dir(event.target.value);

    if (event.target.value === '') {
        listContries.innerHTML = '';
        cardContry.innerHTML = '';
        return;
    }

    const nameContry = event.target.value.trim();
    // console.log(nameContry.length);

    fetchCountries(nameContry)
        .then(dataContry => {
            // console.dir(dataContry)

            if (dataContry.length > 10) {
                console.log('Too many matches found. Please enter a more specific name.');
                console.dir(dataContry)

                Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (dataContry.length >= 2 && dataContry.length <= 10) {
                console.log(`${dataContry.length} matches found.`);
                console.dir(dataContry)

                Notify.info(`${dataContry.length} matches found.`);
                
                cardContry.innerHTML = '';
                listContries.innerHTML = templateContriesList(dataContry);
            } else {
                console.log('Match found.');
                console.dir(dataContry)

                Notify.info('Match found.');

                listContries.innerHTML = '';
                let { capital, flags: { svg }, languages, name: { official }, population } = dataContry[0];
                
                // console.log(capital, svg, languages, official, population);

                dataContry[0].capital = capital.join();
                dataContry[0].languages = Object.values(languages).join();

                cardContry.innerHTML = templateContryCard(dataContry[0]);
            }
        })
        .catch(error => {
            if (error.message === '404') {
                Notify.failure('Oops, there is no country with that name.');

                listContries.innerHTML = '';
                cardContry.innerHTML = '';
            }
        });
}

inputText.addEventListener('input', debounce(checkEnterContry, DEBOUNCE_DELAY));



















// fetch('https://jsonplaceholder.typicode.com/photos/1')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }

//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

