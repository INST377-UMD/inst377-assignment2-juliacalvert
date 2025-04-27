async function redditStocks() {
    const url = "https://tradestie.com/api/v1/apps/reddit?date=2022-04-03";
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


window.onload = function () {
    redditStocks();

    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
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
  };

