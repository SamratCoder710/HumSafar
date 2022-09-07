# YelpCamp
Yelpcamp is a Node js project created using Express framework. Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.The website can be used to add campground with 
various campground details like Title, Location, Price of Camping,Description, Images.User can register,create campgrounds and add reviews.

Application Link:-https://pacific-hollows-90749.herokuapp.com/

Heroku might discontinue free tier by October 2022.Attaching Screenshots for reference
![Homepage](https://user-images.githubusercontent.com/85514305/188799913-601d4e9d-cfbb-4193-8ab8-3fa5685c5b97.png)
![Campgrounds](https://user-images.githubusercontent.com/85514305/188799956-c1924b48-f6c5-41e7-88e6-aeed9b8f20c2.png)
![Campground_ShowPage](https://user-images.githubusercontent.com/85514305/188800202-4d6d9998-00c3-4f71-8a56-870f813e8991.png)
![NewCampground](https://user-images.githubusercontent.com/85514305/188800241-7ec2e9ef-f08e-4310-bb14-1e1389e2781d.png)
![editCampground](https://user-images.githubusercontent.com/85514305/188800071-d90d5608-3320-4925-a054-46e6ce834a4e.png)

## 💡Lessons Learned
-	First full-stack web application
-	Introduction to [Express.js](https://expressjs.com/)
-	Introduction to [MongoDB](https://www.mongodb.com/) database design
-	Introduction to [Bootstrap 5](https://getbootstrap.com/)
-	Optimizing performance, security
-	Deploying app to [Heroku](https://www.heroku.com/) and Database to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 🛠 Technologies
|Front-End	|Back-End	|Database	|Deployment		|
| ------- 	| ------ 	| ------ 	| --------		|
|HTML5	 	|Node.js 	|Mongoose	|Heroku	  		|
|CSS3	 	|ExpressJS	|MongoDB	|MongoDB Atlas	|
|Bootstrap 5	|EJS	  	|.		    |Cloudflare		|
|Javascript	|.		  	|.		    |Git	      	|

## ⚖️ Methodology
-	Used a [Model-View-Controller (MVC)](https://martinfowler.com/eaaDev/uiArchs.html#ModelViewController) [Monolithic Architecture](https://www.youtube.com/watch?v=qYhRvH9tJKw) since it's the most simple architecture to gain an introduction to full-stack web development. Building a MVC Monolith allows one to gain a perspective on the range of achitectures, particularly the lower-end of the range. The Monolith Architecture falls short in scalability and separation of front-end and back-end. The MVC Architecture falls short when the application begins to grow in complexity with the addition of services that could stand on thier own. The MVC Architecture is [perhaps best used for simple proof-of-concept projects](https://www.youtube.com/watch?v=rckfN7xFig0), like this one.
-	Developed and maintain the app in heroku .
-	[Bootstrap 5](https://getbootstrap.com/) as the CSS framework to keep the UI simple and quick to build. Since the website takes a performance hit for loading Bootstrap, took full advantage of advanced Bootstrap features such as [custom validation](https://getbootstrap.com/docs/5.0/forms/validation/) for all forms and [animated form input](https://getbootstrap.com/docs/4.0/examples/floating-labels/) for the login and register pages.
-	[Express.js](https://expressjs.com/) as the Node.js application framework since it's a lightweight framework, which is ideal for gaining an understanding of how to build the backend from scratch. Compared to a framework like [Nest.js](https://nestjs.com/) or even [Django](https://www.djangoproject.com/), Express.js doesn't have many features out of the box.
-	[PassportJs](https://github.com/jaredhanson/passport) for the authentication and authorization.
-	NoSQL database for the flexibility compared to a SQL database, [MongoDB](https://www.mongodb.com/) in particular because of its prevalence in the industry.
-	[Embedded Javascript Templates (EJS)](https://ejs.co/) as the front-end templating language for more DRY code compared to plain HTML and for dynamic user-experiences. This is a simple templating language, similar to [Jinja](https://jinja.palletsprojects.com/en/3.0.x/) for Python. Both however fall short on front-end scalability, modularity, and performance compared to a framework like [React](https://reactjs.org/). Working with simple templating languges helps to remind me the benefits of working with a framework like React.
-	[Heroku](https://www.heroku.com/) as the cloud hosting provider to gain experience with PaaS. Since I'm using the free tier, which normally causes the application to sleep after 30 minutes of inactivity, the application is kept awake from 6:00 a.m. to 11:59 p.m. PST with [Kaffeine](https://kaffeine.herokuapp.com/).

## ⚙️ Features
-	Login, sign-up, Admin role
-	RESTful routes (Create, Read, Update, Delete) for campgrounds, comments, and reviews
-	Create and Update forms have both client-side and server-side validation
-	Create routes have authentication
-	Update, and Delete routes have authentication and authorization



## 🚀 Getting Started
### To run this project on your system:
Create an .env file and add values to the following variables:
```
CLOUDINARY_CLOUD_NAME
CLOUDINARY_KEY
CLOUDINARY_SECRET
DB_URL
```
Make sure you have [MongoDB](https://docs.mongodb.com/manual/installation/) installed on your system
In a terminal window, initialize a MongoDB Database 
```
$ ./mongod
```
In a second terminal window, access the MongoDB Database with Mongoose
```
$ mongoose
```
In a third terminal window, install dependencies using npm:

```
$ npm install
```
And then run the application with
```
$ npm start
```
or for hot reloading (recommended)
```
$ nodemon app.js
```

## 📐 Tests
The integration tests using [Jest](https://jestjs.io/) test the creation of data, the functionality of the schema, and the functionality of the validation. The tests are iterated over each of the models: campgrounds, comments, reviews, users.
To run the tests:
```
$ npm test
```

## 📣 Acknowledgments
-	The skeleton of this project was based on [Colt Steele's YelpCamp](https://github.com/Colt/yelp-camp-refactored) during the Web Development Bootcamp.

## Contribute 

Contributions,Feedback,Suggestions are always welcome!
