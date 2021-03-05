const fs = require('fs');
const mysql = require('mysql');
var database_conf = require('./dbconf.json');

const api_dir = "api";

var con = mysql.createConnection({
  host: database_conf.connection.host,
  user: database_conf.connection.user,
  password: database_conf.connection.password,
  database: database_conf.connection.database
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function create_controller_template(table){
  var template = fs.readFileSync("templates/controller_template.js", 'utf8');
  console.log(table)
  template = template.replace(/{{Controller}}/g, capitalizeFirstLetter(table));
  return template.replace(/{{controller}}/g, table);
}

function create_router_template(table){
  var template = fs.readFileSync("templates/router_template.js", 'utf8')
  template = template.replace(/{{Controller}}/g, capitalizeFirstLetter(table));
  return template.replace(/{{controller}}/g, table);
}

function create_dbconf_template(){
  var template = fs.readFileSync("templates/dbconf_template.js", 'utf8')
  template = template.replace(/{client}/g, 'mysql');
  template = template.replace(/{host}/g, database_conf.connection.host);
  template = template.replace(/{user}/g, database_conf.connection.user);
  template = template.replace(/{password}/g, database_conf.connection.password);
  return template = template.replace(/{database}/g, database_conf.connection.database);
}

function create_server_template(tables){
  var template = fs.readFileSync("templates/server_template.js", 'utf8')

  let required_routes = "";
  let used_routes = "";

  for (table of tables) {
    required_routes += "const " + table + "_router = require('./routes/" + table + "/" + table + ".js')\n";
    used_routes += "app.use(" + table + "_router)\n";
  }

  template = template.replace('{{required routes}}', required_routes);
  template = template.replace('{{used routes}}', used_routes);
  return template;
}

function create_srvconfig_template(){
  return srvconfig_template = fs.readFileSync("templates/srvconfig_template.json", 'utf8')
}

function create_package_template(){
  return package_template = fs.readFileSync("templates/package_template.json", 'utf8')
}

var tables = [];
con.query("SHOW TABLES", function (err, result) {
  if (err) throw err;
  tables = result.map( (item, i) => {
    return item['Tables_in_'+database_conf.connection.database];
  });

  if (!fs.existsSync('api')){
    fs.mkdirSync('api');
  }
  if (!fs.existsSync('api/controllers')){
    fs.mkdirSync('api/controllers');
  }
  if (!fs.existsSync('api/routes')){
    fs.mkdirSync('api/routes');
  }

  if (!fs.existsSync("api/database/")){
    fs.mkdirSync("api/database/");
  }

  let dbconf_template = create_dbconf_template();
  fs.writeFile("api/database/connection.js", dbconf_template, { overwrite: true }, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("Conexão criada!");
  });

  let package_template = create_package_template();
  fs.writeFile("api/package.json", package_template, { overwrite: true }, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("Pacote criado!");
  });

  let srvconfig_template = create_srvconfig_template();
  fs.writeFile("api/config.json", srvconfig_template, { overwrite: true }, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("Configuração criada!");
  });

  let server_template = create_server_template(tables);
  fs.writeFile("api/server.js", server_template, { overwrite: true }, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("Server criado!");
  });

  if (!tables.length){
    console.log("Não há tabelas");
    return 1;
  }

  for (let table of tables) {

    let controller_template = create_controller_template(table);
    if (!fs.existsSync("api/controllers/" + table)){
      fs.mkdirSync("api/controllers/" + table);
    }
    fs.writeFile("api/controllers/" + table + "/" + table + ".js", controller_template, { overwrite: true }, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("Controller " + table + " criado!");
    });

    let router_template = create_router_template(table);
    if (!fs.existsSync("api/routes/" + table)){
      fs.mkdirSync("api/routes/" + table);
    }
    fs.writeFile("api/routes/" + table + "/" + table + ".js", router_template, { overwrite: true }, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("Rota " + table + " criada!");
    });

  }
});
