# Feed Reader Testing

##### Overview

Udacity - Front-End Web Developer Nanodegree project. In this project were given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included `Jasmine` and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite.

## Getting Started

##### Live
**Go to** https://musaab-abdalla.github.io/frontend-nanodegree-feed-reader-testing

##### Locally

**1.** Clone this repo:

Clone the repo using Git:

```
git clone https://github.com/musaab-abdalla/frontend-nanodegree-feed-reader-testing.git
```

**2.** Open the application:

The tests were written in the `feedreader.js` file. The test results appears at the bottom of the `index.html` page.

```
$ open "http://localhost/frontend-nanodegree-feed-reader-testing/index.html"
```

Tests that are `green` have passed and `red` have failed.

## The Tests

##### Overview

**1.** `allFeeds` variable has been defined and not empty.<br />
**2.** Loops through each feed  in the `allFeeds` object and the URL is defined and not empty.<br />
**3.** Loops through each feed  in the `allFeeds` object and has a name defined and not empty.<br />
**4.** The menu element is hidden by default.<br />
**5.** Menu changes visibility when the menu icon is clicked. Does the menu display when clicked and does it hide when clicked again.<br />
**6.** When the `loadFeed()` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.<br />
**7.** When a new feed is loaded by the `loadFeed()` function that the content actually changes.