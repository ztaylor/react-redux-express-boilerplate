# React-Redux-Express boilerplate

A foundation for React/Redux/Express projects, with an Express server which both serves the React files and API requests.

Created by [Zachary Taylor](http://twitter.com/ztaylor) and :coffee:

---

### Libraries

* [React](http://reactjs.org): A JavaScript library for building user interfaces
* [Express](http://expressjs.com): Fast, unopinionated, minimalist web framework for Node.js
* [Redux](http://redux.js.org): A predictable state container for JavaScript apps
* [React Redux](https://github.com/reactjs/react-redux): Official React bindings for Redux
* [Redux Thunk](https://github.com/gaearon/redux-thunk): Middleware that allows for action creators that return a function instead of an action
* [React Router](https://github.com/ReactTraining/react-router): Declarative routing for React
* [Redux Form](https://redux-form.com/7.2.0/): The best way to manage your form state in Redux
* [Styled Components](https://www.styled-components.com): Use the best bits of ES6 and CSS to style your apps
* [prop-types](https://github.com/facebook/prop-types): Runtime type checking for React props and similar objects
* [ESLint](http://eslint.org): The pluggable linting utility for JavaScript and JSX

---

### Features

* An Express server setup which both serves the React app and API requests
* Example of an API call from the client to the server using Redux and Redux Thunk, rendering the results in the client
* React Router v4 configuration, navigating between pages, and showing a 'not found' page
* Uses Styled Components to describe component styles in JavaScript
* Hot reloading of both server and client changes
* Ready for production deploy to Heroku
* Example of importing static images in JavaScript
* ESLint configuration
* Google Fonts and Twitter Bootstrap v4 integration

---

### Quick Start

1. Clone this repo using `git clone --depth=1 https://github.com/ztaylor/react-redux-express-boilerplate.git`
2. Move to the appropriate directory: `cd react-redux-express-boilerplate`
3. Install dependencies in the project directory and in the `./client` directory: `yarn install && cd client && yarn install && cd ..`
4. Start the server from the project directory: `yarn dev`
5. Start the React app from the `./client` directory: `yarn start`

---

### Express and React

In this project Express both serves the React files and API requests.

In development, server requests from the React app are proxied to the server. Take a look at the `proxy` field in `./client/package.json` to see where this is set up.

In production (on Heroku), there is a `heroku-postbuild` step that builds the React app and puts it's output files in the `client/build` folder so Express can find them. Take a look at the `heroku-postbuild` script in `./package.json` to see where this is set up.

---

### Deploying to Heroku

This project is ready to be deployed to Heroku.

1. Heroku requires that your project has a Git repository. Create one, and commit the code:

```
$ git init
$ git add .
$ git commit -m 'Initial commit'
```

2. Make a Heroku account and install Heroku Toolbelt if you haven't already. On a Mac with Homebrew, use `brew install heroku`
3. From the project directory, run `heroku create`. Make note of the `herokuapp.com` URL that the 'create' command returns. This is the URL where your app will live. It will look something like `<word>-<word>-<number>.herokuapp.com`
4. Push the code to Heroku by running `git push heroku master`
5. When the deploy is finished, open your browser to the URL from step 3. It's alive!

---

### To Do

* Implement an example of Redux Form

---

### License

This project is licensed under the MIT license, Copyright 2018 Zachary Taylor. For more information see LICENSE.md.
