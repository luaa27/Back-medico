const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient
const insertEndereco = async function (dadosEndereco) {
    try {
        
        let sql = `
                INSERT INTO tbl_enderecos(estado,cidade,bairro,rua,numero,id_medico) VALUES (
                    "${dadosEndereco.estado}",
                    "${dadosEndereco.cidade}",
                    "${dadosEndereco.bairro}",
                    "${dadosEndereco.rua}",
                    "${dadosEndereco.numero}",
                    "${dadosEndereco.idMedico}"
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
const updateEndereco = async function (id, dadosAtualizados) {
    try {
        let sql = `
        UPDATE tbl_enderecos
                SET
                    estado = '${dadosAtualizados.estado}',
                    cidade='${dadosAtualizados.cidade}',
                    bairro = '${dadosAtualizados.bairro}',
                    rua='${dadosAtualizados.rua}',
                    numero='${dadosAtualizados.numero}'
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
const updateEnderecoMedico = async function (idMedico, dadosAtualizados) {
    try {
        let sql = `
        UPDATE tbl_enderecos
                SET
                    estado = '${dadosAtualizados.estado}',
                    cidade='${dadosAtualizados.cidade}',
                    bairro = '${dadosAtualizados.bairro}',
                    rua='${dadosAtualizados.rua}',
                    numero='${dadosAtualizados.numero}',
                WHERE
                    id_medico = ${idMedico}
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
const deleteEndereco = async function (id) {
    try {
        let sql = `delete from tbl_enderecos where id = ${id}`
        let rsEndereco = await prisma.$executeRawUnsafe(sql)
        return rsEndereco
    } catch (error) {
        return false
    }
}
const selectAllEnderecos = async function () {
    try {
        let sql = 'select * from tbl_enderecos'

        let rsEnderecos = await prisma.$queryRawUnsafe(sql)
        return rsEnderecos
    } catch (error) {
        console.error(error);
        return false
    }
}
const selectByIdEndereco = async function (id) {
    try {
let sql = `select * from tbl_enderecos where id=${id}`
        let rsEndereco = await prisma.$queryRawUnsafe(sql)
        return rsEndereco
    } catch (error) {
        return false
    }
}

const getIDEndereco = async function () {
    try {
        let sql_id = `select cast(last_insert_id() as DECIMAL) as id from tbl_enderecos limit 1;`
        let rsEndereco = await prisma.$queryRawUnsafe(sql_id)
        return rsEndereco
    } catch (error) {
        return false
    }
}

const selectByIdEnderecoMedico = async function (id) {
    try {
let sql = `select * from tbl_enderecos where id_medico=${id}`
        let rsEndereco = await prisma.$queryRawUnsafe(sql)
        return rsEndereco
    } catch (error) {
        return false
    }
}
const deleteEnderecosMedico = async function (id) {
    try {
        let sql = `delete from tbl_enderecos where id_medico = ${id}`
        let rsEndereco = await prisma.$executeRawUnsafe(sql)
        return rsEndereco
    } catch (error) {
        return false
    }
}

module.exports = {
    insertEndereco,
    updateEndereco,
    updateEnderecoMedico,
    deleteEndereco,
    selectAllEnderecos,
    selectByIdEndereco,
    getIDEndereco,
    selectByIdEnderecoMedico,
    deleteEnderecosMedico
}