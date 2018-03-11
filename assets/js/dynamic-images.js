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
 // const QuestionMaxTime = 30,
 //       AnswerShow = 8,
 //       BeginWait = 1.5;
  console.log("in document ready");

  // --------------------------------------------------------------------------------------
  // $(".gif").on("click"..) enables the pausing-gifs effect. It toggles between a "still"
  // and "animated" data-state.
  //
  // $(".gif-image").on("click", () => {
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
//  });

  // --------------------------------------------------------------------------------------
  // renderImgs appends the topic related imgs to the dom
  //
  function renderImgs(data) {
    var img,
        index;

    // clear page of prior images
    $("#topic-images").empty();

    console.log("in renderImgs() -- data: " + data);
    for (index = 0; index < data.length; index++) {
      // create img tag
      img = $("<img>");
      console.log("Title: " + data[index].title);

      // add src and alt attributes to image, and custom attribute img-state
      img.attr("src", data[index].images.original_still.url);
      img.attr("alt", data[index].title);
      img.attr("img-state", "still");

      // add data-still and data-animate attributes to store respective image urls
      img.attr("data-still", data[index].images.original_still.url);
      img.attr("data-animate", data[index].images.original.url);

      // add gif class, which will later enable toggling still and animated state
      // img-fluid leverages bootstrap 4's image responsiveness
      img.addClass("gif-image img-fluid");

      // append to DOM's "#topic-images"
      $("#topic-images").append(img);
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
  $(document).on("click", ".gif-image", pauseImgEffect);

});