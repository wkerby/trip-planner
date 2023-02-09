var requestUrl = "https://restcountries.com/v3.1/all";

const select = document.getElementById("dropdown");
const xhttp = new XMLHttpRequest();
const flag = document.getElementById("flag");

let countries;

xhttp.onreadystatechange = function() {
  console.log('this.status', this.status);
  if (this.readyState == 4 && this.status == 200) {
    countries = JSON.parse(xhttp.responseText);
    assignValues();
    handleCountryChange();
  }
};
xhttp.open("GET", "https://restcountries.com/v3.1/all", true);
xhttp.send();

function assignValues() {
  countries.forEach(country => {
    const option = document.createElement("option");
    console.log('country',country)
    option.value = country.cioc;
    option.textContent = country.name.common;
    select.appendChild(option);
  });
}

function handleCountryChange() {
  const countryData = countries.find(
    country => select.value === country.alpha2Code
  );
  flag.style.backgroundImage = `url(${countryData.flag})`;
}

select.addEventListener("change", handleCountryChange.bind(this));


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