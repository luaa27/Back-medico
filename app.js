
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
// const controleMedico = require('./controller/funcoes.js')
const bodyParserJSON = bodyParser.json()

const controleMedico = require('./controller/controller_Medico.js')
app.get('/V1/Medicos', cors(), async function (request, response) {
    let listaMedicos = await controleMedico.getListarMedicos();
    if (listaMedicos) {
        response.json(listaMedicos)
        response.status(200)
    }
    else {
        response.status(404);
    }
})
app.get('/V1/Medico/:id', cors(), async function (request, response) {
    let infoMedico = await controleMedico.getBuscarMedico(request.params.id);
    if (infoMedico) {
        response.json(infoMedico)
        response.status(200)
    }
    else {
        response.status(404);
    }
})
app.post('/V1/Medico', cors(), bodyParserJSON, async function (request, response) {

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoMedico = await controleMedico.setInserirNovoMedico(dadosBody,contentType)

    response.status(resultDadosNovoMedico.status_code)
    response.json(resultDadosNovoMedico)
})
app.delete('/V1/Medico/:id', cors(), async function (request,response) {
    let idMedico = request.params.id

    let resultDados = await controleMedico.setExcluirMedico(idMedico)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/V1/Medico/:id', cors(), bodyParserJSON, async function (request, response) {
    let idMedico = request.params.id

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoMedico = await controleMedico.setAtualizarMedico(idMedico,dadosBody,contentType)

    response.status(resultDadosNovoMedico.status_code)
    response.json(resultDadosNovoMedico)
})

const controleEndereco = require('./controller/controller_Endereco.js')
app.get('/V1/enderecos', cors(), async function (request, response) {
    let listaMedicos = await controleEndereco.getListarEnderecos();
    if (listaMedicos) {
        response.json(listaMedicos)
        response.status(200)
    }
    else {
        response.status(404);
    }
})
app.get('/V1/endereco/:id', cors(), async function (request, response) {
    let infoEndereco = await controleEndereco.getBuscarEndereco(request.params.id);
    if (infoEndereco) {
        response.json(infoEndereco)
        response.status(200)
    }
    else {
        response.status(404);
    }
})
app.post('/V1/endereco', cors(), bodyParserJSON, async function (request, response) {

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoEndereco = await controleEndereco.setInserirNovoEndereco(dadosBody,contentType)

    response.status(resultDadosNovoEndereco.status_code)
    response.json(resultDadosNovoEndereco)
})
app.delete('/V1/endereco/:id', cors(), async function (request,response) {
    let idMedico = request.params.id

    let resultDados = await controleEndereco.setExcluirEndereco(idMedico)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/V1/endereco/:id', cors(), bodyParserJSON, async function (request, response) {
    let idMedico = request.params.id

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoEndereco = await controleEndereco.setAtualizarEndereco(idMedico,dadosBody,contentType)

    response.status(resultDadosNovoEndereco.status_code)
    response.json(resultDadosNovoEndereco)
})



const controleFormacao = require('./controller/controller_Formacao.js')
app.get('/V1/formacoes', cors(), async function (request, response) {
    let listaMedicos = await controleFormacao.getListarFormacoes();
    if (listaMedicos) {
        response.json(listaMedicos)
        response.status(200)
    }
    else {
        response.status(404);
    }
})
app.get('/V1/formacao/:id', cors(), async function (request, response) {
    let infoFormacao = await controleFormacao.getBuscarFormacao(request.params.id);
    if (infoFormacao) {
        response.json(infoFormacao)
        response.status(200)
    }
    else {
        response.status(404);
    }
})
app.post('/V1/formacao', cors(), bodyParserJSON, async function (request, response) {

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovaFormacao = await controleFormacao.setInserirNovaFormacao(dadosBody,contentType)

    response.status(resultDadosNovaFormacao.status_code)
    response.json(resultDadosNovaFormacao)
})
app.delete('/V1/formacao/:id', cors(), async function (request,response) {
    let idMedico = request.params.id

    let resultDados = await controleFormacao.setExcluirFormacao(idMedico)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/V1/formacao/:id', cors(), bodyParserJSON, async function (request, response) {
    let idMedico = request.params.id

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovaFormacao = await controleFormacao.setAtualizarFormacao(idMedico,dadosBody,contentType)

    response.status(resultDadosNovaFormacao.status_code)
    response.json(resultDadosNovaFormacao)
})
//ATRIBUI UMA FORMAÇÃO A UM MÉDICO
app.post('/V1/formacao/medico', cors(), bodyParserJSON, async function (request, response) {

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovaFormacao = await controleFormacao.setAtribuirFormacao(dadosBody,contentType)

    response.status(resultDadosNovaFormacao.status_code)
    response.json(resultDadosNovaFormacao)
})

app.delete('/V1/formacoes/medico/:id', cors(), async function (request,response) {
    let resultDados = await controleFormacao.setRemoverFormacoesMedico(request.params.id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

var port = 8080
app.listen(port, function () {
    console.log('foi!',port)
})
