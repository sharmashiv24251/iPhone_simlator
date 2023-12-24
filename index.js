// CLOCK
function updateClock() {
  var currentTimeElement = document.querySelector(".time");
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  // Add leading zero if the number is less than 10
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  var timeString = hours + ":" + minutes + ":" + seconds;
  currentTimeElement.textContent = timeString;
}

// Call updateClock every second (1000 milliseconds)
setInterval(updateClock, 1000);

// Initial call to display the time immediately
updateClock();
///////////////////////////////////

let statusDown = false;
const statusBar = document.querySelector(".status-bar");
const homeBtn = document.querySelector(".homeBtn");
const time = document.querySelector(".time");
const calculatorIcon = document.querySelector(".calculator-icon");
const calculator = document.querySelector(".calculator");
const qrIcon = document.querySelector(".qr-icon");
const qr = document.querySelector(".qr");
const cameraIcon = document.querySelector(".camera-icon");
const camera = document.querySelector(".camera");
const mapsIcon = document.querySelector(".maps-icon");
const maps = document.querySelector(".maps");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const settingsIcon = document.querySelector(".settings-icon");
const settings = document.querySelector(".settings");
const netflixIcon = document.querySelector(".netflix-icon");
const netflix = document.querySelector(".netflix");
const clockIcon = document.querySelector(".clock-icon");
const clock = document.querySelector(".clock");

let currentApp;
let isApp = false;

const handleHomeClick = () => {
  webcam.stop();

  if (statusDown) {
    statusDown = false;
    statusBar.classList.remove("status-down");
    statusBar.classList.add("status-up");
    return;
  }
  if (isApp) {
    isApp = false;
    currentApp.classList.remove("launch");
    currentApp.classList.add("unlaunch");
    return;
  }
};

homeBtn.addEventListener("click", handleHomeClick);
time.addEventListener("click", () => {
  statusDown = true;
  statusBar.classList.remove("status-up");
  statusBar.classList.add("status-down");
});

calculatorIcon.addEventListener(
  "click",
  (calculator, handleAppClick.bind(this, calculator))
);
qrIcon.addEventListener("click", (qr, handleAppClick.bind(this, qr)));

mapsIcon.addEventListener("click", (maps, handleAppClick.bind(this, maps)));
weatherIcon.addEventListener(
  "click",
  (weather, handleAppClick.bind(this, weather))
);
cameraIcon.addEventListener(
  "click",
  (camera, handleAppClick.bind(this, camera))
);
settingsIcon.addEventListener(
  "click",
  (camera, handleAppClick.bind(this, settings))
);
netflixIcon.addEventListener(
  "click",
  (camera, handleAppClick.bind(this, netflix))
);
clockIcon.addEventListener("click", (camera, handleAppClick.bind(this, clock)));

function handleAppClick(app) {
  isApp = true;
  currentApp = app;
  app.classList.remove("unlaunch");
  app.classList.add("launch");
}
//////////////////////////////////////////////
// dark mode
function toggleDarkMode() {
  const elements = document.querySelectorAll(".app");
  elements.forEach((element) => {
    element.classList.toggle("light");
  });
}

// ////////////////////////////////////////////////
// camera

const webCamElement = document.querySelector(`#cameraFeed`);
const canvasElement = document.querySelector(`#canvas`);
const webcam = new Webcam(webCamElement, "user", canvasElement);

function webCamOn() {
  webcam.start();
  webCamElement.style.display = "block";
  canvasElement.style.display = "none";
}
function takePhoto() {
  let photo = webcam.snap();
  document.querySelector(`#captureButton`).href = photo;
  webcam.stop();
  webCamElement.style.display = "none";
  canvasElement.style.display = "block";
}

//// ////////////////////////////////////////////////
//WALLPAPERS
const imageUrls = [
  "wallp.jpg",
  "img2.jpeg",
  "img3.jpeg",
  "img4.jpeg",
  "img5.jpeg",
];
const wallpaperContainer = document.querySelector(`.wallpapers`);

imageUrls.forEach(function (imageUrl) {
  const img = document.createElement("img");
  img.src = `./${imageUrl}`;
  img.classList.add("wallpaper-img");
  img.classList.add("clickable-image");
  wallpaperContainer.appendChild(img);

  img.addEventListener("click", function () {
    document.querySelector(
      `.home`
    ).style.backgroundImage = `url("./${imageUrl}")`;
  });
});

/////////////////////////////////////////////////////
// CALCULATOR

/////////////////////////////////////////////////////
//Movie/Netflix
const fetchData = async (searchTerm) => {
  const response = await axios.get(`https://www.omdbapi.com/`, {
    params: {
      apikey: `69bf0dcb`,
      s: searchTerm,
    },
  });
  // console.log(response.data.Search);
  return response.data.Search;
};
const movieInput = document.querySelector(`.movie-search__input`);

const debounce = (fn) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, 200);
  };
};

const onInput = debounce(async (e) => {
  document.querySelector(".movies__list").innerHTML = "";

  const movies = await fetchData(e.target.value);
  for (const movie of movies) {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add(`movie`);
    movieContainer.innerHTML = `
<img class="movie__img" src="${movie.Poster}"></img>
<div class="movie__detail">
  <h3 class="movie__name">${movie.Title}</h3>
  <h3 class="movie__year">Year : ${movie.Year} </h3>
  <button class="movie__imDb"  onclick="window.open('https://www.imdb.com/title/${movie.imdbID}/', '_blank')"> IMDB</button>
</div>`;
    document.querySelector(`.movies__list`).appendChild(movieContainer);
  }
});

movieInput.addEventListener(`input`, onInput);

// qr ........
const qrInput = document.querySelector(`.qr-search__input`);

const qrContainer = document.querySelector(`.qr__container`);

const generateQr = () => {
  qrContainer.style.display = `block`;
  qrContainer.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrInput.value}`;
};

// WEATHER ///////////////
const weatherApiKey = `6d0dbffbd7aa4484b74ebb9620983e3b`;
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric`;
const weatherImage = document.querySelector(`.weather_image`);
async function checkWeather() {
  const weatherInput = document.querySelector(`.weather-search__input`).value;

  const response = await fetch(
    weatherApiUrl +
      `&appid=${weatherApiKey}&q=${weatherInput}
  `
  );

  const data = await response.json();

  document.querySelector(`.city__name`).innerHTML = data.name;
  document.querySelector(`.city__temp`).innerHTML = `${data.main.temp}°C`;
  if (data.weather[0].main == `Clouds`) {
    weatherImage.src = `./clouds.png`;
  }
  if (data.weather[0].main == `Snow`) {
    weatherImage.src = `./snow.png`;
  }
  if (data.weather[0].main == `Rain`) {
    weatherImage.src = `./rain.png`;
  }
  if (data.weather[0].main == `Drizzle`) {
    weatherImage.src = `./drizzle.png`;
  }
  if (data.weather[0].main == `Clear`) {
    weatherImage.src = `./clear.png`;
  }
  if (data.weather[0].main == `Mist`) {
    weatherImage.src = `./mist.png`;
  }
}
