#Node Controller Generator


Criador de api pelo banco de dados mysql

Já precisou criar uma api rapida em node js sem precisar programar?
Esse pacote te permite fazer isso com apenas um comando

    //Configure o dbconf.json

    {
      "client": "mysql",
      "connection": {
        "host": "localhost",
        "user": "calistu",
        "password": "bash9835",
        "database": "contas"
      }
    }

    //crie o objeto e chame o criador de api
    const creator = require('nodecontrollercreator');
    creator.create_api();


    //observe que foi gerado uma api no diretorio de execução
    cd api
    node server.js

aproveite sua api


Criador João Victor Calisto (stdmedoth)
jovictor210@gmail.com
