'use strict';
async function getCountry() {
    event.preventDefault();
    let content = document.querySelector('[name=title]').value;
    console.log(content);
    if (content.trim().length === 0 || content === undefined){
        console.log("null input");
        return;
    }
    let url = 'https://restcountries.eu/rest/v2/name/' + content;
    let response = await fetch(url);
    if (response.ok) {
        console.log(response);
        let countries = await response.json();
        console.log(countries);
        for (let i = 0; i < countries.length; i++){
            let c = new Country(countries[i].name,countries[i].flag,countries[i].capital,countries[i].region,countries[i].currencies[i].name);
            document.getElementsByTagName('div')[0].append(createCountryElement(c));
            content.reset();
        }
    } else alert("Such a country does not exist")
}
function createCountryElement(c) {
    let div = document.createElement('div');
    let content = '<p style="font-size:200%;">' + c.name + '</p>' +
        '<img src=' + c.flag + '>' +
        '<p>'+ "Capital - " + c.capital + '</p>' +
        '<p>'+ "Region - " + c.region + '</p>' +
        '<p>'+ "Currencies - " + c.currencies + '</p>' +
        '<a href="https://www.google.com/search?q='+ c.name +'" target="_blank">More</a>'+
        '<br>';
    div.innerHTML = content;
    return div;
}

window.addEventListener('load', function () {
    const searchForm = document.getElementById('form');
    searchForm.addEventListener('submit', getCountry);
});

class Country{
    constructor(name, flag, capital, region, currencies) {
        this.name = name;
        this.flag = flag;
        this.capital = capital;
        this.region = region;
        this.currencies = currencies;
    }
}