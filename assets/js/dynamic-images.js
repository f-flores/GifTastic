// ******************************************************************************************
//
// File name: dynamic-images.js
// Author: Fabian Flores
// Date: March, 2018
// Description: Implements GifTastic application, dynamicall fills page of giphy images
//   based on user input.
//
// ******************************************************************************************


 $(document).ready(() => {
  console.log("in document ready");

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
  function renderImgs(data) {
    var figImg,
        figCap,
        img,
        index;

    // clear page of prior images
    $("#topic-images").empty();

    console.log("in renderImgs() -- data: " + data);
    for (index = 0; index < data.length; index++) {
      // create img tag
      figImg = $("<figure>");
      figCap = $("<figcaption>");
      img = $("<img>");
      console.log("Title: " + data[index].title);

      // add src and alt attributes to image, and custom attribute img-state
      img.attr("src", data[index].images.fixed_height_still.url);
      img.attr("alt", data[index].title);
      img.attr("img-state", "still");

      // add data-still and data-animate attributes to store respective image urls
      img.attr("data-still", data[index].images.fixed_height_still.url);
      img.attr("data-animate", data[index].images.fixed_height.url);

      // add gif class, which will later enable toggling still and animated state
      // img-fluid leverages bootstrap 4's image responsiveness
      img.addClass("gif-image img-fluid");

      // set figImg width to img width so img does not have to take up whole row
      figImg.attr("width", data[index].images.fixed_height_still.width);

      // add caption to image
      switch (data[index].rating) {
        case "g":
          figCap.html("<span class=\"rated-g\">Rating: " + data[index].rating + "</span>");
          break;
        case "pg":
          figCap.html("<span class=\"rated-pg\">Rating: " + data[index].rating + "</span>");
          break;
        default:
          break;
      }
      figImg.append(img);
      figImg.append(figCap);

      // append to DOM's "#topic-images"
      $("#topic-images").append(figImg);
    }
  }

  // Function for dumping the JSON content for each button into the div
  function displayTopicImgs() {
    var topicName = $(this).attr("data-name"),
        queryURL = GIPHYURL + topicName + GIPHYSUFFIX,
        result;

        console.log("in displayTopicImgs() queryURL: " + queryURL);
      $.ajax({
        "method": "GET",
        "url": queryURL
      }).then((response) => {
        console.log(response);
        result = response.data;
        renderImgs(result);
      });

  }


  // --------------------------------------------------------------------------------------
  // handles when a topic is entered in the input text field and submitted
  //
  $("#add-topic-btn").on("click", (event) => {
    var currentTopic;

    event.preventDefault();

    // grabs the input from the topic textbox
    currentTopic = $("#topic-input").val().trim();

    // make sure something is entered
    if (currentTopic !== "") {
      // The topic from the textbox input is added to array
      topicsList.push(currentTopic);

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

});