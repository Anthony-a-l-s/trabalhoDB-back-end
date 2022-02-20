const res = require('express/lib/response')
const database = require('../Conect')


/*module.exports = {
  
    select_all : async()=> {
        try{
        const result = await db.query('SELECT nome, data_publicacao, conteudo_aviso FROM avisos INNER JOIN usuarios ON avisos.id_coordenador = usuarios.id_usuario;')
        res.send(result)
        }
        catch(err){
            console.log(err)
            res.send(err)
        }

        
    }
}*/
