create database if not exists TodoAppDB character set utf8;

use TodoAppDB;

create table if not exists Tasks (
	id int auto_increment primary key,
    task varchar(255) not null,
    description text,
    finished boolean not null default false,
    created_at timestamp default current_timestamp
);