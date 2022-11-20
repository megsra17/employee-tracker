require("dotenv").config();
const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("../db/connection");
//User prompt
const userPrompt = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to look at/do?",
      choices: [
        "View all department",
        "View all rols",
        "View all employees",
        "Add a department",
        "Delete a department",
        "Add a role",
        "Delete a role",
        "Add an employee",
        "Delete an employee",
        "Update an employee manager",
        "Show bugets in departments",
        "Exit",
      ],
    },
  ]);

  if (answers.action === "View all department") {
    viewDepartments();
  } else if (answers.action === "View all rols") {
    viewRoles();
  } else if (answers.action === "View all employees") {
    viewEmployees();
  } else if (answers.action === "Add a department") {
    addDepartment();
  } else if (answes.action === "Delete a department") {
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
  } else if (answers.actions === "Show bugets in departments") {
    budget();
  } else {
    connection.end();
  }
};
//table for departments
const viewDepartments = async () => {
  try {
    const [results] = await connection
      .promise()
      .query(`select * from department`);
    console.table(results);
    userPrompt();
  } catch (err) {
    throw new Error(err);
  }
};
//table for roles
const viewRoles = async () => {
  try {
    const [results] = await connection.promise().query(`select * from role`);
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
      .query(`select * from employee`);
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
      .query(`insert into department (name) values (?)`, answers.name);
  } catch (err) {
    throw new Error(err);
  }
  console.log("Add new Department!");
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
      .query("delete from department where name = ?", answers.name);
  } catch (err) {
    throw new Error(err);
  }
  console.log("Department deleted");
  userPrompt();
};
//adding a new role
const addRole = async () => {
  connection.query("select * from department", async (err, res) => {
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
        name: "departmentName: ",
        choices: departmentNameRole,
      },
    ]);
    try {
      const department = res.find(
        (department) => department.name === answers.department
      );
      const [results] = await connection
        .promise()
        .query(
          `insert into role (title, salary, department_id) values (?, ?, ?)`[
            (answers.title, answers.salary, department.id)
          ]
        );
    } catch (err) {
      throw new Error(err);
    }
    console.log("Add new Role");
    viewRoles();
    userPrompt();
  });
  console.log("Add new Department!");
  userPrompt();
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
      .query("delete from role where name = ?", answers.title);
  } catch (err) {
    throw new Error(err);
  }
  console.log("Role deleted");
  userPrompt();
};
//adding new employees
const addEmployee = async () => {
  connection.query("select * from role", async (err, res) => {
    const roleTitle = res.map((role) => role.title);
    const managersId = re.map((manager_id) => manager_id.id);
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
          "insert into employee (first_name,last_name, role_id, manager_id) values (?, ?, ?, ?)",
          [answers.first_name, answers.last_name, role.id, answers.manager_id]
        );
    } catch (err) {
      throw new Error(err);
    }
    console.log("Employee added");
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
  console.log("Employee deleted");
  userPrompt();
};
//updating employees manager
const updateEmployee = async () => {
  const answers = await inquirer.prompt([
    {
      type: "number",
      name: "id",
      message: "Which Employee(id) do you want to update?",
    },
    {
      type: "number",
      name: "role_id",
      message: "Update role (ID)",
    },
  ]);
};

const budget = async () => {
  try {
    const [results] = await connection
      .promise()
      .query(
        `select department_id, sum(salary) as total budget from role group by department_id`
      );
    console.table(results);
    userPrompt();
  } catch (err) {
    throw new Error(err);
  }
};

userPrompt();

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

//Bonus
// Update employee managers.

// View employees by manager.

// View employees by department.

// Delete departments, roles, and employees.

// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
