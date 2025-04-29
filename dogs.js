function getImages() {
    const url = "https://dog.ceo/api/breeds/image/random/10";
    
    fetch(url)
        .then((result) => result.json())
        .then(data => {
            const carousel = document.getElementById('carousel');

            data.message.forEach((imageURL) => {
                console.log("Adding image:", imageURL);
                const img = document.createElement('img');
                img.src = imageURL;
                carousel.appendChild(img);
            });

            simpleslider.getSlider({
                container: document.getElementById('carousel'),
                delay: 3,
                duration: 0.5
            });
        })

}


function dogButtons() {
    const url = "https://dogapi.dog/api/v2/breeds";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const dogButtons = document.getElementById('dog-buttons');

            data.data.forEach(breed => {
                const button = document.createElement('button');
                button.textContent = breed.attributes.name;
                button.setAttribute('dogs', 'breed-button'); // add custom class
                

                button.addEventListener('click', () => {
                    showInfo(breed);
                });

                dogButtons.appendChild(button);
            });
        })
}

function showInfo(breed){
    const breedInfo = document.getElementById('breed-info');
    const breedName = document.getElementById('breed-name');
    const breedDescription = document.getElementById('description');
    const minLife = document.getElementById('min-life');
    const maxLife = document.getElementById('max-life');
    //const lifeSpan = breed.life_span.split(' - '); 

    breedInfo.style.display = 'block';
    breedName.textContent = breed.attributes.name;
    breedDescription.textContent = breed.attributes.description;
    minLife.innerText = breed.attributes.life.min;
    maxLife.innerText = breed.attributes.life.max;
}


window.onload = function() {
    getImages(); // your images carousel
    dogButtons(); // your breeds buttons
};