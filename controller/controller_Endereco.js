
const enderecosDAO = require('../model/DAO/endereco.js')
const message = require('../modulo/config.js')
const setInserirNovoEndereco = async function (dadosEndereco, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let novoEnderecoJSON = {}

            if (dadosEndereco.estado == ''      || dadosEndereco.estado == undefined      || dadosEndereco.estado == null      || dadosEndereco.estado.length !=2        || 
                dadosEndereco.cidade == ''      || dadosEndereco.cidade == undefined      || dadosEndereco.cidade == null      || dadosEndereco.cidade.length > 60       ||
                dadosEndereco.bairro == ''      || dadosEndereco.bairro == undefined      || dadosEndereco.bairro == null      || dadosEndereco.bairro.length > 60       ||
                dadosEndereco.rua == ''         || dadosEndereco.rua == undefined         || dadosEndereco.rua == null         || dadosEndereco.rua.length > 60  
            ) {
                return message.ERROR_REQUIRED_FIELDS//400
            }
            else {
                let validateStatus = false
                if(
                    dadosEndereco.numero != ''&& dadosEndereco.numero != undefined&& dadosEndereco.numero && null
                ){
                    if(isNaN(dadosEndereco.numero)){
                        return message.ERROR_REQUIRED_FIELDS //400
                    } else {
                        validateStatus = true
                    }
                } else {
                    validateStatus = true
                }
                if(validateStatus){
                    let novoEndereco = await enderecosDAO.insertEndereco(dadosEndereco)
    
                    if (novoEndereco) {
                        let ultimoID = await enderecosDAO.getIDEndereco()
                        dadosEndereco.idAdicionado = Number(ultimoID[0].id)
                        novoEnderecoJSON.endereco = dadosEndereco
                        novoEnderecoJSON.status = message.SUCCESS_CREATED_ITEM.status//201
                        novoEnderecoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code//201
                        novoEnderecoJSON.message = message.SUCCESS_CREATED_ITEM.message//201                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        return novoEnderecoJSON
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
const setAtualizarEndereco = async function (id, dadosAtualizados, contentType) {
    try{
        if (String(contentType).toLowerCase() == 'application/json') {
            let atualizarEnderecoJSON = {}
            if (id == '' || id == undefined || id == isNaN(id) || id == null) {
                return message.ERROR_INVALID//400
            } else {
                if (dadosAtualizados.estado == '' || dadosAtualizados.estado == undefined      || dadosAtualizados.estado == null      || dadosAtualizados.estado.length !=2        || 
                    dadosAtualizados.cidade == '' || dadosAtualizados.cidade == undefined      || dadosAtualizados.cidade == null      || dadosAtualizados.cidade.length > 60       ||
                    dadosAtualizados.bairro == '' || dadosAtualizados.bairro == undefined      || dadosAtualizados.bairro == null      || dadosAtualizados.bairro.length > 60       ||
                    dadosAtualizados.rua == ''    || dadosAtualizados.rua == undefined         || dadosAtualizados.rua == null         || dadosAtualizados.rua.length > 60         
                ) {
                    return message.ERROR_REQUIRED_FIELDS//400
                } else {
                    let validateStatus = false
                    if(
                        dadosAtualizados.numero != ''&& dadosAtualizados.numero != undefined&& dadosAtualizados.numero && null
                    ){
                        if(isNaN(dadosEndereco.numero)){
                            return message.ERROR_REQUIRED_FIELDS //400
                        } else {
                            validateStatus = true
                        }
                    } else {
                        validateStatus = true
                    }
                    if(validateStatus){
                        let novoEndereco = await enderecosDAO.updateEndereco(id,dadosAtualizados)
                        if (novoEndereco) {
                            let ultimoID = await enderecosDAO.getIDEndereco()
                            dadosAtualizados.idEditado = Number(ultimoID[0].id)
                            atualizarEnderecoJSON.Endereco = dadosAtualizados
                            atualizarEnderecoJSON.status = message.SUCCESS_UPDATED_ITEM.status//200
                            atualizarEnderecoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code//200
                            atualizarEnderecoJSON.message = message.SUCCESS_UPDATED_ITEM.message//200                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                            return atualizarEnderecoJSON
                        }
                        else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }
                }
            }
        }
        else{
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER//500-erro na controller
    }
}
const setExcluirEndereco = async function (id) {
    try {
        if (id == '' || id == undefined || id == isNaN(id) || id == null) {
            return message.ERROR_INVALID//400
        }
        else {
            let idEndereco = await enderecosDAO.deleteEndereco(id)
            if (idEndereco) {
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
const getListarEnderecos = async function () {
    let enderecosJSON = {}
    let dadosEnderecos = await enderecosDAO.selectAllEnderecos()
    if (dadosEnderecos) {
        if(dadosEnderecos.length>0){
            enderecosJSON.enderecos = dadosEnderecos
            enderecosJSON.quantidade = dadosEnderecos.length
            enderecosJSON.status_code = 200
            return enderecosJSON
        }    else {
            return message.ERROR_NOT_FOUND
        }
    }    else {
        return message.ERROR_INTERNAL_SERVER_DB
    }

}
const getBuscarEndereco = async function (id) {
    let EnderecoJSON = {}
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID//400
    }
    let dadosEndereco = await enderecosDAO.selectByIdEndereco(id)
    if (dadosEndereco) {
        if(dadosEndereco.length>0){
            EnderecoJSON.endereco = dadosEndereco
            EnderecoJSON.quantidade = dadosEndereco.length
            EnderecoJSON.status_code = 200
            return EnderecoJSON
        }    else {
            return message.ERROR_NOT_FOUND
        }
    }    else {
        return message.ERROR_INTERNAL_SERVER_DB
    }

}
const getBuscarEnderecoMedico = async function (id) {
    let EnderecoJSON = {}
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID//400
    }
    let dadosEndereco = await enderecosDAO.selectByIdEnderecoMedico(id)
    if (dadosEndereco) {
        if(dadosEndereco.length>0){
            EnderecoJSON.endereco = dadosEndereco
            EnderecoJSON.quantidade = dadosEndereco.length
            EnderecoJSON.status_code = 200
            return EnderecoJSON
        }    else {
            return message.ERROR_NOT_FOUND
        }
    }    else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}
const setRemoverEnderecoMedico = async function (id) {
    let EnderecoJSON = {}
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID//400
    }
    let dadosEndereco = await enderecosDAO.deleteEnderecosMedico(id)
    if (dadosEndereco) {
        if(dadosEndereco.length>0){
            EnderecoJSON.endereco = dadosEndereco
            EnderecoJSON.quantidade = dadosEndereco.length
            EnderecoJSON.status_code = 200
            return EnderecoJSON
        }    else {
            return message.ERROR_NOT_FOUND
        }
    }    else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}
module.exports = {
    setAtualizarEndereco,
    setExcluirEndereco,
    setInserirNovoEndereco,
    getBuscarEndereco,
    getListarEnderecos,
    getBuscarEnderecoMedico,
    setRemoverEnderecoMedico
}