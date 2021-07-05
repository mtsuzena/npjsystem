INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (501, 'CREATE_ROLE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (502, 'READ_ROLE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (503, 'UPDATE_ROLE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (504, 'DELETE_ROLE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (505, 'CREATE_USER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (506, 'READ_USER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (507, 'UPDATE_USER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (508, 'DELETE_USER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (509, 'CREATE_PROFILE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (510, 'READ_PROFILE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (511, 'UPDATE_PROFILE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (512, 'DELETE_PROFILE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (513, 'CREATE_PROCESS_TYPE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (514, 'READ_PROCESS_TYPE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (515, 'UPDATE_PROCESS_TYPE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (516, 'DELETE_PROCESS_TYPE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (517, 'CREATE_PROCESS_CHECKLIST', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (518, 'READ_PROCESS_CHECKLIST', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (519, 'UPDATE_PROCESS_CHECKLIST', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (520, 'DELETE_PROCESS_CHECKLIST', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (521, 'CREATE_PROCESS', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (522, 'READ_PROCESS', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (523, 'UPDATE_PROCESS', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (524, 'DELETE_PROCESS', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (525, 'CREATE_CUSTOMER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (526, 'READ_CUSTOMER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (527, 'UPDATE_CUSTOMER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (528, 'DELETE_CUSTOMER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (529, 'CREATE_CONSULTATION', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (530, 'READ_CONSULTATION', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (531, 'UPDATE_CONSULTATION', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (532, 'DELETE_CONSULTATION', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (533, 'CREATE_SYSTEM_LOG', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (534, 'READ_SYSTEM_LOG', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (535, 'CREATE_PROCESS_MOVEMENTS', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (536, 'READ_PROCESS_MOVEMENTS', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (537, 'CREATE_DOCUMENT', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (538, 'UPDATE_DOCUMENT', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (539, 'UPLOAD_DOCUMENT', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (540, 'DOWNLOAD_DOCUMENT', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (541, 'REVIEW_DOCUMENT', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (542, 'CREATE_AUDIENCIA', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (543, 'READ_AUDIENCIA', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (544, 'CREATE_TESTEMUNHA_AUDIENCIA', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (545, 'READ_TESTEMUNHA_AUDIENCIA', (SELECT NOW()), (SELECT NOW()));

INSERT INTO profiles(id, name, description, "createdAt", "updatedAt") VALUES (501, 'ADMIN', 'Admnistrador do Sistema', (SELECT NOW()), (SELECT NOW()));

insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 501);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 502);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 503);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 504);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 505);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 506);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 507);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 508);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 509);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 510);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 511);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 512);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 513);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 514);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 515);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 516);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 517);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 518);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 519);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 520);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 521);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 522);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 523);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 524);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 525);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 526);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 527);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 528);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 529);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 530);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 531);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 532);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 533);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 534);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 535);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 536);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 537);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 538);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 539);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 540);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 541);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 542);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 543);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 544);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 501, 545);

insert into users (id, "name", email, "imgSrc","lastName", "aboutMe", "cep", "state", "city", "addres", "password", "userActive", "profileId", "createdAt", "updatedAt") values (501, 'Genilma', 'genilma.moura@npjsystem.com', 'avatar_feminino_exemplo_1.jpeg', 'Moura', 'Coordenadora do Núcleo de Prática Jurídica', '83704304', 'PR', 'Araucaria', 'Rua Alberto Silva', '$2a$10$efMdAjZunBI8XnV.UZ8OW.0BQqDOa3sXeXcWboGy8ejlisBtBPEom', true, 501, (SELECT NOW()), (SELECT NOW()));

/* ARRUMAR DADOS POSTERIORMENTE */

INSERT INTO "processTypes"(id, name, "createdAt", "updatedAt") VALUES (501, 'Ação de Alimentos', (SELECT NOW()), (SELECT NOW()));
INSERT INTO customers(id, name, "lastName", "createdAt", "updatedAt") VALUES (501, 'Maria', 'da Silva', (SELECT NOW()), (SELECT NOW()));
INSERT INTO processes(id, "number", "requerido", "pastaFisica", "userId", "customerId", "processTypeId", begins_date, court_hearing_date, "createdAt", "updatedAt") VALUES (501, '0004142-55.2021.8.16.0025', 'João Henrique da Silva', '73-E', 501, 501, 501, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));

INSERT INTO "processTypes"(id, name, "createdAt", "updatedAt") VALUES (502, 'Divórcio Consensual', (SELECT NOW()), (SELECT NOW()));     
INSERT INTO customers(id, name, "lastName", "createdAt", "updatedAt") VALUES (502, 'Vanessa', 'Simoes', (SELECT NOW()), (SELECT NOW()));
INSERT INTO processes(id, "number", "requerido", "pastaFisica", "userId", "customerId","processTypeId", begins_date, court_hearing_date, "createdAt", "updatedAt") VALUES (502, '0004141-41.2021.8.16.0025', 'Lucas Simoes', '75-E', 501, 502, 502, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));


-- criar perfil professor
INSERT INTO profiles (id, name, description, "createdAt", "updatedAt")
VALUES (502, 'PROFESSOR', 'PROFESSOR', now(),now());

-- adicionar roles pro professor
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 502, 541);

--criar usuers professores
INSERT INTO users (id, name, "lastName", "imgSrc", email, "aboutMe", cep, state, city, addres, password, "userActive", "createdAt", "updatedAt", "profileId")
VALUES (502, 'Carlos', 'Gouvea', '', 'carlos.gouvea@npjsystem.com',
        'Professor do curso Sistemas de Informação', '83709300', 'PR', 'Araucária', 'Rua das Flores', '$2a$10$efMdAjZunBI8XnV.UZ8OW.0BQqDOa3sXeXcWboGy8ejlisBtBPEom', true, now(), now(), 502);
INSERT INTO users (id, name, "lastName", "imgSrc", email, "aboutMe", cep, state, city, addres, password, "userActive", "createdAt", "updatedAt", "profileId")
VALUES (503, 'Camila', 'Marques', '', 'camila.marques@npjsystem.com',
        'Professora do curso de Direito', '83709590', 'PR', 'Araucária', 'Rua das Camélias', '$2a$10$efMdAjZunBI8XnV.UZ8OW.0BQqDOa3sXeXcWboGy8ejlisBtBPEom', true, now(), now(), 502);


-- criar perfil estagiario
INSERT INTO profiles (id, name, description, "createdAt", "updatedAt")
VALUES (503, 'ESTAGIARIO', 'ESTAGIARIO', now(),now());

INSERT INTO users (id, name, "lastName", "imgSrc", email, "aboutMe", cep, state, city, addres, password, "userActive", "createdAt", "updatedAt", "profileId")
VALUES (504, 'Jheniffer', 'Silva', '', 'jheniffer.silva@npjsystem.com',
        'Estudando de Direito', '83709590', 'PR', 'Araucária', 'Rua das Camélias', '$2a$10$efMdAjZunBI8XnV.UZ8OW.0BQqDOa3sXeXcWboGy8ejlisBtBPEom', true, now(), now(), 503);


-- adiciona checklists
INSERT INTO "processChecklists"(id, name, "processId", "userId", deadline,"createdAt", "updatedAt") VALUES (501, 'Petição', 502, 501, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));
INSERT INTO "processChecklists"(id, name, "processId", "userId", deadline,"createdAt", "updatedAt") VALUES (502, 'Procuração e Declaração', 502, 502, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));

-- adiciona checklists
INSERT INTO "processChecklists"(id, name, "processId", "userId", deadline,"createdAt", "updatedAt") VALUES (503, 'Petição', 501, 501, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));
INSERT INTO "processChecklists"(id, name, "processId", "userId", deadline,"createdAt", "updatedAt") VALUES (504, 'Procuração e Declaração', 501, 502, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));


commit;