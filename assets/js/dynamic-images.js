// ******************************************************************************************
//
// File name: dynamic-images.js
// Author: Fabian Flores
// Date: March, 2018
// Description: Implements GifTastic application, dynamically fills page with gif images
//   based on user input. Makes use of the GIPHY API.
//
// ******************************************************************************************


 $(document).ready(() => {
  console.log("in document ready");

  // --------------------------------------------------------------------------------------
  // resetOtherClickCounts() sets unclicked topic names' click count back to zero
  //
  function resetOtherClickCounts(tName) {
    for (const gifTopic of topicsList) {
      if (gifTopic !== tName) {
        topicsClickCounts[gifTopic] = 0;
        $("#btn-" + gifTopic).attr("click-count", 0);
      }
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
    favImg.addClass("show-favorite img-fluid");

    $("#favorites-list").prepend(favImg);
  }

  // --------------------------------------------------------------------------------------
  // addToFavorites() adds selected image to favorites section
  //
  function addToFavorites() {
    var giphyImgID = $(this).attr("giphy-img-id"),
        queryURL = GIPHYAPIID + giphyImgID + GIPHYAPIIDSUFFIX,
        result;

    console.log("in addToFavorites()");
    favList.push(giphyImgID);
    localStorage.setItem("gifTasticFavorites", JSON.stringify(favList));

    $.ajax({
      "method": "GET",
      "url": queryURL
    }).then((response) => {
      // console.log(response);
      result = response.data;
      console.log(result);
      renderFavs(result);
    });
  }

  // --------------------------------------------------------------------------------------
  // pauseImgEffect() toggles between "still" and "animate" data-states
  //
  function pauseImgEffect() {
    var animatedURL = $(this).attr("data-animate"),
        stillURL = $(this).attr("data-still"),
        state = $(this).attr("img-state");

    console.log("Image state: " + state);
    console.log("Animated URL: " + animatedURL);
    console.log("Still URL: " + stillURL);

    // If data-state equals still, then the animated gif is activated and the "data-state"
    // attribute is switched to "animate". Otherwise, if the "data-state" is set to "animate",
    // the still image reappears, and the "data-state" is switched back to "still."
    if (state === "still") {
      $(this).attr("src", animatedURL);
      $(this).attr("img-state", "animate");
    } else {
      $(this).attr("src", stillURL);
      $(this).attr("img-state", "still");
    }
  }

  // --------------------------------------------------------------------------------------
  // renderImgs appends the topic related imgs to the dom
  //
  function renderImgs(data, nClicks) {
    var figImg,
        figCapBtm,
        figCapTop,
        figFavBtn,
        spanFav,
        img,
        ratingClass,
        htmlText,
        index;

    // clear page of prior images if it is a 'newly selected' topic
    if (nClicks <= 1) {
      $("#topic-images").empty();
    }

    console.log("in renderImgs() -- data: " + data);
    for (index = 0; index < data.length; index++) {
      // create img tag
      figImg = $("<figure>");
      figCapTop = $("<figcaption>");
      figCapBtm = $("<figcaption>");
      img = $("<img>");
      console.log("Title: " + data[index].title);

      // add src and alt attributes to image, and custom attribute img-state
      img.attr("src", data[index].images.fixed_height_still.url);
      img.attr("alt", data[index].title);
      img.attr("img-state", "still");

      // add data-still and data-animate attributes to store respective image urls
      img.attr("data-still", data[index].images.fixed_height_still.url);
      img.attr("data-animate", data[index].images.fixed_height.url);

      // add image id value for favorites section
      img.attr("giphy-id", data[index].id);
      console.log("image id: " + data[index].id);

      // add gif class, which will later enable toggling still and animated state
      // img-fluid leverages bootstrap 4's image responsiveness
      img.addClass("gif-image img-fluid");

      // set figImg width to img width so img does not have to take up whole row
      figImg.attr("width", data[index].images.fixed_height_still.width);

      // add caption to image
      switch (data[index].rating) {
        case "g":
          ratingClass = "rated-g";
          break;
        case "pg":
          ratingClass = "rated-pg";
          break;
        default:
          ratingClass = "rated-none";
          break;
      }
      // title of gif image
      if (data[index].title !== "") {
        htmlText = "<span class=gif-title>" + data[index].title.toUpperCase() + "</span>";
        figCapTop.html(htmlText);
      }
      htmlText = "";
      // add an attribute that id's the image via giphy's id, such as still, and an fav-button class
      // on clicking this class, listen for this.thumbnail image...this-still, and this-animate
      // later add this image to favorites section... add to the favorite_list array
      htmlText = "<span class=" + ratingClass + ">Rating: " + data[index].rating + "</span>";
      spanFav = $("<span>");
      figFavBtn = $("<button>");
      figFavBtn.addClass("ml-3 fav-button");
      figFavBtn.attr("giphy-img-id", data[index].id);
      figFavBtn.html("Add to &#x2605;");

      // htmlText += "<span><button class=\"ml-3 fav-button\">Add to &#x2605;</button><span>";
      spanFav.append(figFavBtn);

      figCapBtm.html(htmlText);
      figCapBtm.append(spanFav);
      figImg.append(figCapTop, img, figCapBtm);

      // append to DOM's "#topic-images"
      $("#topic-images").prepend(figImg);
    }
  }

  // --------------------------------------------------------------------------------------
  // Function for dumping the JSON content for each button into the div, the click
  // count for each topic determines at which offset to begin the query.
  //
  function displayTopicImgs() {
    var topicName = $(this).attr("data-name"),
        topicClicks = parseInt($(this).attr("click-count")),
        queryURL,
        result;

        queryURL = GIPHYURL + topicName + GIPHYSUFFIX + (topicClicks * GIPHYLIMIT).toString();
        // increment click count for 'this' topic and update "click-count" accordingly
        topicsClickCounts[topicName]++;
        // console.log("Array topicsClickCounts: " + topicsClickCounts[topicName]);
        $(this).attr("click-count", topicsClickCounts[topicName].toString());
        // console.log("click-count for " + topicName + " is: " + topicsClickCounts[topicName]);

        // reset other topics' click-count to zero
        resetOtherClickCounts(topicName);

        console.log("in displayTopicImgs() queryURL: " + queryURL);
      $.ajax({
        "method": "GET",
        "url": queryURL
      }).then((response) => {
        console.log(response);
        result = response.data;
        renderImgs(result, topicsClickCounts[topicName]);
      });

  }


  // --------------------------------------------------------------------------------------
  // handles when a topic is entered in the input text field and submitted
  //
  $("#add-topic-btn").on("click", (event) => {
    var currentTopic;

    event.preventDefault();

    // grabs the input from the topic textbox
    currentTopic = $("#topic-input").val().
                    trim();

    // make sure something is entered and not repeat iteam
    if (currentTopic !== "" && topicsList.indexOf(currentTopic) === -1) {
      // The topic from the textbox input is added to array
      topicsList.push(currentTopic);

      // initialize click counts to 0, note that the subscript of this array is not
      // a number but the actual topic
      topicsClickCounts[currentTopic] = 0;

      // Adding new topic to local storage
      localStorage.setItem("gifTasticTopics", JSON.stringify(topicsList));

      // call to insertButtons to process topics list buttons
      insertButtons();
    }

    // clear input field
    $("#topic-input").val("");
  });


  $(document).on("click", ".topic", displayTopicImgs);

  // $(".gif-image").on("click"..) enables the pausing-gifs effect. It toggles between a "still"
  // and "animated" data-state.
  $(document).on("click", ".gif-image", pauseImgEffect);

  // on clicking a .fav-button class button, the giphy image associated with that button is added
  // to the favorites section 
  $(document).on("click", ".fav-button", addToFavorites);

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

});