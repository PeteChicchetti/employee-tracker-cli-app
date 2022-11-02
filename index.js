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
            name: 'fName'
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'lName'
        },
        {
            type: 'list',
            message: 'What is the employees role id?',
            choices: [
                'Lead Technician',
                'Technician',
                'Lead Installer',
                'Installer',
                'HR Admin'
            ],
            name: 'role'
        },
        // let newEmployee = {${answers.fName}}
    ]).then(answers => {
        db.query('INSET INTO employee SET ?', answers, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(`${answers.first_name} ${answers.last_name} added to Roles.`);
                console.table(results);
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
        } else if (answers.selection === 'Add Employee') {
            employee();
        }
        
    });
}

menu();
// init();