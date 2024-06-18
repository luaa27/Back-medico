CREATE DATABASE db_medicos_luana;
USE db_medicos_luana;

CREATE TABLE tbl_medicos(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    data_contratacao DATE NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(11) NOT NULL
);

CREATE TABLE tbl_enderecos(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(2) NOT NULL,
	cidade VARCHAR(60) NOT NULL,
	bairro VARCHAR(60) NOT NULL,
	rua VARCHAR(60) NOT NULL,
    numero INT,
    id_medico INT NOT NULL,
	FOREIGN KEY (id_medico) REFERENCES tbl_medicos(id)
);

CREATE TABLE tbl_formacoes(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE tbl_medico_formacao(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_medico INT NOT NULL,
	id_formacao INT NOT NULL
);


INSERT INTO tbl_formacoes (nome) VALUES 
("Alergia e Imunologia"),
("Anestesiologia"),
("Angiorradiologia e Cirurgia Endovascular"),
("Cardiologia"),
("Cirurgia Cardiovascular"),
("Cirurgia Crânio-Maxilo-Facial"),
("Cirurgia Geral"),
("Cirurgia Plástica"),
("Cirurgia Torácica"),
("Cirurgia Vascular"),
("Clínica Médica"),
("Coloproctologia"),
("Dermatologia"),
("Endocrinologia e Metabologia"),
("Endoscopia"),
("Gastroenterologia"),
("Genética Médica"),
("Geriatria"),
("Ginecologia e Obstetrícia"),
("Hematologia e Hemoterapia"),
("Hemodinâmica e Cardiologia Intervencionista"),
("Homeopatia"),
("Infectologia"),
("Mastologia"),
("Medicina de Família e Comunidade"),
("Medicina do Trabalho"),
("Medicina Esportiva"),
("Medicina Física e Reabilitação"),
("Medicina Intensiva"),
("Medicina Legal e Perícia Médica"),
("Medicina Nuclear"),
("Medicina Preventiva e Social"),
("Nefrologia"),
("Neurocirurgia"),
("Neurologia"),
("Nutrologia"),
("Oftalmologia"),
("Oncologia Clínica"),
("Ortopedia e Traumatologia"),
("Otorrinolaringologia"),
("Patologia"),
("Patologia Clínica/Medicina Laboratorial"),
("Pediatria"),
("Pneumologia"),
("Psiquiatria"),
("Radiologia e Diagnóstico por Imagem"),
("Radioterapia"),
("Reumatologia"),
("Urologia")
;