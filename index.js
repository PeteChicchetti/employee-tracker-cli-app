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

// function init() {

//     art.font('Employee Tracker', 'doom', (err, rendered) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(rendered);
//             menu();
//         }
//     });
// };

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
        // let newEmployee = {${answers.fName}}
    ]).then(answers => {
        db.query('INSERT INTO employee SET ?', answers, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(`First: ${answers.first_name}, Last: ${answers.last_name}, Role ID: ${answers.role_id}`);
                menu();
            }
        });
    })
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
            db.query('Select * FROM employee', function (err, results) {
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
        } else if (answers.selection === 'Add Employee') {
            employee();
        }
        
    });
}

menu();
// init();