const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient
const insertFormacao = async function (dadosFormacao) {
    try {

        let sql = `
                INSERT INTO tbl_formacoes(nome) VALUES (
                    "${dadosFormacao.nome}"
                )
                    `
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.error(error);
        return false
    }
}
const updateFormacao = async function (id, dadosAtualizados) {
    try {
        let sql = `
        UPDATE tbl_formacoes
                SET
                    nome = '${dadosAtualizados.nome}'
                WHERE
                    id = ${id}
                    `
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}
const deleteFormacao = async function (id) {
    try {
        let sql = `delete from tbl_formacoes where id = ${id}`
        let rsFormacao = await prisma.$executeRawUnsafe(sql)
        return rsFormacao
    } catch (error) {
        return false
    }
}
const selectAllFormacoes = async function () {
    try {
        let sql = 'select * from tbl_formacoes'

        let rsFormacoes = await prisma.$queryRawUnsafe(sql)
        return rsFormacoes
    } catch (error) {
        console.error(error);
        return false
    }
}
const selectByIdFormacao = async function (id) {
    try {
        let sql = `select * from tbl_formacoes where id=${id}`
        let rsFormacao = await prisma.$queryRawUnsafe(sql)
        return rsFormacao
    } catch (error) {
        return false
    }
}

const getIDFormacao = async function () {
    try {
        let sql_id = `select cast(last_insert_id() as DECIMAL) as id from tbl_formacoes limit 1;`
        let rsFormacao = await prisma.$queryRawUnsafe(sql_id)
        return rsFormacao
    } catch (error) {
        return false
    }

}
const atribuirFormacao = async function (dados) {
    try {
        let sql = `
                INSERT INTO tbl_medico_formacao(id_medico,id_formacao) VALUES 
                    (${dados.idMedico},${dados.idFormacao})
                    `
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.error(error);
        return false
    }
}
const selectByIdFormacoesMedico= async function (id) {
    try {
let sql = `SELECT * from tbl_medico_formacao where id_medico=${id}`
        let rsEndereco = await prisma.$queryRawUnsafe(sql)
        return rsEndereco
    } catch (error) {
        return false
    }
}
const deleteFormacoesMedico = async function (id) {
    try {
        let sql = `delete from tbl_medico_formacao where id_medico = ${id}`
        let rsFormacao = await prisma.$executeRawUnsafe(sql)
        return rsFormacao
    } catch (error) {
        return false
    }
}
module.exports = {
    insertFormacao,
    updateFormacao,
    deleteFormacao,
    selectAllFormacoes,
    selectByIdFormacao,
    getIDFormacao,
    atribuirFormacao,
    selectByIdFormacoesMedico,
    deleteFormacoesMedico
}