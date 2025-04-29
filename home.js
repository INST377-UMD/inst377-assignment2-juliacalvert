function loadQuote(){
    const url ="https://zenquotes.io/api/quotes/";

    fetch(url)
        .then(response => response.json())
        .then(resultJson => {
            const quote = resultJson[0].q;
            const author = resultJson[0].a;
            
            document.getElementById("quote").textContent = `"${quote}"`;
            document.getElementById("author").textContent = `— ${author}`;
        });

}


window.onload = function () {
    loadQuote();

    if (sessionStorage.getItem('voiceEnabled') === 'true' && annyang) {
        annyang.start();
    }
};

if (annyang) {
    const commands = {
        'hello': () => {
            alert('Hello World!');
        },
        'change the color to *color': (color) => {
            document.body.style.backgroundColor = color;
        },
        'navigate to *page': (page) => {
            sessionStorage.setItem('voiceEnabled', 'true');
            const formattedPage = page.toLowerCase() + '.html';
            window.location.href = formattedPage;
        }
    };

    annyang.addCommands(commands);

    document.getElementById('audio-on').addEventListener('click', () => {
        annyang.start();
        sessionStorage.setItem('voiceEnabled', 'true');
    });

    document.getElementById('audio-off').addEventListener('click', () => {
        annyang.abort();
        sessionStorage.setItem('voiceEnabled', 'false');
    });
}