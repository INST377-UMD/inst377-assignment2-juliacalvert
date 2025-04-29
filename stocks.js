async function redditStocks() {
    const url = "https://tradestie.com/api/v1/apps/reddit?date=2025-04-27";
    const response = await fetch(url);
    const stocks = await response.json();
    const top5 = stocks.slice(0, 5);

    const tableBody = document.querySelector('#reddit-stocks tbody');
    tableBody.innerHTML = '';

    top5.forEach((stock) => {
        const tableRow = document.createElement('tr');
        const tickerCell = document.createElement('td');
        const link = document.createElement('a');

        link.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
        link.textContent = stock.ticker;
        tickerCell.appendChild(link);

        const commentsCell = document.createElement('td');
        commentsCell.textContent = stock.no_of_comments;

        const sentimentCell = document.createElement('td');

        const bullishImg = document.createElement('img');
        bullishImg.src = "bullish.png";
        
        const bearishImg = document.createElement('img');
        bearishImg.src = "bearish.png";
        

        if (stock.sentiment === "Bullish") {
            sentimentCell.appendChild(bullishImg);
        } else if (stock.sentiment === "Bearish") {
            sentimentCell.appendChild(bearishImg);
        } else {
            sentimentCell.textContent = "null";
        }

        tableRow.appendChild(tickerCell);
        tableRow.appendChild(commentsCell);
        tableRow.appendChild(sentimentCell);

        tableBody.appendChild(tableRow);

    
      });
}



async function chart() {
    const apiKey = "si201vf6eGWCx2fUW4NH_PLs8iIAApSO";
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const days = document.getElementById('days').value;
    
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - days);

    const from = pastDate.toISOString().split('T')[0];
    const to = today.toISOString().split('T')[0];

    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const labels = data.results.map(point => {
        const date = new Date(point.t);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    });

    const closingPrices = data.results.map(point => point.c);

    
    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '($) Stock Price',
          data: closingPrices,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    document.getElementById('myChart').style.display = 'block';
}


document.getElementById('lookupButton').onclick = chart;

window.onload = function () {
    redditStocks();

    if (annyang) {
        const commands = {
            'hello': () => {
                alert('Hello!');
            },
            'change the color to *color': (color) => {
                document.body.style.backgroundColor = color;
            },
            'navigate to *page': (page) => {
                sessionStorage.setItem('voiceEnabled', 'true');
                const formattedPage = page.toLowerCase() + '.html';
                window.location.href = formattedPage;
            },
            'lookup *ticker': (ticker) => {
                document.getElementById('ticker').value = ticker.toUpperCase();
                chart();
            }
        };

        annyang.addCommands(commands);

        if (sessionStorage.getItem('voiceEnabled') === 'true') {
            annyang.start();
        }


        document.getElementById('audio-on').addEventListener('click', () => {
            annyang.start();
            sessionStorage.setItem('voiceEnabled', 'true');
        });

        document.getElementById('audio-off').addEventListener('click', () => {
            annyang.abort();
            sessionStorage.setItem('voiceEnabled', 'false');
        });
    }
};

