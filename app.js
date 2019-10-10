//SELECT ELEMENTS
const icon = document.getElementById('icon');
const temp = document.getElementById('temp');
const desc = document.getElementById('desc');
const date = document.getElementById('date');
const time = document.getElementById('time');
const city = document.getElementById('city');

//APP DATA
const weather = {};
weather.temperature = {
    unit: "celsius"
}

const KELVIN = 273;

//GET WEATHER
function getWeather() {
    let api = 'https://api.openweathermap.org/data/2.5/weather?id=3333229&appid=30b3668879133b2360e1b3e775d4418f';
    console.log(api);

    fetch(api) 
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.icon = data.weather[0].icon;
        })
        .then(function(){
            displayWeather();
            displayTime();
            displayDate();
        });
}

function displayWeather() {
    temp.textContent = weather.temperature.value + '\u00B0';
    desc.textContent = weather.description;
    icon.src = 'img/' +  weather.icon + '.svg';
}

function displayTime() {
    let d = new Date();
    let hour = d.getHours();
    let minute = d.getMinutes();

    checkTime(hour);
    checkTime(minute);

    let output = hour + ':' + minute;
    time.textContent = output;
    
    setTimeout(displayTime, 60000);
    
}

function displayDate() {
    let d = new Date();
    let day = d.getDay();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[d.getMonth()];
    day = checkDay(day);

    let output = day + " " + month;
    date.textContent = output;
}

function checkDay(d) {
    if(d === 1) {
        d += "st";
    } else if (d === 2) {
        d += "nd";
    } else if (d === 3) {
        d += "rd";
    } else {
        d += "th";
    }
    return d;
}

function checkTime(i) {
    if(i<10) {
        i = "0" + i;
    }
    return i;
}

// run the funtion on load
document.addEventListener('DOMContentLoaded', getWeather);