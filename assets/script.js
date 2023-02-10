


//----------------------------------Country Dropdown------------------------------------------------------

var fetchButton = document.getElementById('fetch-button');
var select = document.getElementById("dropdown");
var menu = document.getElementById('selection');

let countries;


function getApi() {

  var requestUrl = "https://restcountries.com/v2/all?fields=name,capital";

  fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.textContent = data[i].capital
        select.appendChild(option);
      }
    })
    
    menu.classList.remove('hide');
  }

fetchButton.addEventListener('click', getApi );

//----------------------------------Departing Flights Table------------------------------------------------------

const tableBody = document.getElementById("table-body")

let flights = [
  {
    time: "08:11",
    destination: "OMAN",
    flight: "OX 203",
    gate: "A 01",
    remarks: "ON TIME"
    },
  {
    time: "12:39",
    destination: "LONDON",
    flight: "CL 320",
    gate: "C 31",
    remarks: "CANCELLED"
    },
  {
    time: "13:21",
    destination: "DUBAI",
    flight: "DXB 201",
    gate: "A 19",
    remarks: "CANCELLED"
  },
  {
    time: "14:01",
    destination: "FRANKFURT",
    flight: "FR 402",
    gate: "B 02",
    remarks: "ON TIME"
  },
  {
    time: "15:22",
    destination: "TOKYO",
    flight: "TK 211",
    gate: "A 32",
    remarks: "DELAYED"
  }
]

function populateTable () {
  for (const flight of flights) {
    const tableRow = document.createElement("tr")

    for( const flightDetail in flight) {
      const tableCell = document.createElement("td")
      const word = Array.from(flight[flightDetail])

      for (const [index, letter] of word.entries()) {
        const letterElement = document.createElement('div')

        setTimeout(() => {
        letterElement.classList.add('flip')
        letterElement.textContent = letter
        tableCell.append(letterElement)
        }, 100 * index)

      }
      tableRow.append(tableCell)
    }
    tableBody.append(tableRow)
  }
}

populateTable()

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


// API
function getCityID(city) {
  // var city = document.querySelector("option").textContent;
  var fetchUrl = "https://travel-advisor.p.rapidapi.com/locations/search?query=" + city + "&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US"

  var apiOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b7e094d3c2msh52a7cd5d6c4a551p1d89aejsn6732427ea5d2',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };

  fetch(fetchUrl, apiOptions)
    .then(function (response) {
      console.log("Response: " + response.status);
      return response.json();
    })
    .then(function (data) {
      console.log("We are here");
      for (var i = 0; i < data.data.length; i++) {
        var city_array = data.data
        if (city_array[i].result_type === "things_to_do") {
          var city_1 = city_array[i]
          console.log(city_1.name);
        }
      };
    });

}

getCityID("pattaya");