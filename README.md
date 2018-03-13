# GifTastic
Utilizes GIPHY API to make a dynamic web page.

### Description

The GifTastic project utilizes the GIPHY API to display images according to topics that the
user creates. GifTastic's user interface consists of `topic-input` field that the user submits.
Then the topic buttons are displayed; on clicking a topic, gif images associated with the
selected them are shown. When the user clicks an image, the gif should animate. A user can also
add a gif of his or her choice to the favorites section.

### Approach

To format the display, I leveraged the Bootstrap 4 library. This app is mobile responsive. 

To receive the image data from the GIPHY API, I created a `displayTopicImgs()` function which
gets triggered when a `topic-button` is clicked. Inside this function, an `.ajax` request is
made. The returned image data is then sent to the `renderImgs` function, which is responsible
for displaying the gif images.

For the data structures of the app, I used a localStorage arrays to store the topics and 
favorite gifs. This allows for the topics to persist. The user also has the option to erase 
the topics by selecting the `Clear Topics` button. To implement the 'add more images' feature 
when a user clicks a `topic-button`, I used a global array to store `clickCounts` for each 
topic. The `clickCounts` variable determines which `offset` to use in the GIPHY API request URL. 

The `pauseImgEffect()` function handles the `gif` image animation effect.


### File Structure

`index.html` contains the basic skeleton structure for the app, and the `id` tags, which the 
`javascript` files will later use. Most of the bootstrap implementation (which includes a modal
and a responsive navbar) are located in `index.html`.

The custom style sheet is located in the `assets\css` folder. Two javascript files are in the
`assets\js` folder, `dynamic-images.js`, which contains the GIPHY API and the gif display 
functions, and `globals.js`, which stores the global variables and functions.


### Comments

The GifTastic app was added to my github profile's portfolio:
[f-flores portfolio](https://f-flores.github.io/portfolio.html).