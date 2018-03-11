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
var topicsList = JSON.parse(localStorage.getItem("gifTasticTopics")),
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
    favList = [];
  }
}

// -------------------------------------------------------------------------------------
// insertButtons() places images stored in localStorage array in DOM.
function insertButtons() {
  // rtTopicList is a variable that represents the realtime topic image list within
  // the running GifTastic app
  var rtTopicList = JSON.parse(localStorage.getItem("gifTasticTopics")),
      gifTopic,
      tBtn;

  // clear prior topics list
  $("#topic-list").empty();

  // if no elements are present in rtImageList, it means that the localStorage object
  // gifTasticTopics is empty, so an empty array will be declared
  if (!Array.isArray(rtTopicList)) {
    rtTopicList = [];
  }

  console.log("in insertButtons()");
  // make the gif buttons
  for (gifTopic of rtTopicList) {
    console.log("current value: " + gifTopic);
    // Dynamically create button for each topic
    tBtn = $("<button>");

    // Adding a class of topic to button
    tBtn.addClass("topic topic-button mr-2 mb-2");
    // Adding a data-attribute
    tBtn.attr("data-name", gifTopic);
    // Providing the initial button text
    tBtn.text(gifTopic);
    // Adding the button to the buttons-view div
    $("#topic-list").append(tBtn);
  }
}

checkLocalStorage();
insertButtons();