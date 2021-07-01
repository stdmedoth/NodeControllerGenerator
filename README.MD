# Node Controller Generator

API creator by mysql database

Ever needed to create a quick api in node js without needing to program?
This package allows you to do this with just one command.

The api will be based on your database tables, it will work with all columns

The add, get, delete, update routes will be generated for each of your tables in the SQL database

    //create the object and call the api creator
    const creator = require('nodecontrollercreator');
    creator.set_dbconf({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "database"
    })
    creator.create_api();


    //note that an api was generated in the execution directory
    cd api
    npm install
    node server.js

enjoy your api


Creator João Victor Calisto (stdmedoth)
jovictor210@gmail.com