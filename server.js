require("dotenv").config();
const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./db/connection.sql");
//User prompt
console.log(`
     _____           _                     _____                         
    |   __|_____ ___| |___ _ _ ___ ___    |     |___ ___ ___ ___ ___ ___ 
    |   __|     | . | | . | | | -_| -_|   | | | | .'|   | .'| . | -_|  _|
    |_____|_|_|_|  _|_|___|_  |___|___|   |_|_|_|__,|_|_|__,|_  |___|_|  
                |_|       |___|                             |___|      
                `);
const userPrompt = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to look at/do?",
      choices: [
        "View all department",
        "View all roles",
        "View all employees",
        "Add a department",
        "Delete a department",
        "Add a role",
        "Delete a role",
        "Add an employee",
        "Delete an employee",
        "Show budgets in departments",
        "Exit",
      ],
    },
  ]);

  if (answers.action === "View all department") {
    viewDepartments();
  } else if (answers.action === "View all roles") {
    viewRoles();
  } else if (answers.action === "View all employees") {
    viewEmployees();
  } else if (answers.action === "Add a department") {
    addDepartment();
  } else if (answers.action === "Delete a department") {
    deleteDepartment();
  } else if (answers.action === "Add a role") {
    addRole();
  } else if (answers.action === "Delete a role") {
    deleteRole();
  } else if (answers.action === "Add an employee") {
    addEmployee();
  } else if (answers.action === "Delete an employee") {
    deleteEmployee();
  } else if (answers.action === "Update an employee role") {
    updateEmployee();
  } else if (answers.action === "Show budgets in departments") {
    budget();
  } else {
    process.exit(0);
  }
};
//table for departments
const viewDepartments = async () => {
  try {
    const [results] = await connection
      .promise()
      .query(`SELECT * FROM department`);
    console.log("====== Departments ======");
    console.table(results);

    userPrompt();
  } catch (err) {
    throw new Error(err);
  }
};
//table for roles
const viewRoles = async () => {
  try {
    const [results] = await connection.promise().query(`SELECT * FROM role`);
    console.log("====== Roles ======");
    console.table(results);
    userPrompt();
  } catch (err) {
    throw new Error(err);
  }
};
//table for employees
const viewEmployees = async () => {
  try {
    const [results] = await connection
      .promise()
      .query(`SELECT * FROM employee`);
    console.log("====== Employees ======");
    console.table(results);
    userPrompt();
  } catch (err) {
    throw new Error(err);
  }
};
//adding new department
const addDepartment = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Department name: ",
    },
  ]);
  try {
    const [results] = await connection
      .promise()
      .query(`INSERT INTO department (name) VALUES (?)`, answers.name);
  } catch (err) {
    throw new Error(err);
  }
  console.log("====== Add new Department! ======");
  viewDepartments();
  userPrompt();
};

//deleting a department
const deleteDepartment = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Department name you want to delete",
    },
  ]);
  try {
    const [results] = await connection
      .promise()
      .query("DELETE FROM department WHERE name = ?", answers.name);
  } catch (err) {
    throw new Error(err);
  }
  console.log("====== Department deleted ======");
  userPrompt();
};

//adding a new role
const addRole = async () => {
  connection.query("SELECT * FROM department", async (err, res) => {
    const departmentNameRole = res.map((department) => department.name);
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Role title: ",
      },
      {
        type: "number",
        name: "salary",
        message: "Salary: ",
      },
      {
        type: "list",
        name: "departmentName",
        choices: departmentNameRole,
      },
    ]);
    try {
      const department = res.find(
        (department) => department.name === answers.departmentName
      );
      const [results] = await connection
        .promise()
        .query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [answers.title, answers.salary, department.id]
        );
      console.log(answers.title, answers.salary, department.id);
    } catch (err) {
      throw new Error(err);
    }
    console.log("====== New Role added =======");
    viewRoles();
    userPrompt();
  });
};

//deleting role

const deleteRole = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Role you want to delete",
    },
  ]);
  try {
    const [results] = await connection
      .promise()
      .query("DELETE FROM role WHERE title = ?", answers.title);
  } catch (err) {
    throw new Error(err);
  }
  console.log("====== Role deleted ======");
  userPrompt();
};

//adding new employees
const addEmployee = async () => {
  connection.query("SELECT * FROM role", async (err, res) => {
    const roleTitle = res.map((role) => role.title);
    const managersId = res.map((manager_id) => manager_id.id);
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "First Name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Last Name",
      },
      {
        type: "list",
        name: "roleName",
        message: "Role name",
        choices: roleTitle,
      },
      {
        type: "input",
        name: "manager_id",
        message: "what is the managers id #?",
        choices: managersId,
      },
    ]);
    try {
      const role = res.find((role) => role.title === answers.roleName);
      const manager = res.find((manager) => manager.id === answers.manager_id);
      const [results] = await connection
        .promise()
        .query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [answers.first_name, answers.last_name, role.id, answers.manager_id]
        );
    } catch (err) {
      throw new Error(err);
    }
    console.log("====== Employee added ======");
    viewEmployees();
    userPrompt();
  });
};
//deleting employees
const deleteEmployee = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Employee's id you want to delete",
    },
  ]);
  try {
    const [results] = await connection
      .promise()
      .query("delete from employee where id = ?", answers.id);
  } catch (err) {
    throw new Error(err);
  }
  console.log("====== Employee deleted ======");
  userPrompt();
};
//budget
const budget = async () => {
  console.log("test");
  try {
    const [results] = await connection
      .promise()
      .query(
        `SELECT department_id, SUM(salary) AS total FROM role GROUP BY department_id`
      );
    console.log("====== This Years Budget ======");
    console.table(results);
    userPrompt();
  } catch (err) {
    throw new Error(err);
  }
};

userPrompt();
