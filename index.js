const inquirer = require('inquirer');
const mysql = require('mysql2');
const art = require('asciiart-logo');

// Connect to 
const db = mysql.createConnection(
    {
        user: 'root',
        password: 'rootroot',
        database: 'business_db'
    },

    console.log('Connected to the business_db.')
);

// function init () {
//     art.font('Employee Tracker', 'doom', (err, rendered) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(rendered);
//             menu();
//         }
//     });
// }
    
function updateEmployeeRole() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'last_name'
        },
        {
            type: 'input',
            message: 'Input a number that corresponds to the NEW employee role. "1" for Lead Teach, "2" for Technician, "3" for Lead Installer, "4" for Installer or "5" for HR Admin.',
            name: 'role_id'
        },
    ]).then(answers => {
        db.query(`SELECT first_name, last_name, role_id FROM employee WHERE first_name = ${answers.first_name}, last_name = ${answers.last_name} UPDATE employee SET role_id = ${answers.role_id} `, answers, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Name: ${answers.name}`);
                menu();
            }
        });
    });
}


function department() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'name'
        }
    ]).then(answers => {
        db.query('INSERT INTO department SET ?', answers, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Name: ${answers.name}`);
                menu();
            }
        });
    });
}


function roles() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is the employees salary?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Input a number that corresponds to the correct employee department. "1" for Service, "2" for Installation or "3" for Human Resources.',
            name: 'department_id'
        },
    ]).then(answers => {
        db.query('INSERT INTO roles SET ?', answers, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Title: ${answers.title}, Salary: ${answers.salary}, Department: ${answers.department_id}`);
                menu();
            }
        });
    });
}


function employee() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'last_name'
        },
        {
            type: 'input',
            message: 'Input a number that corresponds to the correct employee role. "1" for Lead Teach, "2" for Technician, "3" for Lead Installer, "4" for Installer or "5" for HR Admin.',
            name: 'role_id'
        },
    ]).then(answers => {
        db.query('INSERT INTO employee SET ?', answers, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(`First: ${answers.first_name}, Last: ${answers.last_name}, Role ID: ${answers.role_id}`);
                menu();
            }
        });
    });
}        

function menu() {
    inquirer.prompt ([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Employees',
                'View All Roles',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Update Employee Role'
            ],
            name: 'selection',
        }
    ]).then(answers => {
        console.log(answers);

        if(answers.selection === 'View All Employees') {
            db.query('SELECT employee.id, employee.first_name, employee.last_name, title, name AS department, roles.salary FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id', function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.table(results);
                    menu();
                }
            });
        } else if (answers.selection === 'View All Departments') {
            db.query('Select name FROM department', function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.table(results);
                    menu();
                }
            });
        } else if (answers.selection === 'View All Roles') {
            db.query('Select title FROM roles', function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.table(results);
                    menu();
                }
            });    
        } else if (answers.selection === 'Add Employee') {
            employee();
        } else if (answers.selection === 'Add Role') {
            roles();
        } else if (answers.selection === 'Add Department') {
            department();
        } else if (answers.selection === 'Update Employee Role') {
            updateEmployeeRole();
        }
        
    });
}


// init();
menu();