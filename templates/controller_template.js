const database = require('../../database/connection');

class {{Controller}}Controller{

  add(request, response){
    let {{controller}} = request.body;
    database.insert({{controller}}).table('{{controller}}').then({{controller}}=>{
      response.status(200).json({status: 1, errors:  '{{Controller}} recebidas', {{controller}}:  {{controller}}});
    }).catch(error=>{
      response.status(500).json({status: 0, errors:  'Não foi possível receber {{Controller}}' + error.message});
    });
  }

  get(request, response){
    database.select("*").table('{{controller}}').then({{controller}}=>{
      response.status(200).json({status: 1, errors:  '{{Controller}} recebidas', {{controller}} });
    }).catch(error=>{
      response.status(500).json({status: 0, errors:  'Não foi possível receber {{Controller}}' + error.message});
    });
  }

}


module.exports = new {{Controller}}Controller;
