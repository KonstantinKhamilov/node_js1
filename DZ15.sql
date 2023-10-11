-- Максимальная, минимальная и средняя зарплаты сотрудников
SELECT MAX(salary) AS max_salary, MIN(salary) AS min_salary, AVG(salary) AS avg_salary FROM corporation.employees;

-- Количество сотрудников в каждом отделе
SELECT department_id, COUNT(*) AS employee_count FROM corporation.employees GROUP BY department_id;

-- Средняя зарплата мужчин и женщин
SELECT gender, AVG(salary) AS avg_salary FROM corporation.employees GROUP BY gender;

-- Сотрудники, которые родились с 1960 по 1969 годы
SELECT * FROM corporation.employees WHERE birth_date LIKE '196_';

-- Имена всех сотрудников и клиентов
(SELECT first_name FROM corporation.employees)
UNION ALL
(SELECT first_name FROM corporation.clients);

-- Название каждого отдела вместе с именем менеджера
SELECT corporation.departments.department_name, corporation.employees.first_name AS manager_name 
FROM corporation.departments 
LEFT JOIN corporation.employees ON corporation.departments.manager_id = corporation.employees.id;

-- Имя каждого клиента, название отдела, где клиент обслуживается, и имя менеджера этого отдела
SELECT corporation.clients.first_name AS client_name, corporation.departments.department_name, corporation.employees.first_name AS manager_name 
FROM corporation.clients 
JOIN corporation.departments ON corporation.clients.department_id = corporation.departments.id 
JOIN corporation.employees ON corporation.departments.manager_id = corporation.employees.id;

-- Имена всех сотрудников, которые продали больше 25000
SELECT first_name 
FROM corporation.employees 
WHERE id IN (SELECT employee_id FROM corporation.sales WHERE amount > 25000);
