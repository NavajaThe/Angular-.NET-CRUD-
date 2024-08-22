# Angular .NET CRUD 


# CRUD App with Angular 14, .NET API, and MySQL (Dockerized)

This project demonstrates how to build a simple CRUD (Create, Read, Update, Delete) application using Angular 14 as the frontend, a .NET 8 Web API as the backend, and MySQL as the database. The entire setup is containerized using Docker for easy development and deployment.

## Project Structure

* **Frontend (Angular 14)**
    * `src/app`
        * `components`
            * `movie-list` 
            * `movie-create` 
            * `movie-edit`
            * `director-list`
            * `director-create`
            * `director-edit`
        * `models`
            * `Movie_Model.ts`
            * `Movie_Up_Model.ts`
            * `Director_Model.ts`
        * `services`
            * `movie.service.ts`
            * `director.service.ts`
        * `app-routing.module.ts`
        * `app.component.html`
        * `app.component.ts`
        * `app.module.ts`
* **Backend (.NET 8 Web API)**
    * `Controllers`
        * `MoviesController.cs`
        * `DirectorsController.cs`
    * `Data`
        * `ApplicationDbContext.cs`
    * `Models`
        * `Movie.cs`
        * `Director.cs`
    * `Program.cs`
    * `appsettings.json`
* **Docker**
    * `mysql/Dockerfile`
    * `API/Dockerfile`
    * `docker-compose.yml`

## Prerequisites

* Node.js and npm
* Angular CLI (`npm install -g @angular/cli`)
* .NET 8 SDK
* MySql 9.0.1
* Docker and Docker Compose

## Setup

1. **Clone the repository:**

   ```
   git clone https://github.com/NavajaThe/Angular-.NET-CRUD-
   ```
   
2. **Set up the docker project:**


Run the application using Docker Compose

Navigate to the root directory of your project in Angular .NET CRUD file

* Run the following command:
    ```
    docker-compose up -d --build
    ```

## If you want you can make everything manual you could also:

2. **Navigate to the project directories**

* Frontend:
    ```
    cd FrontCRUD 
    ```

* Backend:
    ```
    cd API 
    ```

3. **Install dependencies**

* Frontend:

    ```
    npm install
    ```

* Backend:

    ```
    dotnet restore
    ```

* Databse (MySql):


*   Create the database (if it doesn't exist already)
*   
    ```
    CREATE DATABASE IF NOT EXISTS Tester;
    ```
* Use the database
    ```
    USE Tester;
    ```
    
*   Create the 'Director' table

    ```
    CREATE TABLE Director (
        pkDirector INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        age INT,
        active BOOL 
    );
    ```
    
*    Create the 'Movies' table

    ```
    CREATE TABLE Movies (
        pkMovies INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        gender VARCHAR(50), 
        duration VARCHAR(500),  -- Changed to VARCHAR(50)
        fkDirector INT,
        FOREIGN KEY (fkDirector) REFERENCES Director(pkDirector)
    );
    ```

## This will build and start the MySQL, .NET API, and Angular containers.


## Access the Application

* Frontend: Open your web browser and go to http://localhost:4200
* Backend API: You can access the API endpoints at http://localhost:5095.
* MySql: You can access the DB endpoints at http://localhost:3636.

## Key Features
* Movie CRUD:
    * List all movies with their directors.
    * Add new movies.
    * Edit existing movies.
    * Delete movies.
* Director CRUD:
    * List all directors.
    * Add new directors.
    * Edit existing directors.
    * Delete directors (with checks for associated movies).
