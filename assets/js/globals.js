// *************************************************************************************
//
// File name: globals.js
// Description: Contains global variables and functions for GifTastic project.
//
// *************************************************************************************

// **************************
// Global constants
// **************************
const GIPHYLIMIT = 10,
      GIPHYKEY = "zOxVha9Ha82FHhEMPSbIBvoOOApcLrBK",
      GIPHYURL = "https://api.giphy.com/v1/gifs/search?api_key=" + GIPHYKEY + "&q=",
      GIPHYSUFFIX = "&limit=" + GIPHYLIMIT.toString() + "&offset=0&rating=G&lang=en";

// grabs the localStorage object in the *global* topicsList 'array' in parsed format
var topicsList = JSON.parse(localStorage.getItem("giftasticTopics")),
    favList = JSON.parse(localStorage.getItem("gifTasticFavorites")),
    topicsArray = ["cat","dog","dolphin","hamster","hen","parakeet"];

// -------------------------------------------------------------------------------------
// checkLocalStorage() checks if gifTasticTopics and gifTasticFavorites exist
// in localStorage and if they are an array;
// if they do not already exist then array is initialized to an empty array
function checkLocalStorage() {
  if (!Array.isArray(topicsList)) {
    topicsList = [];
  }
  if (!Array.isArray(favList)) {
    topicsList = [];
  }
}

// -------------------------------------------------------------------------------------
// insertImages() places images stored in localStorage array in DOM.
function insertImages() {
  console.log("in InsertImages()");
}


// Function for displaying topic data
function renderButtons() {
  var index,
      btn;

  // Deleting the buttons prior to adding new topics
  // so we don't have repeat buttons
  $("#topic-list").empty();

  // Looping through the array of movies
  for (index = 0; index < topicsArray.length; index++) {

    // Dynamically create button for each topic
    btn = $("<button>");

    // Adding a class of topic to button
    btn.addClass("topic topic-button mr-2 mb-2");
    // Adding a data-attribute
    btn.attr("data-name", topicsArray[index]);
    // Providing the initial button text
    btn.text(topicsArray[index]);
    // Adding the button to the buttons-view div
    $("#topic-list").append(btn);
  }
}

checkLocalStorage();
insertImages();
renderButtons();