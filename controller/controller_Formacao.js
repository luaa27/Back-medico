
const formacoesDAO = require('../model/DAO/formacao.js')
const message = require('../modulo/config.js')
const setInserirNovaFormacao = async function (dadosFormacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let novaFormacaoJSON = {}
            if (
                dadosFormacao.nome == '' || dadosFormacao.nome == undefined || dadosFormacao.nome == null || dadosFormacao.nome.length > 50
            ) {
                return message.ERROR_REQUIRED_FIELDS//400
            }
            else {

                let novaFormacao = await formacoesDAO.insertFormacao(dadosFormacao)

                if (novaFormacao) {
                    let ultimoID = await formacoesDAO.getIDFormacao()
                    dadosFormacao.idAdicionado = Number(ultimoID[0].id)

                    novaFormacaoJSON.formacao = dadosFormacao
                    novaFormacaoJSON.status = message.SUCCESS_CREATED_ITEM.status//201
                    novaFormacaoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code//201
                    novaFormacaoJSON.message = message.SUCCESS_CREATED_ITEM.message//201                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    return novaFormacaoJSON
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
const setAtualizarFormacao = async function (id, dadosAtualizados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let atualizarFormacaoJSON = {}
            if (id == '' || id == undefined || id == isNaN(id) || id == null) {
                return message.ERROR_INVALID//400
            } else {
                if (
                    dadosAtualizados.nome == '' || dadosAtualizados.nome == undefined || dadosAtualizados.nome == null || dadosAtualizados.nome.length > 50
                ) {
                    return message.ERROR_REQUIRED_FIELDS//400
                } else {
                    let novaFormacao = await formacoesDAO.updateFormacao(id, dadosAtualizados)
                    if (novaFormacao) {
                        let ultimoID = await formacoesDAO.getIDFormacao()
                        atualizarFormacaoJSON.formacao = dadosAtualizados
                        atualizarFormacaoJSON.status = message.SUCCESS_UPDATED_ITEM.status//200
                        atualizarFormacaoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code//200
                        atualizarFormacaoJSON.message = message.SUCCESS_UPDATED_ITEM.message//200                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                        return atualizarFormacaoJSON
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
const setExcluirFormacao = async function (id) {
    try {
        if (id == '' || id == undefined || id == isNaN(id) || id == null) {
            return message.ERROR_INVALID//400
        }
        else {
            let idFormacao = await formacoesDAO.deleteFormacao(id)
            if (idFormacao) {
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
const getListarFormacoes = async function () {
    let formacoesJSON = {}
    let dadosFormacoes = await formacoesDAO.selectAllFormacoes()
    if (dadosFormacoes) {
        if (dadosFormacoes.length > 0) {
            formacoesJSON.formacoes = dadosFormacoes
            formacoesJSON.quantidade = dadosFormacoes.length
            formacoesJSON.status_code = 200
            return formacoesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }

}
const getBuscarFormacao = async function (id) {
    let formacaoJSON = {}
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID//400
    }
    let dadosFormacao = await formacoesDAO.selectByIdFormacao(id)
    if (dadosFormacao) {
        if (dadosFormacao.length > 0) {
            formacaoJSON.formacao = dadosFormacao
            formacaoJSON.quantidade = dadosFormacao.length
            formacaoJSON.status_code = 200
            return formacaoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setAtribuirFormacao = async function (dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let atribuirFormacaoJSON = {}
            if (
                isNaN(dados.idMedico) || isNaN(dados.idFormacao)
            ) {
                return message.ERROR_REQUIRED_FIELDS//400
            }
            else {
                let atribuirFormacao = await formacoesDAO.atribuirFormacao(dados)
                if (atribuirFormacao) {
                    atribuirFormacaoJSON.formacao = dados
                    atribuirFormacaoJSON.status = message.SUCCESS_CREATED_ITEM.status//201
                    atribuirFormacaoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code//201
                    atribuirFormacaoJSON.message = message.SUCCESS_CREATED_ITEM.message//201                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    return atribuirFormacaoJSON
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
const getListarFormacoesMedico = async function (id) {
    let formacoesJSON = {}
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID//400
    }
    let listaFormacoes = await formacoesDAO.selectByIdFormacoesMedico(id)
    if (listaFormacoes) {
        if(listaFormacoes.length>0){
            formacoesJSON.formacoes = listaFormacoes
            formacoesJSON.quantidade = listaFormacoes.length
            formacoesJSON.status_code = 200
            return formacoesJSON
        }    else {
            return message.ERROR_NOT_FOUND
        }
    }    else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setRemoverFormacoesMedico = async function (id) {
    try {
        if (id == '' || id == undefined || id == isNaN(id) || id == null) {
            return message.ERROR_INVALID//400
        }
        else {
            let result = await formacoesDAO.deleteFormacoesMedico(id)
            if (result) {
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
module.exports = {
    setAtualizarFormacao,
    setExcluirFormacao,
    setInserirNovaFormacao,
    getBuscarFormacao,
    getListarFormacoes,
    setAtribuirFormacao,
    getListarFormacoesMedico,
    setRemoverFormacoesMedico
}