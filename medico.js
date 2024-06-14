const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient
const insertMedico = async function (dadosMedico) {
    let sql;
    try {
        // console.log(dadosMedico);
        if (dadosMedico.foto_perfil != '' && dadosMedico.foto_perfil != null && dadosMedico.foto_perfil != undefined) {
            sql = `insert into tbl_medicos (nome,data_nascimento,cpf,telefone,email,foto_perfil) 
            values(
                '${dadosMedico.nome}',
                '${dadosMedico.data_nascimento}',
                '${dadosMedico.cpf}',
                '${dadosMedico.telefone}',
                '${dadosMedico.email}',
                '${dadosMedico.foto_perfil}'
            )`
        }
        else {
            sql = `insert into tbl_medicos (nome,data_nascimento,cpf,telefone,email,foto_perfil) 
                values(
                    '${dadosMedico.nome}',
                    '${dadosMedico.data_nascimento}',
                    '${dadosMedico.cpf}',
                    '${dadosMedico.telefone}',
                    '${dadosMedico.email}',
                    null
                )`
        }
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
const updateMedico = async function (id, dadoAtualizado) {
    let sql;

    try {
        if (dadoAtualizado.foto_perfil != '' && dadoAtualizado.foto_perfil != null && dadoAtualizado.foto_perfil != undefined) {
            sql = `UPDATE tbl_medicos
                SET
                    nome = '${dadoAtualizado.nome}',
                    cpf='${dadoAtualizado.cpf}',
                    email='${dadoAtualizado.email}',
                    data_nascimento='${dadoAtualizado.data_nascimento}',
                    foto_perfil='${dadoAtualizado.foto_perfil}',
                    telefone='${dadoAtualizado.telefone}'
                WHERE
                    id = ${id}`
        }
        else {
            sql = `UPDATE tbl_medicos
        SET
        nome = '${dadoAtualizado.nome}',
        cpf='${dadoAtualizado.cpf}',
        email='${dadoAtualizado.email}',
        data_nascimento='${dadoAtualizado.data_nascimento}',
        foto_perfil=null,
        telefone='${dadoAtualizado.telefone}'
        WHERE
        id = ${id}`
        }
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
    getIDMedico
}