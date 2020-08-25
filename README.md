# Revature Task Force Application

## Motivation

Everybody is busy in todays world, so tracking your everyday tasks is a crucial tool in productivity. With Revature Task Force, we have made it easy for users to manage their tasks. Users can see all tasks and find specific tasks with ease with a filter/search feature. The User can also create new tasks, along with updating and deleting current tasks. Users can access this application via an interactive client-side single paged application hosted on an AWS S3 bucket and consumes a RESTful web service that provides business logic and access to a database.

## Objective

Design and implement a web-application to provide a reactive user experience with a to-do list API that we will be providing your groups.

## Requirements

### Users interaction

* View all tasks.
* Filter/search tasks.
* Create tasks.
* Select and view a singular task.
* Update existing task.
* Delete existing task.


### Deployment requirements

* Deployed on AWS S3
* Backend hosted on EC2
* CI/CD process for frontend (at least)

### Required Technologies

* Angular
* AWS EC2
* AWS S3 SDK
* Jenkins
* GitHub

## Possible Optional Requirements

* Extensive Front End Testing
* Full CI/CD for frontend and backend including deployment
* Plan a nationwide deployment focusing on speed + reliability using AWS
* Build out login functionality and secure your application
* Build out an extra interesting feature
* Automated reporting included in CI/CD pipeline

## Other information

### API Deployment

[API deployment guide](https://docs.google.com/document/d/1BSrA3L7Axk5RWrORKV11Drx0W8HdQNYP0s_rD3ZXS7Y/edit?usp=sharing)

```sh
sudo yum update
sudo yum install java-1.8.0-openjdk-devel
```

### Starting the API server

While on the detached screen run

```sh
java -jar todos-api-1.0.jar
```

# Standard Angular stuff

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Another section

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
