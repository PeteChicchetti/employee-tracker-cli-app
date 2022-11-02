INSERT INTO department (name)
VALUES  ('Service'),
        ('Installation'),
        ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Lead Tech', 60000, 1),
        ('Technician', 50000, 1),
        ('Lead Installer', 45000, 2),
        ('Installer', 37000, 2),
        ('HR Admin', 65000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Pete', 'Chicchetti', 1, NULL),
        ('John', 'Smith', 2, 1),
        ('Chistopher', 'Lee', 3, NULL),
        ('Elliot', 'Smith', 4, 3),
        ('Verónica', 'Rodriguez', 5, NULL);