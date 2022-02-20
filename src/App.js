const express = require('express')
const app = express()
const database = require('./database/Conect')
//const aviso = require('./controllers/Aviso')

require('dotenv').config()
const cors = require('cors')
app.use(express.json())
app.use(cors())


//database.conexao()
app.listen (6000 ,() => {
    console.log('Server running on port: 6000')
})

app.get('/hello_world', (req, res) => {
      res.send('Hello world!')
      
            
})

app.get('/list_avisos', async (req,res) => {
    try{
        const result = await database.select_all_aviso()
        res.send(result)  
    }
    catch(err){
        res.send(err)
    }
})

app.get('/aviso/:aviso_id', async (req,res) => {
    try{
        const id = req.params.aviso_id
        const result = await database.select_where_aviso(id)
        res.send(result)  
    }
    catch(err){
        res.send(err)
    }
})

app.post('/aviso',async (req,res) => {
    const{nome, conteudo_aviso} = req.body
    const result = await database.insert_aviso(nome,conteudo_aviso)
    res.send(result)
})

app.delete('/delete_aviso/:aviso_id', async (req,res) =>{
    const id = req.params.aviso_id
    const result = await database.delete_aviso(id)
    res.send(result)
})

app.put('/update_aviso/:aviso_id', async (req,res) =>{
    const id = req.params.aviso_id
    const conteudo_aviso = req.body
    const result = await database.update_aviso(id,conteudo_aviso)
    res.send(result)
})
