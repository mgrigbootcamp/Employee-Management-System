DROP DATABASE IF EXISTS employeeManagement_DB;
CREATE DATABASE employeeManagement_DB;

USE employeeManagement_DB;

CREATE TABLE employee(
    id int primary key,
    first_name varchar (30),
    last_name varchar (30),
    role_id INT,
    manager_id INT,\
    foreign key (role_id) references role(id),
    foreign key (manager_id) references role (id)
);

CREATE TABLE role (
    id int primary key,
    title varchar (30),
    salary decimal,
    department_id INT,
    foreign key (department_id) references department (id)
);

CREATE TABLE department (
    id INT,
    name varchar (30)
);