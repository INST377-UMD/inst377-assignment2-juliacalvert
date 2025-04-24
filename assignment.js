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