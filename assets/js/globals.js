// *************************************************************************************
//
// File name: globals.js
// Description: Contains global variables and functions for GifTastic project.
//
// *************************************************************************************

// grabs the localStorage object in 'array' parsed format
var topicsList = JSON.parse(localStorage.getItem("giftasticTopics"));

// -------------------------------------------------------------------------------------
// checkLocalStorage() checks if gifTastic exists in localStorage and if it is an array;
// if it does not already exist then it is initialized to an empty array
function checkLocalStorage() {
  if (!Array.isArray(topicsList)) {
    topicsList = [];
  }
}

// -------------------------------------------------------------------------------------
// insertImages() places images stored in localStorage array in DOM.
function insertImages() {
  console.log("in InsertImages()");
}

checkLocalStorage();
insertImages();