const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const chalk = require('chalk');
const connection = mysql.createConnection({
    host: 'localhost',
    port: "3306",
    user: "root",
    password: 'Ma93tthew!',
    database: 'employeeManagement_DB'
});
let exitTracker = chalk.redBright("Exit")
const employeeTracker = async () => {
    inquirer.prompt(
        questions
    )
}
const questions = [
    {
        type: "list",
        message: "What do you want to do?",
        name: "options",
        choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "View Departments",
            "View Roles",
            "View All Employees",
            "Update Employee Role",
            exitTracker
        ]
    },
    {
        type: "input",
        message: "What is the name of your department?",
        name: "addDept",
        when: (answers) => {
            if (answers.options == 'Add Department') {
                return true;
            } else { return false; }
        }
    },
    {
        type: "input",
        message: "What is the title of the role?",
        name: "newRoleTitle",
        when: (answers) => {
            if (answers.options == 'Add Role') {
                return true;
            } else { return false; }
        }
    },
    {
        type: 'input',
        name: 'title',
        message: 'Enter a title',
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter a salary for the role',
        validate(value) {
            const valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
    },
    {
        type: 'input',
        name: 'department_id',
        message: 'Enter a department id',
    },
];

const answers = (answers) => {
    switch (answers.options) {
        case "Add Department":
            connection.query(
                `INSERT INTO department (name) VALUES ('${answers.addDept}')`,
                function (err, results, fields) {
                    restart()
                }
            )
            // restart()
            break;
            case exitTracker:
                // code here
                console.log('Bye!!')
                process.exit()  
        case "Add Role":
            // code here
            connection.query(
                `INSERT INTO role (title,salary,department_id) VALUES('${answers.newRoleTitle}','${answers.newRoleSalary}',(SELECT id FROM department WHERE name='${answers.newRoleDeptId}'))`,
                function (err, results, fields) {
                    console.log('Role Added!!');
                    restart()
                }
            )
            break;

        default:
            break;
    }
}

// function startEmployeeTracker (){
//     inquirer.prompt(questions).then((answers) => {
//         //   var data=JSON.stringify(answers, null, '  ');
//         console.log(answers);
    
//     });
// }
function startEmployeeTracker (){
    inquirer.prompt(questions).then(answers)
    
    
}
startEmployeeTracker ();
function restart (){
    startEmployeeTracker ();
}