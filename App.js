const express = require('express');
const app = express();
const database = require('./src/models/Connect');

const dotEnv = require('dotenv').config();
const cors = require('cors');
const modelAvisos = require('./src/models/Aviso');
const modelUsuarios = require('./src/models/Usuario');
app.use(express.json());
app.use(cors());

// MODELS
const aviso = modelAvisos();
const usuarios = modelUsuarios();

app.listen(dotEnv.parsed.EXPRESS_PORT, () => {
    console.log(`Server running on port: ${dotEnv.parsed.EXPRESS_PORT}`);
});

app.get('/avisos', async (req, res) => {
    res.send(await aviso.select());
});

app.get('/aviso/:aviso_id', async (req, res) => {
    res.send(await aviso.select('*', `id_aviso = ${req.params.aviso_id}`));
});

app.post('/aviso', async (req, res) => {
    const { id_coordenador, conteudo_aviso } = req.body;
    const result = await aviso.insert(`id_coordenador, conteudo_aviso`, `${id_coordenador}, '${conteudo_aviso}'`);
    res.send(result);
});

app.delete('/aviso/:aviso_id', async (req, res) => {
    res.send(await aviso.delete(`id_aviso = ${req.params.aviso_id}`));
});

app.put('/aviso/:aviso_id', async (req, res) => {
    const params = Object.keys(req.body).toString();
    const valuesObject = Object.values(req.body);
    let values = '';

    for (let i = 0; i < valuesObject.length; i++) {
        valuesObject[i] = typeof valuesObject[i] === 'string' ? `'${valuesObject[i]}'` : valuesObject[i];
        if (valuesObject.length - 1 === i) {
            values += `${valuesObject[i]}`;
        } else {
            values += `${valuesObject[i]},`;
        }
    }

    res.send(await aviso.update(params, values, `id_aviso = ${req.params.aviso_id}`));
});

app.get('/usuarios', async (req, res) => {
    res.send(await usuarios.select());
});

app.post('/usuario', async (req, res) => {
    const { nome, email, senha } = req.body;
    const result = await usuarios.insert(`nome, email, senha`, `'${nome}', '${email}', '${senha}'`);
    res.send(result);
});

app.delete('/usuario/:usuario_id', async (req, res) => {
    res.send(await usuarios.delete(`id_usuario = ${req.params.usuario_id}`));
});

app.put('/usuario/:usuario_id', async (req, res) => {
    const params = Object.keys(req.body).toString();
    const valuesObject = Object.values(req.body);
    let values = '';

    for (let i = 0; i < valuesObject.length; i++) {
        valuesObject[i] = typeof valuesObject[i] === 'string' ? `'${valuesObject[i]}'` : valuesObject[i];
        if (valuesObject.length - 1 === i) {
            values += `${valuesObject[i]}`;
        } else {
            values += `${valuesObject[i]},`;
        }
    }

    res.send(await usuarios.update(params, values, `id_usuario = ${req.params.usuario_id}`));
});
