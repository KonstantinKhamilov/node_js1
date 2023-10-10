-- Создание таблицы employees
CREATE TABLE corporation.employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birth_date DATE,
    gender CHAR(1),
    salary DECIMAL(10, 2),
    department_id INT
);

-- Добавление данных в таблицу employees
INSERT INTO corporation.employees (id, first_name, last_name, birth_date, gender, salary, department_id)
VALUES (1, 'Иван', 'Иванов', '1980-01-01', 'M', 10000, 1),
       (2, 'Мария', 'Петрова', '1985-02-02', 'F', 12000, 2);

-- Создание таблицы departments
CREATE TABLE corporation.departments (
    id INT PRIMARY KEY,
    department_name VARCHAR(50),
    manager_id INT
);

-- Добавление данных в таблицу departments
INSERT INTO corporation.departments (id, department_name, manager_id)
VALUES (1, 'Отдел продаж', 1),
       (2, 'Отдел маркетинга', 2);

-- Создание таблицы clients
CREATE TABLE corporation.clients (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    department_id INT
);

-- Добавление данных в таблицу clients
INSERT INTO corporation.clients (id, first_name, department_id)
VALUES (1, 'Клиент 1', 1),
       (2, 'Клиент 2', 2);

-- Создание таблицы sales
CREATE TABLE corporation.sales (
    id INT PRIMARY KEY,
    employee_id INT,
    amount DECIMAL(10, 2)
);

-- Добавление данных в таблицу sales
INSERT INTO corporation.sales (id, employee_id, amount)
VALUES (1, 1, 25000),
       (2, 2, 30000);

-- 1. Создание базы данных corporation
CREATE DATABASE corporation;

-- 2. Создание таблицы employees
CREATE TABLE corporation.employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birth_date DATE,
    gender CHAR(1)
);

-- 3. Добавление колонки salary
ALTER TABLE corporation.employees
ADD salary DECIMAL(10, 2);

-- 4. Добавление нескольких сотрудников
INSERT INTO corporation.employees (id, first_name, last_name, birth_date, gender, salary)
VALUES (1, 'Иван', 'Иванов', '1980-01-01', 'M', 10000),
       (2, 'Мария', 'Петрова', '1985-02-02', 'F', 12000);

-- 5. Получение всех сотрудников из базы данных
SELECT * FROM corporation.employees;

-- 6. Получение всех сотрудников из базы данных и сортировка их по зарплате от наибольшей до наименьшей
SELECT * FROM corporation.employees ORDER BY salary DESC;

-- 7. Получение всех сотрудников из базы данных и сортировка их по полу и имени
SELECT * FROM corporation.employees ORDER BY gender DESC, first_name;

-- 8. Получение только имени и зарплаты сотрудников, а также ограничение количества результатов до 2
SELECT first_name, salary FROM corporation.employees LIMIT 2;

-- 9. Получение списка уникальных полов сотрудников
SELECT DISTINCT gender FROM corporation.employees;

-- 10. Получение мужчин, которые родились после 1970 года и имеют зарплату от $10000
SELECT * FROM corporation.employees WHERE gender = 'M' AND birth_date > '1970-01-01' AND salary >= 10000;
