INSERT INTO department (name) VALUES ("Engineering", "Finance" , "Sales", "Legal");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 80000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 150000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 120000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Account Manager", 160000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 125000, 6);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Team Lead", 250000, 7);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 190000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Megan", "Rakow", 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jon", "Rakow", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Rakow", 7, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andy", "Rakow", 8, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jill", "Rakow", 5, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Remy", "Rakow", 6, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Oliver", "Rakow", 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Nikkie", "Rakow", 2, 4);