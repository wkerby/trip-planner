
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

function getApi() {

  var requestUrl = "https://restcountries.com/v2/all?fields=name,capital";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
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

// const attractions = []

//create function that fetches city ID based off of city input
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
      // console.log("Response: " + response.status);
      return response.json();
    })
    .then(function (data) {
      var counter = 0;
      for (var i = 0; i < data.data.length; i++) {
        if (counter <= 4) {
          if (data.data[i].result_type === "things_to_do") {
            counter++;
            console.log(data.data[i].result_object.name);
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
  console.log(ulAttractionsEl.children);

}


var selectedCapital = document.getElementById("dropdown");

function setSelectedValue() {
  var selected_value = selectedCapital.options[selectedCapital.selectedIndex].value;
  getAttractions(selected_value);
}



// //create fucntion that removes all child elements of a parent element
// function removeEls(someList) {
//   if (someList.children.length > 0) {
//     listItems = someList.children
//     console.log(listItems);
//     console.log("Current num list items: " + listItems.length);
//     for (var i = 0; i < listItems.length; i++) {
//       console.log(listItems.length);
//       someList.children[i].remove();
//     };
//   }

//   else {
//     console.log("no els to remove")
//   };
// };

