## Twitter Followers
This project uses Twitter OAuth for authentication and displays the list of Twitter followers in grid view. 

### Tools/Technologies used
* React
* Redux
* Redux Saga
* Bootstrap 4
* Reselect
* ImmutableJS
* SCSS

### Running the application in development environment
Twitter API's are not allowed to be called directly from browser due to CORS issue. So open the Chrome browser in CORS disabled mode to run the application.

* Run `npm start` to start the application.
* To avoid [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issue in local environment, open the browser with web security disabled.
  * **Windows**: Close all running instances of `Chrome` and open command prompt and run, <br />
      `[PATH_TO_CHROME]\chrome.exe" --disable-web-security --user-data-dir=~/chromeTemp`
  * **Linux**: Open terminal and run, <br />
      `google-chrome --disable-web-security`
  * **OSX**:
      `open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`
  * **Useful Links**
    * [Run Chrome browser without CORS](https://alfilatov.com/posts/run-chrome-without-cors/)
    * [Fix Cross Origin Request Security (CORS) error in Firefox, Chrome and IE](http://testingfreak.com/how-to-fix-cross-origin-request-security-cors-error-in-firefox-chrome-and-ie/)    
* Go to `http://127.0.0.1:5000/` to view the application. Do not use `localhost` to access the application, use only `http://127.0.0.1:5000/`, this is due to problem with Twitter calling localhost in OAuth callback.

### Pages
* `http://127.0.0.1:5000/` - entrypoint to application, fetches OAuth request token from Twitter and redirect to Twitter Authorization page
* `http://127.0.0.1:5000/callback` - callback page called from Twitter after user Authorization
    * Parses access token and set in Redux store for further reference
    * Redirect user to followers list page on successfull OAuth response from Twitter
* `http://127.0.0.1:5000/followers` - Lists followers in grid view

### Working: 
* Generate OAuth request token from Twitter.
* Redirect user to Twitter Authorization/Login Page to authorize the App and get access token.
* User gets redirected back to our app with access token in callback URL.
* Access token is parsed from callback URL and set in Redux store for making further API calls.
* Make API call with access token to list of followers.
* User can sort the followers list by name, which will be only withing the list already fetched as Twitter doesn't expose any APIs to fetch followers in sorted order.
* It will be maximum 8 followers in each request, user can see more records using Previous and Next buttons at the bottom of the page.