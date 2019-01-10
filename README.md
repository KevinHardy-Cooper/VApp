# SFWRENG_4G06
This will be the private repo for our SFWR ENG 4G06 capstone project. The group members for the project will be able to commit to the repo.

# How to Set Up The Database
## Remote Database
TBD
## Local Database
### Installation
1. Download [MySQL](https://www.mysql.com) for your respective machine. 
2. Follow their setup instructions in order to install it on your machine. 
### Getting Started
1. Fire up the MySQL Server (there's usually a "Start MySQL Server" button somewhere). 
2. Once the server is started, open up a command prompt and type `mysql -u root -p` which will then require your 
password. You may have to set up credentials so that you can use this command on your machine.
    * If you are using Git Bash for Windows, you may have to type `winpty mysql -u root -p`
3. The `mysql` prompt should now show up. Now type `create database VApp;`. This command will create the database that 
we will load the `database.sql` file into. I couldn't think of anything else to call it :).
4. Now enter `exit`; We are now going to load the database from the `database.sql` file, so hopefully you remember the
path to that file. 
5. `mysql -u root -p VApp < full/path/to/database.sql`. Enter your password once more, and the console 
should freeze for a bit as it executes the SQL. 
    * On Windows, to import the file:
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
10. Exit the prompt using `exit;`, and turn off the MySQL server if you are done using it (Look for the button that says "Stop MySQL 
Server", should be in the window where you started the server from).

NOTE:
If you have made change to a table, such as inserted Implications or Settings, export the database as an SQL file and 
make a pull request on GitHub with the updated file.