#Node Controller Generator


Criador de api pelo banco de dados mysql

Já precisou criar uma api rapida em node js sem precisar programar?
Esse pacote te permite fazer isso com apenas um comando

    //crie o objeto e chame o criador de api
    const creator = require('nodecontrollercreator');
    creator.set_dbconf({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "banco"
    })
    creator.create_api();


    //observe que foi gerado uma api no diretorio de execução
    cd api
    npm install
    node server.js

aproveite sua api


Criador João Victor Calisto (stdmedoth)
jovictor210@gmail.com
