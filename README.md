# VApp
VAppNation Let's GOOOOOOOO! 

This will be the repo for our SFWR ENG 4G06 capstone project, affectionately named Vulnerability App or VApp for 
short. The group members for the project will be able to commit to the repo over the course of the year, and the project 
will go public in April 2019. 

## Final Presentation Slideshow
https://drive.google.com/open?id=1iK8ibjl5wICDxBloti1mOZN8J8dtteSV8cr895Le8fI

## Articles for Scoring Algorithm Derivation
https://drive.google.com/open?id=1Og0O5gTxoNhoH5C7YlyoZTDAEZljWYtgCRZ-FzXGadM

## Video Demo of Rev0
https://drive.google.com/file/d/1hMlly5w_-b42h_djI4QplboN3KWNIZEr

## How To Setup The Whole Thing Locally
1. Make sure you have [NodeJS](https://nodejs.org/en/) and MySQL (see How To Setup The Database -> Local Database -> Installation below) installed.
2. Open your terminal and navigate to a directory of your choice.
3. Clone the repository into that directory by running `git clone https://github.com/KevinHardy-Cooper/SFWRENG_4G06.git`
4. Obtain a copy (or create your own) `SensitiveInfo.json` file. See What Should Go In SensitiveInfo.json? below.
5. Create the database (see How To Setup The Database -> Local Database -> Getting Started below)
6. Start the local MySQL server: `mysql -u root -p` for Mac/Linux, `winpty mysql -u root -p` for Windows.
7. Run `npm install`
8. Run `npm start` to actually run the application.
9. Now you have a choice to make: You can use the client-side of the application via the server by visiting 
[http://localhost:3000/](http://localhost:3000/) or another endpoint of your choice on this port, or you can see the Vue.js
front-end by going to [http://localhost:8080/](http://localhost:8080/) or another endpoint of your choice on this port
 (note to set up this front-end server, to follow the README in the front-end/ directory).
10. All done!

## How To Setup The Database
### Local Database
#### Installation
1. Download [MySQL](https://www.mysql.com) for your respective machine. 
2. Follow their setup instructions in order to install it on your machine. 
#### Getting Started
1. Fire up the MySQL Server (there's usually a "Start MySQL Server" button somewhere).
2. Once the server is started, open up a command prompt and type `mysql -u root -p` which will then require your 
password. You may have to set up credentials so that you can use this command on your machine.
    * If you are using Git Bash for Windows, you may have to type `winpty mysql -u root -p`
3. The `mysql` prompt should now show up. Now type `create database VApp;`. This command will create the database that 
we will load the `database.sql` file into. I couldn't think of anything else to call the database :).
4. Now enter `exit`; We are now going to load the database from the `database.sql` file, so hopefully you remember the
path to that file. 
5. `mysql -u root -p VApp < full/path/to/database.sql`. Enter your password once more, and the console 
should freeze for a bit as it executes the SQL. 
    * If using Windows, to import the file:
        * Copy the `database.sql` file to `C:\Program Files\MySQL\MySQL Shell 8.0\bin\`
        * In Git Bash, type `winpty mysql -u root -p`
        * Enter your password
        * Type `use VApp;`
        * Type `source database.sql`
6. Now log in again and check if it worked: `mysql -u root -p` or `winpty mysql -u root -p` for Windows. Use  
`show databases;` and verify that VApp is there. 
7. `use VApp;`. We are selecting this database to use from hereon.
8. `show tables;`. You should see 7 tables (Implications, Score_Types, Scores,
Setting_States, Settings, Social Media, Users). 
9. Let's run a query on one to see if it filled correctly.
`select * from Score_Types;`. The query should return two records, `cumulative` and `twitter`. And that's it! 
10. Exit the prompt using `exit;`, and turn off the MySQL server if you are done using it (Look for the button that says 
"Stop MySQL Server", should be in the window where you started the server from).

NOTE:
If you have made change to a table, such as inserted Implications or Settings, export the database as an SQL file, 
 replace the `database.sql` with this file (also name it `database.sql`), and make a pull request on GitHub with the 
 updated file.

 ## Database Migrations
 To manage our database we will be using database migrations. This is pretty standard for web applications. This is the 
 basic idea: instead of manually updating the database (by using a tool like MySQL Workbench or having to run SQL queries 
 manually in the terminal) we can create migration scripts. These scripts will make the updates to the database for us 
 and they are very easy to use. Also, it will support upgrading and rolling back the database. For new developers, they 
 can simply import the database.sql file and run the migration command and be good to go.

 For an overview of how database migrations work in NodeJS, read [this](https://itnext.io/updating-an-sql-database-schema-using-node-js-6c58173a455a) article.

 We will be using [db-migrate](https://www.npmjs.com/package/db-migrate) and [db-migrate-mysql](https://www.npmjs.com/package/db-migrate-mysql). 
 You should install these packages globally for convenience by using the following command:

 `npm install -g db-migrate db-migrate-mysql`

 You will need to make sure have a `database.json` file. Simply copy the `database-sample.json` file, rename it to 
 `database.json` and edit the contents as necessary (or ask someone)!

 To update your database to the latest version, simply run:

 `db-migrate up`

 For more information on how to write scripts, refer to the [official docs](https://db-migrate.readthedocs.io/en/latest/API/SQL/).
 
## What Should Go In SensitiveInfo.json?
At this stage, there are only four fields, and each is required in order to make a database connection **currently**.

`"host" : ""` This will contain the host of the database we are using. For a local database, the host is `localhost`;

`"user" : ""` This will contain the user for the database we are using. For a local database, the user could be `root`,
or whatever you set up your local database user to be.

`"password" : ""` This will contain the password for the database we are using. For a local database, this is not your
computer password, but rather the password that you set up to be used for your local database.

`"database" : ""` This will contain the database name for the database we are using. For this project, we will be using 
`VApp`.

`"port" : ""` This will contain the database port for the database we are using. The default is `3306`.


`"consumer_key" : ""` This is one of the two keys required in order to use Twitter's APIs for our app. They are 
associated with Kevin's Twitter developer account and can be found there. More information can be found [here](https://themepacific.com/how-to-generate-api-key-consumer-token-access-key-for-twitter-oauth/994/).

`"consumer_secret_key" : ""` This is the other key required in order to use Twitter's APIS for our app. They are 
associated with Kevin's Twitter developer account and can be found there. More information can be found [here](https://themepacific.com/how-to-generate-api-key-consumer-token-access-key-for-twitter-oauth/994/).
        
`"callback_url" : ""` This is used to provide direction on where a user should go after signing in with their 
Twitter credentials. This callback url has been explicitly declared in the app's settings on Kevin's Twitter developer
account. More information can be found [here](https://developer.twitter.com/en/docs/basics/apps/guides/callback-urls.html).

`"cookie_signer" : ""` This is the secret used to sign the session ID cookie.

`"aes_password_key" : ""` This is the key that will be used in the one-way encryption of the user's password.

`"aes_email_key" : ""` This is the key that will be used in the one-way encryption of the user's email.

## Linting
`eslint src/` in order to find everything wrong code-style wise

`eslint src/ --fix` to fix what can be fixed automatically

## Testing
`npm test` in order to run unit-testing scripts on backend code
* note that these tests will fail since the SensitiveInfo parameter is out of date. Fix it, and the tests will run!

## Endpoints
All of these endpoints, requests, and responses can be found in detail at the Swagger [endpoint](http://localhost:3000/api-docs/) `/api-docs/` once you `npm start`.
### In Router
#### Static
`GET /` - Home page

`GET /dashboard` - Dashboard page

`GET /facebook` - Facebook input settings form page

`GET /instagram` - Instagram input settings form page

`GET /signin` - Sign in page

`GET /signup` - Sign up page

#### Settings
`GET /settings/{socialMedia}` - Settings page for given social media

`GET /implications/{socialMedia}/{settingName}/{settingState}` - Gets implications by setting state

`GET /implicationWeights/{socialMedia}/{settingName}` - Gets implication weights by setting name

`GET /instructions/{socialMedia}/{settingName}/{settingState}` - Gets instructions by setting state

`GET /user/settings/{socialMedia}` - Gets user's settings for given social media, either from OAuth or from a cookie

#### Registration
`POST /signup` - Sign up the user

`POST /signout` - Sign out the user

`POST /signin` - Sign in the user

#### Score
`GET /score/all/{sessionId}` - Get all scores for a user by a specific sessionId

`GET /score/recent/{sessionId}` - Get most recent scores by unique type by sessionId

`POST /score/{socialMedia}` - Inserts user's social media score

`GET /grade/{sessionId}/{socialMedia}` - Get grade for sessionId's most recent score given social media 


### In Connector
#### Access Social Media through OAuth
`GET /connect/:socialMedia` - Gateway for social media connections that require OAuth

`GET /oauth` - Start OAuth process 

`GET /oauth/callback` - Receives access tokens from Twitter

`GET /oauth/:socialMedia` - Requests Twitter login page

## Social Media, Settings, States Combinations

| Social Media  |Settings                  | States  |
| ------------- |-------------            | -----   |
| twitter       | discoverable_by_email   | true  |
|               |                         |   false   |
|               | geo_enabled             |    true   |
|               |                         |   false   |
|               | protected               |    true   |
|               |                         |   false   |
|               | use_cookie_personalization |    true   |
|               |                         |   false   |
|               | allow_dms_from          |    following   |
|               |                         |   all   |
| facebook      | future_posts            |    public   |
|               |                         |   friends   |
|               |                         |   friends_except   |
|               |                         |   only_me   |
|               |                         |   specific_friends   |
|               |                         |   custom   |
|               | friend_requests         |   everyone   |
|               |       |   friends_of_friends   |
|               | friends_list         |   public   |
|               |          |   friends   |
|               |          |   only_me   |
|               |          |   custom   |
|               | discoverable_by_email        |  everyone   |
|               |          |   friends_of_friends  |
|               |          |  friends   |
|               | discoverable_by_phone        |  everyone   |
|               |          |   friends_of_friends  |
|               |          |  friends   |
|               | discoverable_by_search_engine       |  yes   |
|               |          |   no  |
| instagram       | account_privacy   | true  |
|               |                         |   false   |
|               | activity_status            |    true   |
|               |                         |   false   |
|               | story_sharing               |    true   |
|               |                         |   false   |
|               | usertag_review |    automatic  |
|               |                         |   manual   |