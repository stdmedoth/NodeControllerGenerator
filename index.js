const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

var api_dir = "api";
var con = null;
var dbconf = null;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class CreatorContext {

  set_dbconf(conf){
    dbconf = conf
    //conf
    //{
    //  host: host,
    //  user: user,
    //  password: password,
    //  database: database
    //}
    con = mysql.createConnection(dbconf);
  }

  get_dbconf(){
    return dbconf;
  }

  create_controller_template(table){
    var template = fs.readFileSync(path.resolve(__dirname, "./templates/controller_template.js"), 'utf8');
    template = template.replace(/{{Controller}}/g, capitalizeFirstLetter(table));
    return template.replace(/{{controller}}/g, table);
  }

  create_server_template(){
    return fs.readFileSync(path.resolve(__dirname, "./templates/server_template.js"), 'utf8')
  }

  create_router_template(table){
    var template = fs.readFileSync(path.resolve(__dirname, "./templates/router_template.js"), 'utf8')
    template = template.replace(/{{Controller}}/g, capitalizeFirstLetter(table));
    return template.replace(/{{controller}}/g, table);
  }

  create_dbconf_template(){
    var template = fs.readFileSync(path.resolve(__dirname, "./templates/dbconf_template.js"), 'utf8')
    template = template.replace(/{client}/g, 'mysql');
    template = template.replace(/{host}/g, this.get_dbconf().host);
    template = template.replace(/{user}/g, this.get_dbconf().user);
    template = template.replace(/{password}/g, this.get_dbconf().password);
    return template = template.replace(/{database}/g, this.get_dbconf().database);
  }

  create_routes_template(tables){
    var template = fs.readFileSync(path.resolve(__dirname, "./templates/routes_template.js"), 'utf8')

    let required_routes = "";
    let used_routes = "";

    for (let table of tables) {
      //IcmsInterestadual_router: require('./routes/IcmsInterestadual/IcmsInterestadual.js'),
      required_routes += table + "_router: require('./routes/" + table + "/" + table + ".js'),\n";
    }

    template = template.replace('{{required routes}}', required_routes);
    template = template.replace('{{used routes}}', used_routes);
    return template;
  }

  create_srvconfig_template(){
    return fs.readFileSync(path.resolve(__dirname, "./templates/srvconfig_template.json"), 'utf8')
  }

  create_package_template(){
    return fs.readFileSync(path.resolve(__dirname, "./templates/package_template.json"), 'utf8')
  }


  create_api(){

    let creator = this;
    var tables = [];
    con.query("SHOW TABLES", function (err, result) {
      if (err) throw err;
      tables = result.map( (item, i) => {
        return item['Tables_in_'+ creator.get_dbconf().database];
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

      let dbconf_template = creator.create_dbconf_template();
      fs.writeFile("api/database/connection.js", dbconf_template, { overwrite: true }, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("Conex??o criada!");
      });

      let package_template = creator.create_package_template();
      fs.writeFile("api/package.json", package_template, { overwrite: true }, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("Pacote criado!");
      });

      let srvconfig_template = creator.create_srvconfig_template();
      fs.writeFile("api/config.json", srvconfig_template, { overwrite: true }, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("Configura????o criada!");
      });

      let server_template = creator.create_server_template(tables);
      fs.writeFile("api/server.js", server_template, { overwrite: true }, function(err) {
          if(err) {
            return console.log(err);
          }
          console.log("Server criado!");
      });

      if (!tables.length){
        console.log("N??o h?? tabelas");
        return 1;
      }

      let routes_template = creator.create_routes_template(tables)
      fs.writeFile("api/routes.js", routes_template, { overwrite: true }, function(err) {
          if(err) {
            return console.log(err);
          }
          console.log("Rotas criada!");
      });

      if (!tables.length){
        console.log("N??o h?? tabelas");
        return 1;
      }

      for (let table of tables) {

        let controller_template = creator.create_controller_template(table);
        if (!fs.existsSync("api/controllers/" + table)){
          fs.mkdirSync("api/controllers/" + table);
        }
        fs.writeFile("api/controllers/" + table + "/" + table + ".js", controller_template, { overwrite: true }, function(err) {
            if(err) {
              return console.log(err);
            }
            console.log("Controller " + table + " criado!");
        });

        let router_template = creator.create_router_template(table);
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
  }
}

module.exports = new CreatorContext;
