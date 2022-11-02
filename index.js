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

function menu() {
    inquirer.prompt ([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department'
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
                }
            });
        }
    });
}

menu();
// init();