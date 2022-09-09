#Instructions
To run this app you need to type these commands "npm install" and "npm run dev".
To gain bonus points I have been working with SASS/SCSS instead of the CSS. The why SASS work is that upon running the "dev" command "scss" command is also being run. SCSS code is compiling from the /public/scss/style.scss to the /public/css/main.css file.
I have been also using the BEM rules for class names.

For the loading icon, I have used Lottie animations. (I have added a 1000ms timeout for the loading icon because otherwise, you wouldn't be able to see it).

#How the app works
Upon loading the document on the website I am fetching the data from the data.json sorted it based on order property and stored it in the variable "collectedData". After that, I am creating radio buttons for each object in the data.json. 

setActiveItem -  function takes two parameters id of the object and also the array of objects "collectedData". The job of the function is to upon clicking on the radio button fetch the data from the "collectedData" to the right DOM elements.

For the app, I have set the maxim width for the mobile to 450px (The reason for that is since the breakpoint is 800px and the image height is 150px on mobile, most of the image is invisible )
For the font, I was using "sans-serif" since it was a close resemblance to the mockups.

#Added modules
I have also installed "concurrently" - (npm install -g concurrently). Concurrently allows users to run multiple commands "run server and scss" at the same time. There is a default way for this with just writing commands next to one another in package.json -> dev, but "concurrently" is a much safer option since with the standard option if one process fails, others still keep running and you won't even notice the difference. Concurrently will on the other hand kill all the processes if one fails.