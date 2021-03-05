#Node Controller Generator


Criador de api pelo banco de dados mysql

Já precisou criar uma api rapida em node js sem precisar programar?
Esse pacote te permite fazer isso com apenas um comando

    //Configure o dbconf.json
    const creator = require('nodecontrollercreator');


    //crie o objeto e chame o criador de api
    creator.set_dbconf({
      host: "localhost",
      user: "calistu",
      password: "bash9835",
      database: "contas"
    })
    creator.create_api();


    //observe que foi gerado uma api no diretorio de execução
    cd api
    npm install
    node server.js

aproveite sua api


Criador João Victor Calisto (stdmedoth)
jovictor210@gmail.com
