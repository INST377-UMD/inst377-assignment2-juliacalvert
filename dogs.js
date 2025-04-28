function getImages() {
    const url = "https://dog.ceo/api/breeds/image/random/10";
    
    fetch(url)
        .then((result) => result.json())
        .then(data => {
            console.log("API response:", data);
            const carousel = document.getElementById('carousel');
            console.log("Carousel div:", carousel);

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

window.onload = getImages;