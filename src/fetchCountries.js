// https://restcountries.com/v3.1/name/{name}

const URL = 'https://restcountries.com/v3.1/name';

export function fetchCountries(contry) {

    const searchParameters = [
        'name',         // name.official - повна назва країни
        'capital',      // capital - столиця
        'population',   // population - населення
        'flags',        // lags.svg - посилання на зображення прапора
        'languages',    // languages - масив мов
    ].join(',');

    return fetch(`${URL}/${contry}?fields=${searchParameters}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }

        return response.json();
    });
}
