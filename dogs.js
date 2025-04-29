let allBreeds = [];

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
            allBreeds = data.data;
            
            const dogButtons = document.getElementById('dog-buttons');

            data.data.forEach(breed => {
                const button = document.createElement('button');
                button.textContent = breed.attributes.name;
                button.setAttribute("class", "dog-button");
                

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

    breedInfo.style.display = 'block';
    breedName.textContent = `Name: ${breed.attributes.name}`;
    breedDescription.textContent = breed.attributes.description;
    minLife.innerText = breed.attributes.life.min;
    maxLife.innerText = breed.attributes.life.max;
}


window.onload = function() {
    getImages();
    dogButtons();
};


if (annyang) {
    const commands = {
      'hello': () => {
        alert('Hello!');
      },
      'change the color to *color': (color) => {
        document.body.style.backgroundColor = color;
      },
      'navigate to *page': (page) => {
        const formattedPage = page.toLowerCase() + '.html';
        window.location.href = formattedPage;
      },
      'load dog breed *breed': (spokenBreed) => {
        const found = allBreeds.find(b => 
        b.attributes.name.toLowerCase() === spokenBreed.toLowerCase()
        );
        showInfo(found);
    }
    };

    annyang.addCommands(commands);

    document.getElementById('audio-on').addEventListener('click', () => {
      annyang.start();
    });

    document.getElementById('audio-off').addEventListener('click', () => {
      annyang.abort();
    });
}