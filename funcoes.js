
const medicosDAO = require('../model/DAO/medico.js')
const message = require('../modulo/config.js')
const setInserirNovoMedico = async function (dadosMedico, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let novomedicoJSON = {}
            if (dadosMedico.nome == '' || dadosMedico.nome == undefined || dadosMedico.nome == null || 
                dadosMedico.cpf == '' || dadosMedico.cpf == undefined || dadosMedico.cpf == null || dadosMedico.cpf.length > 15 ||
                dadosMedico.email == '' || dadosMedico.email == undefined || dadosMedico.email == null || dadosMedico.email.length > 50||
                dadosMedico.data_nascimento == '' || dadosMedico.data_nascimento == undefined || dadosMedico.data_nascimento == null || dadosMedico.data_nascimento.length != 10 ||
                dadosMedico.telefone.length > 12
            ) {
                return message.ERROR_REQUIRED_FIELDS//400
            }
            else {
                let validateStatus = false
                if (dadosMedico.foto_perfil != null &&
                    dadosMedico.foto_perfil != '' &&
                    dadosMedico.foto_perfil != undefined) {
                
                        validateStatus = true
                
                }
                else {
                    validateStatus = true
                }
                if (validateStatus) {
                    let novoMedico = await medicosDAO.insertMedico(dadosMedico)

                    if (novoMedico) {
                        let ultimoID = await medicosDAO.getIDMedico()
                        dadosMedico.id = Number(ultimoID[0].id)

                        novomedicoJSON.Medico = dadosMedico
                        novomedicoJSON.status = message.SUCCESS_CREATED_ITEM.status//201
                        novomedicoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code//201
                        novomedicoJSON.message = message.SUCCESS_CREATED_ITEM.message//201                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        return novomedicoJSON
                    }
                    else {
                        return message.ERROR_INTERNAL_SERVER_DB//500
                    }
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
const setAtualizarMedico = async function (id, dadoAtualizado, contentType) {
    if (String(contentType).toLowerCase() == 'application/json') {
        let atualizarmedicoJSON = {}
        let dadosMedicos = await medicosDAO.selectAllMedicos()
        let validateStatus = false
        if (id == '' || id == undefined || id == isNaN(id) || id == null) {
            return message.ERROR_INVALID//400
        }
        else if (id>dadosMedicos.length) {
            console.log(id);
            return message.ERROR_NOT_FOUND//404
        }
        else {
            if (dadoAtualizado.nome == '' || dadoAtualizado.nome == undefined || dadoAtualizado.nome == null || 
            dadoAtualizado.cpf == '' || dadoAtualizado.cpf == undefined || dadoAtualizado.cpf == null || dadoAtualizado.cpf.length > 15 ||
            dadoAtualizado.email == '' || dadoAtualizado.email == undefined || dadoAtualizado.email == null || dadoAtualizado.email.length > 50||
            dadoAtualizado.data_nascimento == '' || dadoAtualizado.data_nascimento == undefined || dadoAtualizado.data_nascimento == null || dadoAtualizado.data_nascimento.length != 10 ||
            dadoAtualizado.telefone.length > 12
            ) {
                return message.ERROR_REQUIRED_FIELDS//400
            }
            else {
                if (dadoAtualizado.foto_perfil != null &&
                    dadoAtualizado.foto_perfil != '' &&
                    dadoAtualizado.foto_perfil != undefined) {
                    
                        validateStatus = true
                    
                }
               
            }
            if (validateStatus) {
                let novoMedico = await medicosDAO.updateMedico(id,dadoAtualizado)
                if (novoMedico) {
                    atualizarmedicoJSON.Medico = dadoAtualizado
                    atualizarmedicoJSON.status = message.SUCCESS_UPDATED_ITEM.status//200
                    atualizarmedicoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code//200
                    atualizarmedicoJSON.message = message.SUCCESS_UPDATED_ITEM.message//200                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                    return atualizarmedicoJSON
                }
                else{
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
            else{
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
    else{
        return message.ERROR_CONTENT_TYPE
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
        MedicosJSON.medicos = dadosMedicos
        MedicosJSON.quantidade = dadosMedicos.length
        MedicosJSON.status_code = 200
        return MedicosJSON
    }
    else {
        return false
    }
}
const getBuscarMedico = async function (id) {
    let idMedico = id
    let medicoJSON = {}

    if (idMedico == '' || idMedico == undefined || isNaN(idMedico)) {
        return message.ERROR_INVALID//400
    }
    else {
        let dadosMedico = await medicosDAO.selectByIdMedico(id)
        if (dadosMedico) {
            if (dadosMedico.length > 0) {
                medicoJSON.Medico = dadosMedico
                medicoJSON.status_code = 200
                return medicoJSON
            } else {
                return message.ERROR_NOT_FOUND//404
            }
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB//500
        }
    }
}

module.exports = {
    setAtualizarMedico,
    setExcluirMedico,
    setInserirNovoMedico,
    getBuscarMedico,
    getListarMedicos
}