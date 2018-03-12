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
      GIPHYSUFFIX = "&limit=" + GIPHYLIMIT.toString() + "&rating=PG&lang=en&offset=";

// grabs the localStorage object in the *global* topicsList 'array' in parsed format
var topicsList = JSON.parse(localStorage.getItem("gifTasticTopics")),
    favList = JSON.parse(localStorage.getItem("gifTasticFavorites"));

// an array of object is created to store current giphy app's topic's and click counts
var topicsClickCounts = [];

//  localStorage.clear();

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
//
function insertButtons() {
  // rtTopicList is a variable that represents the realtime topic image list within
  // the running GifTastic app
  var rtTopicList = JSON.parse(localStorage.getItem("gifTasticTopics")),
   //   gifTopic,
      tBtn;

  // clear prior topics list
  $(".topic-list").empty();

  // if no elements are present in rtImageList, it means that the localStorage object
  // gifTasticTopics is empty, so an empty array will be declared
  if (!Array.isArray(rtTopicList)) {
    rtTopicList = [];
  }

  console.log("in insertButtons()");
  // make the gif buttons
  for (const gifTopic of rtTopicList) {
    console.log("current value: " + gifTopic);
    // Dynamically create button for each topic
    tBtn = $("<button>");

    // Adding an id attribute
    tBtn.attr("id", "btn-" + gifTopic);

    // Adding a class of topic to button
    tBtn.addClass("topic topic-button mr-2 mb-2");

    // Adding a data-attribute
    tBtn.attr("data-name", gifTopic);

    // set click count for gifTopic to 0 if it is undefined
    if (!topicsClickCounts[gifTopic]) {
      topicsClickCounts[gifTopic] = 0;
    }
    tBtn.attr("click-count", topicsClickCounts[gifTopic]);
    console.log("click-count for " + gifTopic + " is: " + topicsClickCounts[gifTopic]);

    // Providing the button text
    tBtn.text(gifTopic);
    // Adding the button to the buttons-view div
    $(".topic-list").append(tBtn);
  }
}

checkLocalStorage();
insertButtons();