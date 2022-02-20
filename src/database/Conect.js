const Client = require('pg').Client
require('dotenv').config()

const user = 'postgres'
const host = 'localhost'
const database = 'banco de dados'
const password = 'vraux'
const port = '5432'


    const db = new Client({
    user: user,
    host: host ,
    database: database,
    password: password,
    port: port,
  
    })
    db.connect().then(() => {
    console.log('Conectado ao banco de dados')
   
    }).catch(err => {
    console.log(err)
    })
  
        module.exports = {
  
        select_all_aviso : async()=> {
            try{
            const result = await db.query('SELECT id_aviso, nome, data_publicacao, conteudo_aviso FROM avisos INNER JOIN usuarios ON avisos.id_coordenador = usuarios.id_usuario;')
            return(result)
            }
            catch(err){
                console.log(err)
                return(err)
            }
        },

        select_where_aviso: async(id)=> {
            try{
                const result = await db.query('SELECT nome, data_publicacao, conteudo_aviso FROM avisos INNER JOIN usuarios ON avisos.id_coordenador = usuarios.id_usuario WHERE id_aviso =' +id+';')
                return result
            }
            catch(err){
                console.log(err)
                return(err)
            }
        },

        /*select_id_nome: async(nome) =>{
            try{
                   return await db.query('SELECT usuarios.id_usuario FROM usuarios INNER JOIN coordenadores ON usuarios.id_usuario = coordenadores.id_coordenador WHERE usuarios.nome =' +nome+';')
            }
            catch(err){
               return(err)
            }
        },*/

        insert_aviso: async(nome, conteudo_aviso)=> {
            try{

                     const id_coordenador = await db.query('SELECT usuarios.id_usuario FROM usuarios INNER JOIN coordenadores ON usuarios.id_usuario = coordenadores.id_coordenador WHERE usuarios.nome =' +nome+';')
                     await db.query('INSERT INTO public.avisos(id_coordenador, conteudo_aviso)VALUES ('+id_coordenador+','+conteudo_aviso+');')
                     return ('aviso publicado com sucesso')
               }
               catch(err){
                   console.log(err)
                    return (err)
               }
        },

        delete_aviso: async(id)=>{
            console.log(id)
            try{
                await db.query('DELETE FROM avisos WHERE id_aviso = ' +id+';')
                return('Aviso exluido com sucesso')
            }
            catch(err){
                console.log(err)
                return(err)
            }
        },

        update_aviso: async(id,conteudo_aviso)=>{
             try{
                 await db.query('UPDATE avisos SET conteudo_aviso = '+conteudo_aviso+ ' WHERE id_aviso = '+id+';')
                 return('Conteudo atualizado com sucesso')
             }
             catch(err){
                console.log(err)
                return(err)
            }
        }

    }

        
    
    
    

   
    





