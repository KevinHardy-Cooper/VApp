# SFWRENG_4G06
This will be the private repo for our SFWR ENG 4G06 capstone project. The group members for the project will be able to 
commit to the repo.

## How To Setup The Whole Thing Locally
1. Make sure you have [NodeJS](https://nodejs.org/en/) and MySQL (see How To Setup The Database -> Local Database -> Installation below) installed.
2. Open your terminal and navigate to a directory of your choice.
3. Clone the repository into that directory by running `git clone https://github.com/KevinHardy-Cooper/SFWRENG_4G06.git`
4. Obtain a copy (or create your own) `SensitiveInfo.js` file. See What Should Go In SensitiveInfo.js? below.
5. Create the database (see How To Setup The Database -> Local Database -> Getting Started below)
6. Start the local MySQL server: `mysql -u root -p` for Mac/Linux, `winpty mysql -u root -p` for Windows.
7. Run `npm install`
8. Run `node src/App.js` to actually run the application.
9. Visit [http://localhost:3000/setting/twitter](http://localhost:3000/setting/twitter) or another endpoint of your choice
10. All done!

## How To Setup The Database
### Remote Database
TBD
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
 
## What Should Go In SensitiveInfo.js?
At this stage, there are only four fields, and each is required in order to make a database connection **currently**.

`this.host = '';` This will contain the host of the database we are using. For a local database, the host is `localhost`;

`this.user = '';` This will contain the user for the database we are using. For a local database, the user could be `root`,
or whatever you set up your local database user to be.

`this.password = '';` This will contain the password for the database we are using. For a local database, this is not your
computer password, but rather the password that you set up to be used for your local database.

`this.database = '';` This will contain the database name for the database we are using. For this project, we will be using 
`VApp`.

## Linting
For JavaScript development, we will follow the following naming conventions:
* Classes and files are to be named in UpperCamelCase
* Variables, functions and objects are to be named in lowerCamelCase
* Literal constants are to be named in ALLCAPITALS, such as `const PI = 3.14` or `const DATABASE = 'VApp`
* Non-literal constants are to be named in UpperCamelCase

For Database development, we will follow the following naming conventions:
* Database and tables will be named in Upper_Snake_Case
* Columns will be named in lower_snake_case