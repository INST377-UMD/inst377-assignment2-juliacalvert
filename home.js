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


window.onload = loadQuote;


if (annyang) {
    // Define your commands
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
      }
    };

    // Add the commands to annyang
    annyang.addCommands(commands);

    // Button event listeners
    document.getElementById('audio-on').addEventListener('click', () => {
      annyang.start();
      console.log('Voice recognition started');
    });

    document.getElementById('audio-off').addEventListener('click', () => {
      annyang.abort();
      console.log('Voice recognition stopped');
    });
}