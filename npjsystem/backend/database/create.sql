INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (1, 'CREATE_ROLE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (2, 'READ_ROLE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (3, 'UPDATE_ROLE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (4, 'DELETE_ROLE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (5, 'CREATE_USER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (6, 'READ_USER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (7, 'UPDATE_USER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (8, 'DELETE_USER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (9, 'CREATE_PROFILE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (10, 'READ_PROFILE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (11, 'UPDATE_PROFILE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (12, 'DELETE_PROFILE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (13, 'CREATE_PROCESS_TYPE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (14, 'READ_PROCESS_TYPE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (15, 'UPDATE_PROCESS_TYPE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (16, 'DELETE_PROCESS_TYPE', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (17, 'CREATE_PROCESS_CHECKLIST', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (18, 'READ_PROCESS_CHECKLIST', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (19, 'UPDATE_PROCESS_CHECKLIST', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (20, 'DELETE_PROCESS_CHECKLIST', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (21, 'CREATE_PROCESS', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (22, 'READ_PROCESS', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (23, 'UPDATE_PROCESS', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (24, 'DELETE_PROCESS', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (25, 'CREATE_CUSTOMER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (26, 'READ_CUSTOMER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (27, 'UPDATE_CUSTOMER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (28, 'DELETE_CUSTOMER', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (29, 'CREATE_CONSULTATION', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (30, 'READ_CONSULTATION', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (31, 'UPDATE_CONSULTATION', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (32, 'DELETE_CONSULTATION', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (33, 'CREATE_SYSTEM_LOG', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (34, 'READ_SYSTEM_LOG', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (35, 'CREATE_PROCESS_MOVEMENTS', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (36, 'READ_PROCESS_MOVEMENTS', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (37, 'CREATE_DOCUMENT', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (38, 'UPDATE_DOCUMENT', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (39, 'UPLOAD_DOCUMENT', (SELECT NOW()), (SELECT NOW()));
INSERT INTO roles(id, name, "createdAt", "updatedAt") VALUES (40, 'DOWNLOAD_DOCUMENT', (SELECT NOW()), (SELECT NOW()));

INSERT INTO profiles(id, name, description, "createdAt", "updatedAt") VALUES (1, 'ADMIN', 'System Admin', (SELECT NOW()), (SELECT NOW()));

insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 1);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 2);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 3);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 4);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 5);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 6);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 7);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 8);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 9);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 10);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 11);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 12);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 13);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 14);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 15);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 16);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 17);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 18);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 19);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 20);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 21);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 22);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 23);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 24);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 25);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 26);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 27);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 28);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 29);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 30);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 31);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 32);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 33);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 34);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 35);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 36);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 37);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 38);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 39);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 1, 40);

insert into users (id, "name", email, "imgSrc","lastName", "aboutMe", "cep", "state", "city", "addres", "password", "userActive", "profileId", "createdAt", "updatedAt") values (1, 'Genilma Moura', 'admin@gmail.com', '@/assets/avatar/avatar_masculino_exemplo_1.jpeg', 'Last Name', 'About Me kkk \n asd', '83704304', 'PR', 'City Admin', 'Addres Admin', '$2a$10$efMdAjZunBI8XnV.UZ8OW.0BQqDOa3sXeXcWboGy8ejlisBtBPEom', true, 1, (SELECT NOW()), (SELECT NOW()));

/* ARRUMAR DADOS POSTERIORMENTE */

INSERT INTO "processTypes"(id, name, "createdAt", "updatedAt") VALUES (1, 'Process Type 1', (SELECT NOW()), (SELECT NOW()));
INSERT INTO customers(id, name, "lastName", "createdAt", "updatedAt") VALUES (1, 'Customer Name 1', 'Customer Lastname 1', (SELECT NOW()), (SELECT NOW()));
INSERT INTO processes(id, "number", "requerido", "pastaFisica", "userId", "customerId", "processTypeId", begins_date, court_hearing_date, "createdAt", "updatedAt") VALUES (1, '0004142-55.2021.8.16.0025', 'Requerido Test', 'Pasta Fisica 1', 1, 1, 1, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));

INSERT INTO "processTypes"(id, name, "createdAt", "updatedAt") VALUES (2, 'Process Type 2', (SELECT NOW()), (SELECT NOW()));
INSERT INTO customers(id, name, "lastName", "createdAt", "updatedAt") VALUES (2, 'Customer Name 2', 'Customer Lastname 2', (SELECT NOW()), (SELECT NOW()));
INSERT INTO processes(id, "number", "requerido", "pastaFisica", "userId", "customerId","processTypeId", begins_date, court_hearing_date, "createdAt", "updatedAt") VALUES (2, '0004141-41.2021.8.16.0025', 'Requerido Test2', 'Pasta Fisica 2', 1, 2, 2, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));

INSERT INTO "processChecklists"(id, name, "processId", status, "isChecked",deadline,"createdAt", "updatedAt") VALUES (1, 'Checklist 1', 2, 0, false, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));
INSERT INTO "processChecklists"(id, name, "processId", status, "isChecked",deadline,"createdAt", "updatedAt") VALUES (2, 'Checklist 2', 2, 1, true, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));
INSERT INTO "processChecklists"(id, name, "processId", status,  "isChecked",deadline,"createdAt", "updatedAt") VALUES (3, 'Checklist 3', 2, 2, true, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));


-- criar perfil professor
INSERT INTO profiles (id, name, description, "createdAt", "updatedAt")
VALUES (2, 'PROFESSOR', 'PROFESSOR', now(),now());

--criar usuers professores
INSERT INTO users (id, name, "lastName", "imgSrc", email, "aboutMe", cep, state, city, addres, password, "userActive", "createdAt", "updatedAt", "profileId")
VALUES (2, 'Carlos', 'Eduardo Mário Nicolas Aragão', '', 'gabrielmanoelleonardomoura@danzarin.com.br',
        'About Me kkk \n asd', '83709300', 'PR', 'Araucária', 'Rua das Flores', '$2a$10$efMdAjZunBI8XnV.UZ8OW.0BQqDOa3sXeXcWboGy8ejlisBtBPEom', true, now(), now(), 2);
INSERT INTO users (id, name, "lastName", "imgSrc", email, "aboutMe", cep, state, city, addres, password, "userActive", "createdAt", "updatedAt", "profileId")
VALUES (3, 'Gabriel', 'Manoel Leonardo Moura', '', 'gabrielmanoelleonardomoura@danzarin.com.br',
        'About Me kkk \n asd', '83709590', 'PR', 'Araucária', 'Rua das Camélias', '$2a$10$efMdAjZunBI8XnV.UZ8OW.0BQqDOa3sXeXcWboGy8ejlisBtBPEom', true, now(), now(), 2);


commit;