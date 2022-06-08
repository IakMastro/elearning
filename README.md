# elearning

A full stack platform developed for a uni class.

## Requirements

* Docker
* Docker-compose

## Features

* Student can access classes, participate in tests and download files
* Basic student statistics for each test the student gives
* Full modular system that is easily expandable

### Partially implemented

* Professor can add new classes, files and tests on the system
* A rating system that students can vote if they liked the class
* A register system that a user could use to sign up either as a student or a professor

### Potential TODOs

* Integration with a oauth2 server
* More complex algorithm for the student's statistics
* Different Dockerfiles for deployment on a production server
* Better UI/UX
* Full CI/CD integration

## Technologies used

* VueJS and Electron (frontend)
* ExpressJS (MainAPI, works like a middleware on most endpoints)
* Gin/Golang (UsersAPI)
* Flask/Python (StatisticsAPI, also has installed Numpy and Pandas for the future)

## Contribute

Feel free to add whatever you think will improve the project on the future :) !
Always open for Open Source and PRs.
