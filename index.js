const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db/index_var");
require("console.table");

init();

// Display logo text, load main prompts
function init() {
  // Utilize asciiart-logo
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadMainPrompts();
}

async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },

        // Quit
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]);

  // Call the appropriate function depending on what the user chose
  console.log("CHOICE" + choice);
  switch (choice) {
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "VIEW_ROLES":
      return viewRoles();
    case "ADD_ROLE":
      return addRole();
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    
    // QUIT
    default:
      return quit();
  }
}

async function viewDepartments() {
  // Using await to call database function "find all departments" and assign the resultant array to a variable
  // UNCOMMENT the following line and add your code
  const YOUR_VARIALBE = await db.findAllDepartments();

  console.log("\n");
  // Prints "Hello, World !!!" from db.findAllDepartments on console
  console.table(YOUR_VARIALBE);

  loadMainPrompts();
}

async function addDepartment() {
  const YOUR_DEPT_VARIABLE = await prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]);

  // Using await to call database function to create department and assign the result to a variable
  // UNCOMMENT the following line and add your code
  // await db.YOUR_DB_FUNCTION(YOUR_DEPT_VARIABLE);

  
  console.log("Added " + YOUR_DEPT_NAME + " to the database");

  loadMainPrompts();
}

async function viewRoles() {
  // Using await to call database function to find all roles and assign the resultant array to a variable
  // UNCOMMENT the following line and add your code
  // const roles = await db.YOUR_DB_FUNCTION();


  console.log("\n");
  console.table(roles);

  loadMainPrompts();
}

async function addRole() {
  // Call your database funtion to select all roles and assign the result to a variable
  const YOUR_ROLE_VAR = await db.findAllRoles();

  const YOUR_DEPT_CHOICES = YOUR_ROLE_VAR.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?",
    },
    {
      name: "salary",
      message: "What is the salary of the role?",
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: YOUR_DEPT_CHOICES,
    },
  ]);

  // UNCOMMENT below to call database function to create role
  // await db.YOUR_DB_FUNCTION_TO_CREATE_ROLE(role);

  console.log(`Added ${role.title} to the database`);

  loadMainPrompts();
}

async function viewEmployees() {
  // Using await keyword to call database function to find all employees and assign the returned result to a variable 
  const YOUR_EMP_VAR = await db.YOUR_DB_FUNCTION_TO_FIND_ALL_EMPS();

  console.log("\n");
  console.table(YOUR_EMP_VAR);

  loadMainPrompts();
}


async function updateEmployeeRole() {
  // Create an employee variable to store the array returned from database find all employees function using await
  const YOUR_EMP_VAR = await db.YOUR_DB_FUNCTION_TO_FIND_ALL();

  // With the array variable from above, create a new array for objects for each element in the array variable
  const YOUR_EMP_CHOICES = YOUR_EMP_VAR.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "YOUR_QUESTION",
      choices: YOUR_EMP_CHOICES, 
    },
  ]);

  const YOUR_ROLES_VAR = await db.YOUR_DB_FUNCTION_FOR_ALL_ROLES();

  const YOUR_ROLE_CHOICES = YOUR_ROLES_VAR.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "YOUR_QUESTION_FOR_ROLE",
      choices: YOUR_ROLE_CHOICES,
    },
  ]);

  await db.YOUR_DB_FUNCTION_FOR_UPDATE(employeeId, roleId);

  console.log("Updated employee's role");

  loadMainPrompts();
}

async function addEmployee() {

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]);

  // Prompt for role choices

  // Assign the role to emplyee
  employee.role_id = roleId;

  // Prompt manager choices

  // Assign the manager choice to employee
  employee.manager_id = managerId;

  await db.YOUR_DB_FUNCTION_TO_CREATE_EMP_(employee);

  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );

  loadMainPrompts();
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
