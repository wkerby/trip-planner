//create variable for button prompting user to select a city
var buttonEl = document.querySelector("#fetch-button");
//create variable for currently selected city
var currentCityEl = document.querySelector("#current-city");
//run init function upon page refresh 
init();

//----------------------------------Modal------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});


//----------------------------------Country Dropdown------------------------------------------------------

var fetchButton = document.getElementById('fetch-button');
var select = document.getElementById("dropdown");
var menu = document.getElementById('selection');

//create function that provides list of cities from which to choose in dropdown element
function getApi() {

  var requestUrl = "https://restcountries.com/v2/all?fields=name,capital";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.textContent = data[i].capital
        select.appendChild(option);
      }
    })
  menu.classList.remove('hide');
}

function hideButton() {
  document.getElementById('fetch-button').style.display = 'none';
}

fetchButton.addEventListener('click', getApi)

//----------------------------------Attraction List Box------------------------------------------------------

//create function that fetches list of attractions based off of city input
function getAttractions(city) {
  // var city = document.querySelector("option").textContent;
  var ulAttractionsEl = document.querySelector('#attractions-list'); //remove any li elements from previous search
  ulAttractionsEl.textContent = "";
  var fetchUrl = "https://travel-advisor.p.rapidapi.com/locations/search?query=" + city + "&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US"

  var apiOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '52aab63322mshd42013a9d2eed84p13f5a3jsnc34da247312e',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };

  fetch(fetchUrl, apiOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var counter = 0;
      for (var i = 0; i < data.data.length; i++) {
        if (counter <= 4) { //limit the number of attractions displayed to a maximum of 5 
          if (data.data[i].result_type === "things_to_do") {
            counter++;
            var attraction = data.data[i].result_object.name;
            var newLi = document.createElement("li");
            newLi.setAttribute('class', 'attraction');
            newLi.textContent = attraction;
            ulAttractionsEl.appendChild(newLi);
          }
        }
        else {
          break;
        }
      };
    });
  var ulAttractionsEl = document.querySelector('#attractions-list');

}


var selectedCapital = document.getElementById("dropdown");

//create function that returns list of attractions when a city is selected from dropdown list
function setSelectedValue() {
  var selected_value = selectedCapital.options[selectedCapital.selectedIndex].value;
  getAttractions(selected_value);
  localStorage.setItem("currentCity", selected_value); //store current selected city in localStorage object
}

//create function that renders the attractions list of last selected city onto page upon refresh
function init() {
  if (localStorage.currentCity) {
    getAttractions(localStorage.currentCity);
    currentCityEl.textContent = localStorage.currentCity;
    currentCityEl.style.visibility = "hidden";
    buttonEl.style.visibility = "visible";
  }

  else {

  }

}