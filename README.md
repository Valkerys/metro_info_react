# `metro_info_react` - Target Metro Project

## Table of Contents

- [`metro_info_react` - Target Metro Project Interview](#metro_info_react)
    * [Overview](#overview)
    * [Default Create-a-React-App Documentation](#default-create-a-react-app-documentation)
        + [Available Scripts](#available-scripts)
            - [`npm start`](#npm-start)
            - [`npm test`](#npm-test)
            - [`npm run build`](#npm-run-build)
            - [`npm run eject`](#npm-run-eject)
        + [Learn More](#learn-more)
    * [Assumptions](#assumptions)
    * [Limitations](#limitations)

## Overview

The goal is to create a new react-app, where we use the current Metro System API Endpoints to recreate a webpage that contains buses route infomation.

## Default Create-a-Creat-App Documentation

<details>
<summary>CRA</summary>

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

### Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Assumptions

- The first assumption was that an user should be able to navigate to a link wheter it has a complete URL or not as well as not having a correct URL. Per example if an user navigates to the URL that has the Route ID, Direction ID and Stop Label, the data should get fetched with the given IDs and data displayed, with the ability to change to another route, direction or stop as well. 
- My next assuption was if an user has an URL with a correct Route ID but a bad Direction ID, the page should fetch that Route data and set it but ignore the bad direction ID.
- Another assumption was the routing to always redirect to the metroRoutes path and then add on any more info if needed. Therefore this page would always display but this can easily be change with a given home page. Per example a home page that could include an information center, map or other form of Route data fetching. Therefore create a /metroHome path and make it the default if the URL is not recognizable.
- I also made the assumption of this application being used in mobile format therefore the layout changes based on that. But doing a max of 360px for the smallest screen size. 
- The application was also made decently accessible as tabbing works fully so the app is somewhat WCAG complient. Unfortunately creating Aria Labels that match the options to stop info was not done because of time constraints.

### Limitations

- I ran into problems running the jest tests as it does not like the import of things such as axios when rendering in the jest test. I have only done a small amount of jest testing on my own free time as in the company I currently work for has QA create all the automation tests. I have not encounter this issue before and all the remedies online did not help. I can discuss this further.
- There are fine tuning left on this app because as functional and interactive as it is, there are small details that make the page more enjoyable to use. Things that an user might never notice but would enjoy if given to them, per exaple: The drop down menu, in the scrollable part, adding a shadow at the bottom of the box to indicate that there is more options or a button arrow to further go down and explore the options. Loading spinners, animation transitions and more styling and logic to make the app seem seamlessly even when running on a very slow API endpoint.

</details>
