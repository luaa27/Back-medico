
const medicosDAO = require('../model/DAO/medico.js')
const formacoesDAO = require('../model/DAO/formacao.js')
const enderecosController = require('./controller_Endereco.js')
const formacoesController = require('./controller_Formacao.js')

const message = require('../modulo/config.js')
const setInserirNovoMedico = async function (dadosMedico, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let novomedicoJSON = {}
            if (dadosMedico.nome == '' || dadosMedico.nome == undefined || dadosMedico.nome == null || dadosMedico.nome.length > 100 ||
                dadosMedico.dataNascimento == '' || dadosMedico.dataNascimento == undefined || dadosMedico.dataNascimento == null || dadosMedico.dataNascimento.length != 10 ||
                dadosMedico.dataContratacao == '' || dadosMedico.dataContratacao == undefined || dadosMedico.dataContratacao == null || dadosMedico.dataContratacao.length != 10 ||
                dadosMedico.cpf == '' || dadosMedico.cpf == undefined || dadosMedico.cpf == null || dadosMedico.cpf.length > 11 ||
                dadosMedico.email == '' || dadosMedico.email == undefined || dadosMedico.email == null || dadosMedico.email.length > 100 ||
                dadosMedico.telefone == '' || dadosMedico.telefone == undefined || dadosMedico.telefone == null || dadosMedico.telefone.length > 11
            ) {
                return message.ERROR_REQUIRED_FIELDS//400
            }
            else {

                let novoMedico = await medicosDAO.insertMedico(dadosMedico)

                if (novoMedico) {
                    let ultimoID = Number((await medicosDAO.getIDMedico())[0].id)
                    if(dadosMedico.endereco){
                        dadosMedico.endereco.idMedico = ultimoID
                        const resultEndereco = await enderecosController.setInserirNovoEndereco(dadosMedico.endereco,contentType)
                        delete dadosMedico.endereco.idAdicionado
                        delete dadosMedico.endereco.idMedico
                        if(!resultEndereco.status){
                            return message.ERROR_INTERNAL_SERVER_DB//500
                        }
                    }
                    if(dadosMedico.formacoes){
                        const listaFormacoes = dadosMedico.formacoes
                        listaFormacoes.forEach(formacao => {
                            const dados = {
                                idMedico: ultimoID,
                                idFormacao: formacao
                            }
                            formacoesController.setAtribuirFormacao(dados,contentType)
                        });
                    }
                    novomedicoJSON.medico = dadosMedico
                    novomedicoJSON.status = message.SUCCESS_CREATED_ITEM.status//201
                    novomedicoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code//201
                    novomedicoJSON.message = message.SUCCESS_CREATED_ITEM.message//201     
                    novomedicoJSON.idAdicionado = ultimoID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

                    return novomedicoJSON
                }
                else {
                    return message.ERROR_INTERNAL_SERVER_DB//500
                }
            }
        }
        else {
            return message.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER//500-erro na controller
    }

}
//funcao para atualizar um Medico
const setAtualizarMedico = async function (id, dadosAtualizados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let atualizarmedicoJSON = {}
            if (id == '' || id == undefined || id == isNaN(id) || id == null) {
                return message.ERROR_INVALID//400
            } else {
                if (dadosAtualizados.nome == '' || dadosAtualizados.nome == undefined || dadosAtualizados.nome == null || dadosAtualizados.nome.length > 100 ||
                    dadosAtualizados.dataNascimento == '' || dadosAtualizados.dataNascimento == undefined || dadosAtualizados.dataNascimento == null || dadosAtualizados.dataNascimento.length != 10 ||
                    dadosAtualizados.dataContratacao == '' || dadosAtualizados.dataContratacao == undefined || dadosAtualizados.dataContratacao == null || dadosAtualizados.dataContratacao.length != 10 ||
                    dadosAtualizados.cpf == '' || dadosAtualizados.cpf == undefined || dadosAtualizados.cpf == null || dadosAtualizados.cpf.length > 11 ||
                    dadosAtualizados.email == '' || dadosAtualizados.email == undefined || dadosAtualizados.email == null || dadosAtualizados.email.length > 100 ||
                    dadosAtualizados.telefone == '' || dadosAtualizados.telefone == undefined || dadosAtualizados.telefone == null || dadosAtualizados.telefone.length > 11
                ) {
                    return message.ERROR_REQUIRED_FIELDS//400
                } else {
                    let novoMedico = await medicosDAO.updateMedico(id, dadosAtualizados)
                    if (novoMedico) {
                        if(dadosAtualizados.endereco){
                            await enderecosController.setRemoverEnderecoMedico(id)
                            dadosAtualizados.endereco.idMedico = id
                            const resultEndereco = await enderecosController.setInserirNovoEndereco(dadosAtualizados.endereco,contentType)
                            delete dadosAtualizados.endereco.idAdicionado
                            delete dadosAtualizados.endereco.idMedico
                            if(!resultEndereco.status){
                                return message.ERROR_INTERNAL_SERVER_DB//500
                            }
                        }
                        if(dadosAtualizados.formacoes){
                            await formacoesController.setRemoverFormacoesMedico(id)
                            const listaFormacoes = dadosAtualizados.formacoes
                            listaFormacoes.forEach(formacao => {
                                const dados = {
                                    idMedico: id,
                                    idFormacao: formacao
                                }
                                formacoesController.setAtribuirFormacao(dados,contentType)
                            });
                        }
                        atualizarmedicoJSON.medico = dadosAtualizados
                        atualizarmedicoJSON.status = message.SUCCESS_UPDATED_ITEM.status//200
                        atualizarmedicoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code//200
                        atualizarmedicoJSON.message = message.SUCCESS_UPDATED_ITEM.message//200                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                        return atualizarmedicoJSON
                    }
                    else {
                        return message.ERROR_NOT_FOUND //404
                    }
                }
            }
        }
        else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER//500-erro na controller
    }
}
//funcao para excluir um Medico
const setExcluirMedico = async function (id) {
    try {
        if (id == '' || id == undefined || id == isNaN(id) || id == null) {
            return message.ERROR_INVALID//400
        }
        else {
            let idMedico = await medicosDAO.deleteMedico(id)
            if (idMedico) {
                return message.SUCCESS_DELETED_ITEM//200
            }
            else {
                return message.ERROR_NOT_FOUND//404
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER//500
    }
}
const getListarMedicos = async function () {
    let MedicosJSON = {}
    let dadosMedicos = await medicosDAO.selectAllMedicos()
    if (dadosMedicos) {
        if (dadosMedicos.length > 0) {
            for (let index = 0; index < dadosMedicos.length; index++) {
                const id = dadosMedicos[index].id
                const enderecoMedico = (await enderecosController.getBuscarEnderecoMedico(id)).endereco[0]
                if(enderecoMedico){
                    delete enderecoMedico.id
                    delete enderecoMedico.id_medico
                    dadosMedicos[index].endereco = enderecoMedico
                }
                const formacoesMedico = (await formacoesController.getListarFormacoesMedico(id)).formacoes
                if(formacoesMedico){
                    const listaFormacoes = [] 
                    const listaIdsFormacoes = []
                    formacoesMedico.forEach(element => {
                        listaIdsFormacoes.push(element.id_formacao)
                    });
                    for(element of listaIdsFormacoes){
                        const formacao= await formacoesDAO.selectByIdFormacao(element)
                        listaFormacoes.push(formacao[0])
                    }
                    dadosMedicos[index].formacoes = listaFormacoes
                }
            }
            
            MedicosJSON.medico = dadosMedicos
            MedicosJSON.quantidade = dadosMedicos.length
            MedicosJSON.status_code = 200
            return MedicosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }

}
const getBuscarMedico = async function (id) {
    let MedicoJSON = {}
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID//400
    }
    let dadosMedico = await medicosDAO.selectByIdMedico(id)
    if (dadosMedico) {
        if (dadosMedico.length > 0) {
            const enderecoMedico = (await enderecosController.getBuscarEnderecoMedico(id)).endereco[0]
            if(enderecoMedico){
                delete enderecoMedico.id
                delete enderecoMedico.id_medico
                dadosMedico[0].endereco = enderecoMedico
            }
            const formacoesMedico = (await formacoesController.getListarFormacoesMedico(id)).formacoes
            if(formacoesMedico){
                const listaFormacoes = [] 
                const listaIdsFormacoes = []
                formacoesMedico.forEach(element => {
                    listaIdsFormacoes.push(element.id_formacao)
                });
                for(element of listaIdsFormacoes){
                    const formacao= await formacoesDAO.selectByIdFormacao(element)
                    listaFormacoes.push(formacao[0])
                }
                dadosMedico[0].formacoes = listaFormacoes
            }
            MedicoJSON.medico = dadosMedico
            MedicoJSON.quantidade = dadosMedico.length
            MedicoJSON.status_code = 200
            return MedicoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }

}
module.exports = {
    setAtualizarMedico,
    setExcluirMedico,
    setInserirNovoMedico,
    getBuscarMedico,
    getListarMedicos
}