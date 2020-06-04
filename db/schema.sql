DROP DATABASE IF EXISTS tracker;
CREATE DATABASE tracker;
USE tracker;
CREATE TABLE department
(
    id INT
    unsigned auto_increment PRIMARY KEY,
    name VARCHAR
    (30) unique NOT NULL 
);

    CREATE TABLE role(
        id INT
        unsigned auto_increment PRIMARY KEY,
    title VARCHAR
        (30) NOT NULL,
    salary DECIMAL unsigned NOT NULL,
    department_id INT unsigned NOT NULL

);
        CREATE TABLE employee
        (
            id INT
            unsigned auto_increment PRIMARY KEY,
    first_name VARCHAR
            (30) NOT NULL,
    last_name VARCHAR
            (30) NOT NULL,
    role_id INT unsigned NOT NULL,
    manager_id INT unsigned
);
