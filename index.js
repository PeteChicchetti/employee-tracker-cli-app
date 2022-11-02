const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to 
const db = mysql.createConnection(
    {
        user: 'root',
        password: 'rootroot',
        database: 'business_db'
    },

    console.log('Connected to the business_db.')
);

function init() {
    
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
    });
};

init();