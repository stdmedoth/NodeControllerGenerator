const creator = require('./index');

creator.set_dbconf({
  host: "localhost",
  user: "calistu",
  password: "bash9835",
  database: "contas"
})

creator.create_api();
