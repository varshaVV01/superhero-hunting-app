var searchTerm;
// Fetch the data as per the character 
async function loadCharsOutput(query){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString); // take the character id from the current Webpage URL
    const character = urlParams.get('character') 
    //console.log(character);
    query = character;
    const URL = `https://gateway.marvel.com:443/v1/public/characters/${query}?ts=1&apikey=f6c49950a245b5c78806e7ba5c9eb5b7&hash=3568084a8d6d439bbead379d13f5b8c1`
    const response = await fetch(`${URL}`); // Fetch the data from API 
    const data = await response.json();
    //console.log(data.data.results);
    displayCharDetailsUpdate(data.data.results)  // send the responce from data to display function
}

// function to display the character details 
function displayCharDetailsUpdate(data){
    const name = document.getElementById('name')
    name.innerHTML = data[0].name; // data[0] because only one array is there as a responce 
    const description = document.getElementById('description')
    description.innerHTML = data[0].description;
    const comicsList = document.getElementById('comics-list-ul');

    // for the comics list
    for(let i = 0 ; i < data[0].comics.items.length ; i++){
        const comicName = data[0].comics.items[i].name; 
        let comicListElement = document.createElement('li');
        comicListElement.className = 'comic';
        comicListElement.innerHTML = comicName;
        comicsList.append(comicListElement);
    }

    // for the series lists 
    const seriesList = document.getElementById('series-list-ul');
    for(let i = 0 ; i < data[0].series.items.length ; i++){
        const seriescName = data[0].series.items[i].name;
        let seriesListElement = document.createElement('li');
        seriesListElement.className = 'series';
        seriesListElement.innerHTML =seriescName;
        seriesList.append(seriesListElement);
    }

    // for the Stories list 
    const storiesList = document.getElementById('stories-list-ul');
    for(let i = 0 ; i < data[0].stories.items.length ; i++){
        const storiesName = data[0].stories.items[i].name;
        let storiesListElement = document.createElement('li');
        storiesListElement.className = 'stories';
        storiesListElement.innerHTML =storiesName;
        storiesList.append(storiesListElement);
    }

// on hero image add the image from the API 
const heroImage =document.getElementById('image-wrapper');
const image = document.createElement('img');
image.src = data[0].thumbnail.path + "."+ data[0].thumbnail.extension; 
heroImage.appendChild(image); 
}

loadCharsOutput() // function to load all the liked characters 
