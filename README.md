# Ticketing-system

This repository contains a simple Ticketing system Api implemented using Express.js, Sequelize as the ORM, MySQL as the database, and Docker for containerization. The Ticketing Api provides endpionts to preform CRUD (Create, Read, Update, Delete) operations For User and Ticket models.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running app locally](#running-app-locally)
  - [Running with Docker Compose](#running-with-docker-compose)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [How to Test](#how-to-test)

## Technologies Used

- **Express.js** :
  In this project Express.js is used as a Node.js framework for building RESTful APIs, It is known for its simplicity and minimalistic approach, It provides a straightforward and intuitive way to build web applications and APIs.
  Also Express.js has a massive and active community makes it a reliable option for developers of varying skill levels.

- **Sequelize** :
  Sequelize as an Object-Relational Mapping (ORM) tool is used allowing to interact with MySQL database using JavaScript objects and methods. And this abstraction simplifies complex SQL operations, letting the focus to be on application's logic rather than database intricacies.

## Features

- For User
  - Create a new user.
  - Get a list of all users.
  - Get details of a specific user by ID.
  - Update user details.
  - Delete a user.
- For Ticket
  - Create a new ticket.
  - Get a list of all tickets.
  - Get details of a specific ticket by ID.
  - Update ticket details.
  - Delete a ticket.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional, for running with Docker)
- MySQL database

### Installation

1. Clone this repository:

```
git clone https://github.com/shooga12/Ticketing-system
cd ticketing-system
```

2. Install dependencies:

```
npm install
```

3. Configure the database connection:

Edit the ./config/db.config.js file to include your MySQL database credentials.

### Running app locally

```
npm start
```

The application should now be accessible at 'http://localhost:8080'.

### Running with Docker Compose

If you want to run the application using Docker Compose:

- To build the Docker container:

```
docker-compose up --build
```

- To remove the Docker container:

```
docker-compose down
```

The application should now be accessible at 'http://localhost:8080'.

## Usage

Once the application is up and running, you can use an API testing tool like Postman or curl to interact with the API endpoints.

### API Endpoints

User endpoints:

- `POST api/users` Create a new user.
- `GET api/users` Get a list of all users.
- `GET api/users/:id` Get details of a specific user by id.
- `PUT api/users/:id` Update user details.
- `DELETE api/users/:id` Delete a user.

Ticket endpoints:

- `POST api/tickets` Create a new ticket.
- `GET api/tickets` Get a list of all tickets.
- `GET api/tickets/:id` Get details of a specific ticket by id.
- `PUT api/tickets/:id` Update ticket details.
- `DELETE api/tickets/:id` Delete a ticket.

### Database

The MySQL database schema for this project includes a **user** table to store user information and **ticket** table to store ticket information.

**User Model attributes**
| Parameter | Value | Tags | Description |
| --------- |:----------:|:----------:| :------------------------------------------------------------------|
| name | String | `Required` | The user's name. |
| email |String | `Required` | The user's email. Email must be in proper format, Example: John@Company.com |
| role | String |`Required` | The user's role in the ticketing system. |

**Ticket Model attributes**
| Parameter |Value | Tags | Description |
| ----------- |:----------:|:----------:| :--------------------------------------------------|
| title | String | `Required` | The title of the ticket. |
| description | String | `Required` | The description of the ticket. |
| status | String | `Required` | The status of the ticket. |
| assignedTo | Integer | `Required` | An ID of the user which the ticket is assigned to. |

### How to Test

You can test this Ticketing Api with already generated test cases. You can run the tests as follows:

```
npm test
```
