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
