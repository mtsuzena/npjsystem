create schema npjsystem;

create table npjsystem.users (
	id serial primary key,
	username text not null,
	email text not null,
    password text not null
);