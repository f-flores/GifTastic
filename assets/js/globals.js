// *************************************************************************************
//
// File name: globals.js
// Description: Contains global variables and functions for GifTastic project. The
//   localStorage objects are defined in this file as well.
//
// *************************************************************************************

// **************************
// Global constants
// **************************
const GIPHYLIMIT = 10,
      GIPHYKEY = "zOxVha9Ha82FHhEMPSbIBvoOOApcLrBK",
      GIPHYURL = "https://api.giphy.com/v1/gifs/search?api_key=" + GIPHYKEY + "&q=",
      GIPHYSUFFIX = "&limit=" + GIPHYLIMIT.toString() + "&rating=PG&lang=en&offset=";

const GIPHYAPIID = "https://api.giphy.com/v1/gifs/",
      GIPHYAPIIDSUFFIX = "?api_key=" + GIPHYKEY;

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

// --------------------------------------------------------------------------------------
// renderFavs() renders a miniature favorite image in the Favorites section
//
function renderFavs(imgData) {
  var favImg = $("<img>");

  // miniature still gif

  favImg.attr("src", imgData.images.fixed_height_small_still.url);
  favImg.attr("alt", imgData.title);
  favImg.attr("giphy-img-id", imgData.id);
  favImg.attr("img-state", "still");
  favImg.attr("img-fixed-width", imgData.images.fixed_height_still.width);

  // add data-still and data-animate attributes to store respective image urls
  favImg.attr("data-still", imgData.images.fixed_height_still.url);
  favImg.attr("data-animate", imgData.images.fixed_height.url);

  // add image id value for favorites section
  favImg.attr("giphy-id", imgData.id);
  favImg.attr("giphy-title", imgData.title);
  favImg.attr("giphy-rating", imgData.rating);
  favImg.addClass("show-favorite img-fluid mb-2 mr-2");

  $("#favorites-list").prepend(favImg);

}

// -------------------------------------------------------------------------------------
// insertButtons() places images stored in localStorage array in DOM.
//
function insertButtons() {
  // rtTopicList is a variable that represents the realtime topic image list within
  // the running GifTastic app
  var rtTopicList = JSON.parse(localStorage.getItem("gifTasticTopics")),
      clearBtn = $("<button>"),
      clearImgs = $("<button>"),
      tBtn;

  // clear prior topics list
  $(".topic-list").empty();

  // if no elements are present in rtImageList, it means that the localStorage object
  // gifTasticTopics is empty, so an empty array will be declared
  if (!Array.isArray(rtTopicList)) {
    rtTopicList = [];
  }

  console.log("in insertButtons()");
  clearBtn.addClass("clear-button");
  clearImgs.addClass("clear-images");
 // clearBtn.addClass("delete-topics");
  clearBtn.text("Clear All Topics");
  clearImgs.text("Clear Images");
  clearBtn.addClass("ml-3 mb-2");
  clearImgs.addClass("ml-3 mb-2");
  // make the gif buttons
  for (const gifTopic of rtTopicList) {
    console.log("current value: " + gifTopic);
    // Dynamically create button for each topic
    tBtn = $("<button>");

    // Adding an id attribute
    tBtn.attr("id", "btn-" + gifTopic);

    // Adding a class of topic to button
    tBtn.addClass("topic topic-button ml-3 mb-2");

    // Adding a data-attribute
    tBtn.attr("data-name", gifTopic);

    // set click count for gifTopic to 0 if it is undefined
    if (!topicsClickCounts[gifTopic]) {
      topicsClickCounts[gifTopic] = 0;
    }
    tBtn.attr("click-count", topicsClickCounts[gifTopic]);
    console.log("click-count for " + gifTopic + " is: " + topicsClickCounts[gifTopic]);

    // Providing the button text
    // $(".topic-list").prepend(xBtn);
    tBtn.text(gifTopic);
    // Adding the button to topic-list section
    $(".topic-list").append(tBtn);
    $(".topic-list").append(clearImgs);
    $(".topic-list").append(clearBtn);
  }
}


// -------------------------------------------------------------------------------------
// insertFavorites() places favorite images stored in localStorage array in DOM.
//
function insertFavorites() {
  // rtFavList is a variable that represents the realtime favorites image list within
  // the running GifTastic app
  var rtFavList = JSON.parse(localStorage.getItem("gifTasticFavorites")),
      clearBtn = $("<button>"),
      queryURL;

  // clear prior favorites list
  $(".favorites-list").empty();

  // if no elements are present in rtImageList, it means that the localStorage object
  // gifTasticTopics is empty, so an empty array will be declared
  if (!Array.isArray(rtFavList)) {
    rtFavList = [];
  }

  console.log("in insertFavorites()");
  clearBtn.addClass("clear-favs-button");
  // clearBtn.addClass("delete-topics");
  clearBtn.text("Clear Favorites");
  // make the gif buttons
  for (const fImg of rtFavList) {
    console.log("current value: " + fImg);

    queryURL = GIPHYAPIID + fImg + GIPHYAPIIDSUFFIX;

    doGiphyAjaxCall(queryURL);

  }
  $("#favorites-list").append(clearBtn);
}

function doGiphyAjaxCall(qurl) {
  var result;

  $.ajax({
    "method": "GET",
    "url": qurl
  }).then((response) => {
    result = response.data;
    // console.log(result);
    renderFavs(result);
  });
}


checkLocalStorage();
insertButtons();
insertFavorites();

// clears topic buttons
$(document).on("click", ".clear-button", () => {
  localStorage.removeItem("gifTasticTopics");

  // manually remove elements from topicsList array
  while (topicsList.length >= 1) {
    topicsList.pop();
  }

  localStorage.setItem("gifTasticTopics", JSON.stringify(topicsList));
  $(".topic-list").empty();
  checkLocalStorage();
  insertButtons();
});

// clears favorite buttons
$(document).on("click", ".clear-favs-button", () => {
  localStorage.removeItem("gifTasticFavorites");

  // manually remove elements from topicsList array
  while (favList.length >= 1) {
    favList.pop();
  }

  localStorage.setItem("gifTasticFavorites", JSON.stringify(favList));
  $("#favorites-list").empty();
  checkLocalStorage();
  insertFavorites();
});