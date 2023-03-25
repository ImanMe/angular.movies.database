
# Movies App

**Movies.Api project is a .NET Core API** this project was built with .NET 5, contains all endpoints needed to build a full Movies Database frontend app.
* Swagger documentation for all the available endpoints can be found here: https://localhost:5001/swagger/index.html

**Movies.App project is a frontend Angular app** This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2. The app allows end users to search, rate and view upcoming movies in the theatre. There is also an Admin section for admins level permissions that allows admin to manage all aspects of the database content like movies, actors, users, theatres etc.

* Some routes are protected based on the authorization roles, logged in "end-users" are permitted to search and rate the movies while "admins" can manage the app.
 
> Database connection is already set in the appsettings.json, the database is already populated with fake data.

> There is Azure storage connection string available in the appsettings which you can utilize to store pictures if required in the challenge.

**Login details:**
- End user Account:
**username: user@moviesapp.com** / 
**password: Userpass@000**

- Admin Account:
**username: admin@moviesapp.com** / 
**password: Adminpass@000**

# Challenge

#### Challenge #1:
> As a user, 
I want to view a new feature button "**Add to watchlist**" below the summary section of the movie details page that saves the movie to my watch list. 
So that I can go to "**My Watchlist**" page later and view all the movies that I added to the watchlist.


#### Challenge #2:
> As a user, 
I want to see a new menu item on the top navigation bar called "My watchlist"
So that, I can view all the movies I had previously added to my watchlist.


#### Challenge #3:
> As an admin,
I want to be able to view a **full list of Actors** with their Full name, Date of birth and Small picture available in the movies database and be able to **Add/Update/Delete** the actors
So that I can manage the Actors in movies database. 

The project uses Angular material, but we **highly encourage you to use DevExtreme** controls for completing this challenge but is not mandatory. However, you get bonus points for using DevExtreme suite of controls.
* Instructions on add DevExtreme to the project (if you decide to use it): https://js.devexpress.com/Documentation/Guide/Angular_Components/Getting_Started/Add_DevExtreme_to_an_Angular_CLI_Application/#Install_DevExtreme

# Setup Instructions:
- **movies.api** - open the API folder in your VS code terminal or command line utility or Powershell and run the following commands:
`dotnet restore`
`dotnet build`
`dotnet run`

- **movies.app** - open the app folder in vs code terminal or command line utility and run the following commands:
`npm build`
`ng build`
`ng serve`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

If you do not have Angular CLI installed, you may have to run `npm install -g @angular/cli`
