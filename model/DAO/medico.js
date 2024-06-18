const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient
const insertMedico = async function (dadosMedico) {
    try {
        
        let sql = `
                INSERT INTO tbl_medicos(nome,data_nascimento,data_contratacao,cpf,email,telefone) VALUES (
                    "${dadosMedico.nome}",
                    "${dadosMedico.dataNascimento}",
                    "${dadosMedico.dataContratacao}",
                    "${dadosMedico.cpf}",
                    "${dadosMedico.email}",
                    "${dadosMedico.telefone}"
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
const updateMedico = async function (id, dadosAtualizados) {
    try {
        let sql = `
        UPDATE tbl_medicos
                SET
                    nome = '${dadosAtualizados.nome}',
                    data_nascimento='${dadosAtualizados.dataNascimento}',
                    data_contratacao = '${dadosAtualizados.dataContratacao}',
                    cpf='${dadosAtualizados.cpf}',
                    email='${dadosAtualizados.email}',
                    telefone='${dadosAtualizados.telefone}'
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
const deleteMedico = async function (id) {
    try {
        let sql = `delete from tbl_medicos where id = ${id}`
        let rsMedico = await prisma.$executeRawUnsafe(sql)
        return rsMedico
    } catch (error) {
        return false
    }
}
const selectAllMedicos = async function () {
    try {
        let sql = 'select * from tbl_medicos'
        let rsMedicos = await prisma.$queryRawUnsafe(sql)
        return rsMedicos
    } catch (error) {
        console.error(error);
        return false
    }
}
const selectByIdMedico = async function (id) {
    try {
let sql = `select * from tbl_medicos where id=${id}`
        let rsMedico = await prisma.$queryRawUnsafe(sql)
        return rsMedico
    } catch (error) {
        return false
    }
}

const getIDMedico = async function () {
    try {
        let sql_id = `select cast(last_insert_id() as DECIMAL) as id from tbl_medicos limit 1;`
        let rsMedico = await prisma.$queryRawUnsafe(sql_id)
        return rsMedico
    } catch (error) {
        return false
    }

}

module.exports = {
    insertMedico,
    updateMedico,
    deleteMedico,
    selectAllMedicos,
    selectByIdMedico,
    getIDMedico,
}