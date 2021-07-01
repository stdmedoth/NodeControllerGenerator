const database = require('../../database/connection');

class {{Controller}}Controller{

  add(request, response){
    let {{controller}} = request.body;
    database.insert({{controller}}).table('{{controller}}').then({{controller}}=>{
      response.status(200).json({status: 1, message:  '{{Controller}} adicionado', {{controller}}:  {{controller}}});
    }).catch(error=>{
      response.status(500).json({status: 0, errors:  'Não foi possível adicionar {{Controller}}' + error.message});
    });
  }

  get(request, response){
    database.select("*").table('{{controller}}').then({{controller}}=>{
      response.status(200).json({status: 1, message:  '{{Controller}} recebidas', {{controller}} });
    }).catch(error=>{
      response.status(500).json({status: 0, errors:  'Não foi possível receber {{Controller}}' + error.message});
    });
  }

  update(request, response){
    let {{controller}} = request.body;
    database.update({{controller}}).table('{{controller}}').where({ id: {{controller}}.id }).then({{controller}}=>{
      response.status(200).json({status: 1, message:  '{{Controller}} atualizado', {{controller}}:  {{controller}}});
    }).catch(error=>{
      response.status(500).json({status: 0, errors:  'Não foi possível atualizado {{Controller}}' + error.message});
    });
  }

  delete(request, response){
    let {{controller}} = request.body;
    database.delete().table('{{controller}}').where({ id: {{controller}}.id }).then({{controller}}=>{
      response.status(200).json({status: 1, message:  '{{Controller}} deletado', {{controller}}:  {{controller}}});
    }).catch(error=>{
      response.status(500).json({status: 0, errors:  'Não foi possível deletar {{Controller}}' + error.message});
    });
  }

}


module.exports = new {{Controller}}Controller;
