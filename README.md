# FinerVision Application

Simple Form Validation and Submission

Saves data to SQL database, when you print data after entering an id, navigate to the directory `cd data` to find the created file

---

### Prerequisites 

Make sure these prerequisites are installed on your system

* MySQL 8
* NodeJS
* Express
* Javascript
* React
* Redux

---

### Libraries

* [React](http://reactjs.org): A JavaScript library for building user interfaces
* [Express](http://expressjs.com): Fast, unopinionated, minimalist web framework for Node.js
* [Redux](http://redux.js.org): A predictable state container for JavaScript apps
* [React Redux](https://github.com/reactjs/react-redux): Official React bindings for Redux
* [Redux Thunk](https://github.com/gaearon/redux-thunk): Middleware that allows for action creators that return a function instead of an action
* [React Router](https://github.com/ReactTraining/react-router): Declarative routing for React
* [Styled Components](https://www.styled-components.com): Use the best bits of ES6 and CSS to style your apps
* [prop-types](https://github.com/facebook/prop-types): Runtime type checking for React props and similar objects
* [ESLint](http://eslint.org): The pluggable linting utility for JavaScript and JSX
* [AntDesign](https://ant.design/docs/react/introduce) A Front End Development Library

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

### Installation

1. Clone this repo using `git clone --depth=1 https://github.com/JamesBoadi/FinerVision_Application.git`
2. Move to the appropriate directory: `cd FinerVision_Application`
3. Install server and client dependencies: `yarn install-dev`
4. Start the application from the project directory: `yarn dev` or start the 
   React app on its own from the `./client` directory: `yarn start`

---   

### Connecting to the Database

This project was developed using MySQL 8, to connect to the database, navigate to the `.env` file and change the credentials

Navigate to the directory that contains the SQL files `cd stored_procedures`. These files can either be
run using a query engine, or a command line running SQL to perform actions like creating the database or granting permissions 

On UNIX systems, SQL scripts can be run using the following command

`mysql -u user -p < create_table.sql`

then

`mysql -u user -p 'user_info' < store_user_data.sql`

Make sure that the schema is created first and that all users have appropiate permissions

### Express and React

In this project Express both serves the React files and API requests.

In development, server requests from the React app are proxied to the server. Take a look at the `proxy` field in `./client/package.json` to see where this is set up.

---
