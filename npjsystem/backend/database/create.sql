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

INSERT INTO profiles(id, name, description, "createdAt", "updatedAt") VALUES (500, 'ADMIN', 'System Admin', (SELECT NOW()), (SELECT NOW()));

insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 501);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 502);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 503);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 504);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 505);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 506);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 507);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 508);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 509);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 510);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 511);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 512);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 513);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 514);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 515);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 516);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 517);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 518);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 519);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 520);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 521);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 522);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 523);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 524);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 525);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 526);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 527);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 528);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 529);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 530);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 531);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 532);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 533);
insert into profile_roles("createdAt", "updatedAt", "profileId", "roleId") values ((SELECT NOW()), (SELECT NOW()), 500, 534);

insert into users (id, "name", email, "lastName", "aboutMe", "cep", "state", "city", "addres", "password", "userActive", "profileId", "createdAt", "updatedAt") values (100000, 'Admin', 'admin@gmail.com', 'Last Name', 'About Me kkk \n asd', '83704304', 'PR', 'City Admin', 'Addres Admin', '$2a$10$efMdAjZunBI8XnV.UZ8OW.0BQqDOa3sXeXcWboGy8ejlisBtBPEom', true, 500, (SELECT NOW()), (SELECT NOW()));

/* ARRUMAR DADOS POSTERIORMENTE */

INSERT INTO "processTypes"(id, name, "createdAt", "updatedAt") VALUES (501, 'Process Type 1', (SELECT NOW()), (SELECT NOW()));
INSERT INTO customers(id, name, "lastName", "createdAt", "updatedAt") VALUES (501, 'Customer Name 1', 'Customer Lastname 1', (SELECT NOW()), (SELECT NOW()));
INSERT INTO processes(id, "number", "requerido", "pastaFisica", "userId", "customerId", "processTypeId", begins_date, court_hearing_date, "createdAt", "updatedAt") VALUES (501, '0004142-55.2021.8.16.0025', 'Requerido Test', 'Pasta Fisica 1', 100000, 501, 501, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));

INSERT INTO "processTypes"(id, name, "createdAt", "updatedAt") VALUES (502, 'Process Type 2', (SELECT NOW()), (SELECT NOW()));
INSERT INTO customers(id, name, "lastName", "createdAt", "updatedAt") VALUES (502, 'Customer Name 2', 'Customer Lastname 2', (SELECT NOW()), (SELECT NOW()));
INSERT INTO processes(id, "number", "requerido", "pastaFisica", "userId", "customerId","processTypeId", begins_date, court_hearing_date, "createdAt", "updatedAt") VALUES (502, '0004141-41.2021.8.16.0025', 'Requerido Test2', 'Pasta Fisica 2', 100000, 502, 502, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));

INSERT INTO "processChecklists"(id, name, "processId", status, "isChecked",deadline,"createdAt", "updatedAt") VALUES (501, 'Checklist 1', 502, 0, false, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));
INSERT INTO "processChecklists"(id, name, "processId", status, "isChecked",deadline,"createdAt", "updatedAt") VALUES (502, 'Checklist 2', 502, 1, true, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));
INSERT INTO "processChecklists"(id, name, "processId", status,  "isChecked",deadline,"createdAt", "updatedAt") VALUES (503, 'Checklist 3', 502, 2, true, (SELECT NOW()), (SELECT NOW()), (SELECT NOW()));


commit;