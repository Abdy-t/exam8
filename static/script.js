'use strict';
async function getCountry() {
    let content = document.querySelector('[name=title]').value;
    console.log(content);
    if (content == undefined || content.trim().length == 1)
        return;
    let url = 'https://restcountries.eu/rest/v2/name/' + content;
    let response = await fetch(url);
    if (response.ok) {
        console.log(response);
        let countries = await response.json();
        console.log(countries);
        for (let i = 0; i < countries.length; i++){
            let c = {
                name: countries[i].name,
                capital: countries[i].capital,
                region: countries[i].region,
                currencies: countries[i].currencies[i].name,
                flag: countries[i].flag

            };
            document.getElementsByTagName('div')[0].append(createCountryElement(c));
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