
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

    app.use(cors())

    next()
})
const controleDados = require('./controller/funcoes.js')
//const controleDados = require('./controller/controller_Medico.js')
const bodyParserJSON = bodyParser.json()
app.get('/V1/Medicos', cors(), async function (request, response) {
    let listaMedicos = await controleDados.getListarMedicos();

    console.log(listaMedicos);
    if (listaMedicos) {
        response.json(listaMedicos)
        response.status(200)
    }
    else {
        response.status(404);
    }
})
//Manda pro DB dados de um novo Medico
app.post('/V1/Medico', cors(), bodyParserJSON, async function (request, response) {

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoMedico = await controleDados.setInserirNovoMedico(dadosBody,contentType)

    response.status(resultDadosNovoMedico.status_code)
    response.json(resultDadosNovoMedico)
})
app.delete('/V1/Medico/:id', cors(), async function (request,response) {
    let idMedico = request.params.id

    let resultDados = await controleDados.setExcluirMedico(idMedico)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/V1/Medico/:id', cors(), bodyParserJSON, async function (request, response) {
    let idMedico = request.params.id

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoMedico = await controleDados.setAtualizarMedico(idMedico,dadosBody,contentType)

    response.status(resultDadosNovoMedico.status_code)
    response.json(resultDadosNovoMedico)
})



app.listen('8080', function () {
    console.log('foi!')
})