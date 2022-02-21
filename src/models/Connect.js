const { Client } = require('pg');
const dotEnv = require('dotenv').config();

const user = dotEnv.parsed.DATABASE_USER
const host = dotEnv.parsed.DATABASE_HOST
const database = dotEnv.parsed.DATABASE_NAME
const password = dotEnv.parsed.DATABASE_PASSWORD
const port = dotEnv.parsed.DATABASE_PORT

const dbClient = new Client({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port
});

dbClient
    .connect()
    .then(() => console.log('Conectado ao banco de dados'))
    .catch(err => console.log(err));

module.exports = dbClient;

/*
module.exports = {

    select_all_aviso: async () => {

    },

    select_where_aviso: async (id) => {
        try {
            const result = await dbClient.query('SELECT nome, data_publicacao, conteudo_aviso FROM avisos INNER JOIN usuarios ON avisos.id_coordenador = usuarios.id_usuario WHERE id_aviso =' + id + ';')
            return result
        }
        catch (err) {
            console.log(err)
            return (err)
        }
    },

    select_id_nome: async (nome) => {
        try {
            return await dbClient.query('SELECT usuarios.id_usuario FROM usuarios INNER JOIN coordenadores ON usuarios.id_usuario = coordenadores.id_coordenador WHERE usuarios.nome =' + nome + ';')
        }
        catch (err) {
            return (err)
        }
    },

    insert_aviso: async (nome, conteudo_aviso) => {
        try {

            const id_coordenador = await dbClient.query('SELECT usuarios.id_usuario FROM usuarios INNER JOIN coordenadores ON usuarios.id_usuario = coordenadores.id_coordenador WHERE usuarios.nome =' + nome + ';')
            await dbClient.query('INSERT INTO public.avisos(id_coordenador, conteudo_aviso)VALUES (' + id_coordenador + ',' + conteudo_aviso + ');')
            return ('aviso publicado com sucesso')
        }
        catch (err) {
            console.log(err)
            return (err)
        }
    },

    delete_aviso: async (id) => {
        console.log(id)
        try {
            await dbClient.query('DELETE FROM avisos WHERE id_aviso = ' + id + ';')
            return ('Aviso exluido com sucesso')
        }
        catch (err) {
            console.log(err)
            return (err)
        }
    },

    update_aviso: async (id, conteudo_aviso) => {
        try {
            await dbClient.query('UPDATE avisos SET conteudo_aviso = ' + conteudo_aviso + ' WHERE id_aviso = ' + id + ';')
            return ('Conteudo atualizado com sucesso')
        }
        catch (err) {
            console.log(err)
            return (err)
        }
    }

}
    */
