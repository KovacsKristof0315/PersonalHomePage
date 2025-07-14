const apiKey = "0857dd09d23f4f4ea28213729250707";


async function fetchWeather(city) {

  try {
    const response = await fetch(`../php/weather.php?city=${encodeURIComponent(city)}`);

    if (response.status === 429) {
      document.getElementById("titleName").textContent =
        "Túl sok kérés érkezett. Kérlek, próbáld meg később.";
      return;
    }

    const data = await response.json();
    
    if (!response.ok) {
      if (data.error && data.error.code === 1006) {
        document.getElementById("titleName").textContent =
          "Helytelen település név!";
      } else {
        document.getElementById("titleName").textContent =
          "Hiba történt az adatok lekérésekor.";
      }
      return;
    }


    // const dataToStore = {
    //     location : data.location.name,
    //     date: data.forecast.forecastday[0].date,
    //     today : data.forecast.forecastday[0].hour.find(x=>x.time == `${data.forecast.forecastday[0].date} 12:00`),
    //     todayNight : data.forecast.forecastday[0].hour.find(x=>x.time == `${data.forecast.forecastday[0].date} 21:00`),
    //     tomorrow : data.forecast.forecastday[1].hour.find(x=>x.time == `${data.forecast.forecastday[1].date} 12:00`),
    //     tomorrowNight : data.forecast.forecastday[1].hour.find(x=>x.time == `${data.forecast.forecastday[1].date} 21:00`),
    //     tomorrow_after : data.forecast.forecastday[2].hour.find(x=>x.time == `${data.forecast.forecastday[2].date} 12:00`),
    //     tomorrow_afterNight : data.forecast.forecastday[2].hour.find(x=>x.time == `${data.forecast.forecastday[2].date} 21:00`)
    // }
    localStorage.setItem("weather", JSON.stringify(data));

    printData(data);
  } catch (error) {
    document.getElementById("titleName").textContent =
      "Nem sikerült csatlakozni az időjárás szolgáltatáshoz.";
    console.error(error);
  }
}


$("search").addEventListener("click", () => {
  
  const city = $("cityName").value;
  const data = JSON.parse(localStorage.getItem("weather")) || null;
  if (data == null || data.location.name != city) {
    fetchWeather(city);
  }
  else
  {
    printData(data);
  }
  
})

addEventListener("load", () => {
    if (localStorage.getItem("weather") != undefined) {
      const data = JSON.parse(localStorage.getItem("weather"));
      
      printData(data);
      $("cityName").value = data.location.name;
  }
})

async function printData(data) {
  document.getElementById("weatherForecast").innerHTML = "";
  

  const city = data.location.name;
  document.getElementById("titleName").textContent = city;

  let lang = localStorage.getItem("actLang");
  for (let i = 0; i < 3; i++) {
    const card = await loadWeatherCard();
    
    card.querySelectorAll(".day")[0].textContent = text[lang].weather.day[i];
    
    const actData = data.forecast.forecastday[i].hour.find(x=>x.time == `${data.forecast.forecastday[i].date} 12:00`)
    let j = text.en.weather.description.indexOf(actData.condition.text.trim());
    
    const description = text[lang].weather.description[j] || actData.condition.text;
    card.querySelectorAll(".description")[0].textContent = description;

    
    card.querySelector("#temperature").textContent = actData.temp_c + "°C.";
    card.querySelector("#weatherIMG").src = actData.condition.icon;
    card.querySelector("#date").textContent = data.forecast.forecastday[i].date;
    
    card.querySelectorAll(".wind")[0].textContent = text[lang].weather.wind;
    const wind = actData.wind_kph;
    drawWindMeter(card, wind);
    card.querySelector("#windText").textContent = wind;
    
    
    const actNightData = data.forecast.forecastday[i].hour.find(x=>x.time == `${data.forecast.forecastday[i].date} 21:00`)
    j = text.en.weather.description.indexOf(actNightData.condition.text.trim());
    const nightDescription = text[lang].weather.description[j] || actNightData.condition.text;
    card.querySelectorAll(".nightDescription")[0].textContent = nightDescription;

    
    card.querySelector("#nightTemperature").textContent = actNightData.temp_c + "°C.";
    let nightSrc = actData.condition.icon.replace("day", "night");
    card.querySelector("#nightWeatherIMG").src = nightSrc;
    
    
    document.getElementById("weatherForecast").appendChild(card);
  }
  printAirQ(data);
}

async function loadWeatherCard() {
    const res = await fetch('/components/weather_Card.html');
    const html = await res.text();

    const todo_Item = document.createElement('div');
    todo_Item.innerHTML = html;

    return todo_Item.firstChild;

}



function drawWindMeter(object, windSpeed) {
    const canvas = object.querySelector("#windMeter");
    const ctx = canvas.getContext("2d");

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = (canvas.width / 2) + 10;
    const centerY = canvas.height / 2  + 20;
    const radius = 50;

    const startAngle = Math.PI - 0.5;
    const endAngle = Math.PI + 2;
    // Draw arc (semi-circle)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 15;
    ctx.strokeStyle = "#e0e0e0";
    ctx.stroke();

    // Draw scale lines
    const numTicks = 4;

    for (let i = 0; i <= 4; i++) {
      const angle = startAngle + (i / numTicks) * (endAngle - startAngle);
      const x1 = centerX + radius * Math.cos(angle);
      const y1 = centerY + radius * Math.sin(angle);
      const x2 = centerX + (radius - 10) * Math.cos(angle);
      const y2 = centerY + (radius - 10) * Math.sin(angle);

      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#333";
      ctx.stroke();

      // Label
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#000";
      const label = (i * 10).toString();
      const lx = centerX + (radius - 25) * Math.cos(angle);
      const ly = centerY + (radius - 25) * Math.sin(angle);
      ctx.fillText(label, lx - 10, ly + 5);
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, startAngle+(windSpeed/16));
    ctx.lineWidth = 15;
    ctx.strokeStyle = "#007bff";
    ctx.stroke();

    const image = new Image();
    image.src = "../assets/wind.png";
    image.onload = () => {
        const imgWidth = 30;
        const imgHeight = 30;
        ctx.drawImage(image, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);
    };
}

let airChart;
function printAirQ(data) {
  // const date = data.forecast.forecastday[0].date;
  const airData = getAirData(data, 0, 12)

  if (airChart) {
    airChart.destroy();
  }

  const ctx = document.getElementById('airChart').getContext('2d');
  airChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['CO', 'NO₂', 'O₃', 'PM2.5', 'PM10'],
      datasets: [{
        label: 'Levegő minőség (μg/m³)',
        data: [airData.co, airData.no2, airData.o3, airData.pm2_5, airData.pm10],
        backgroundColor: [
          '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'
        ]
      }]
    },
    options: {
        plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: { beginAtZero: true, ticks: {color: 'white'} },
        x: { ticks: {color: 'white'} }
      }
    }
  });

}

function getAirData(data, i, j) {
  return data.forecast.forecastday[i].hour[j].air_quality;
}


