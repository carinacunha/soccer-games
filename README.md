# Rank Soccer #
![alt app](soccer_1.png "screen app")
![alt app](soccer_2.png "screen app")

## About ##

In this project, the Back-End part of an informative website about football games was created! The project is fullstack and the integration between Back-end, Front-end and database is done using docker-compose.
The application consists of a ranking table of football teams, in which, through user validation via login, it is possible to query and change match data, insert new matches, finalize ongoing matches, consult the general classification and classification of teams in the home and away teams.

## Routes ##

1️⃣ User Routes:

* POST /login
  Responsible for registering the login and returning a user token.
* GET /login/validate
  Responsible for validating the login and returning the 'role' of the user.

2️⃣ Team Routes:

* GET /teams
  Responsible for returning teams registered in the DB.
* GET /teams/:id
  Responsible for returning teams registered in the DB through the ID.

3️⃣ Matches Routes:

* GET /matches
  Responsible for returning all matches.
* POST /matches/
  Responsible for registering a match in the DB. -PATCH /matches/:id
  Responsible for updating goas of a specific match
* PATCH /matches/:id/finish
  Responsible for updating the status of a match in progress to a finished match ('inProgress: false') in the DB.

4️⃣ Leader Routes:

* GET /leaderboard
  Responsible for returning the leaders of the championship (indoors or away from home).
* GET /leaderboard/home
  Responsible for returning the league leaders playing at home
* GET /leaderboard/away
  Responsible for returning the league leaders away from home

## Skills and Tools ##

* Application integration using Docker;
* Using environment variables;
* Write APIs using TypeScript, Node js. and Express;
* Develop the Back-end of the application using the MSC model;
* User authentication using JSON Web Token and bcryptjs;
* Create routes and apply middlewares;
* Use ORM Sequelize to CRUD the database;
* Use the Object Oriented Paradigm (OOP);
* Use the SOLID principle;
* Create integrated tests using Jest, Mocha, Chai and Sinon libraries;
* Use Docker to integrate the Full Stack application;

## Guidelines to runnig API ##

1. Clone the repository: ```git clone git@github.com:carinacunha/rank-soccer.git```
2. Navigate to the root of the repository: ```cd rank-soccer```
4. Install the dependencies: ```npm install ```
5. Navigate to app/: ```cd app/ ```
6. Initialize the Docker containers: ```np run compose:up:dev```
7. Run tests: ```npm run test```

**✨ This project was developed during the Full Stack Web Development course at Trybe**
