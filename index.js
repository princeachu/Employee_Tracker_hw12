const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

// Display logo text, load main prompts
function init() {
  // Utilize asciiart-logo
  const logoText = logo({ name: "Employee Tracker" }).render();

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
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },

        // Quit
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
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

// View all departments function
async function viewDepartments() {
  // Using await to call database function "find all departments" and assign the resultant array to a variable
  const departments = await db.findAllDepartments();

  // Format db response to display with console.table
  let deptArrayHolder = [];

  for (let i = 0; i < departments.length; i++) {
    let deptArray = [departments[i].id, departments[i].name];
    deptArrayHolder.push(deptArray);
  }

  // Table Title
  console.log("------------------------------------------------------");
  console.log("DEPARTMENTS");
  console.log("------------------------------------------------------");

  // Display information in table format
  console.table(["ID", "Name"], deptArrayHolder);
  console.log("\n");

  // Ask user what they want to do next
  loadMainPrompts();
}

// Add department function
async function addDepartment() {
  // Ask what the name of the new department is
  const deptTemplate = await prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ]);

  // Using await to call database function to create department
  await db.createDepartment(deptTemplate);

  // Print out success
  console.log("Added " + deptTemplate.name + " to the database");
  console.log("\n");

  // Ask user what they want to do next
  loadMainPrompts();
}

// View all roles function
async function viewRoles() {
  // Using await to call database function to find all roles and assign the resultant array to a variable
  const roles = await db.findAllRoles();

  // Format db response to display with console.table
  let roleArrayHolder = [];

  for (let i = 0; i < roles.length; i++) {
    let roleArray = [
      roles[i].id,
      roles[i].title,
      roles[i].salary,
      roles[i].department_id
    ];
    roleArrayHolder.push(roleArray);
  }

  // Table Title
  console.log("------------------------------------------------------");
  console.log("EMPLOYEE ROLES");
  console.log("------------------------------------------------------");

  // Display information in table format
  console.table(
    ["Role ID", "Title", "Salary", "Derpartment ID"],
    roleArrayHolder
  );

  console.log("\n");

  // Ask user what they want to do next
  loadMainPrompts();
}

// Add role function
async function addRole() {
  // Call your database funtion to select all depts and assign the result to a variable
  const allDepartments = await db.findAllDepartments();

  // Make the departments into an array that can be passed to prompt list type
  const deptChoices = allDepartments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?"
    },
    {
      name: "salary",
      message: "What is the salary of the role?"
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: deptChoices
    }
  ]);

  // Using await to call database function to create the new role
  await db.createRole(role);

  // Display success
  console.log(`Added ${role.title} to the database`);
  console.log("\n");

  // Ask what user wants to do next
  loadMainPrompts();
}

// View employees function
async function viewEmployees() {
  // Using await keyword to call database function to find all employees and assign the returned result to a variable
  const employees = await db.findAllEmployees();

  // Format db response to display with console.table
  let employeesArrayHolder = [];

  for (let i = 0; i < employees.length; i++) {
    let employeeArray = [
      employees[i].id,
      employees[i].first_name,
      employees[i].last_name,
      employees[i].role_id,
      employees[i].manager_id
    ];
    employeesArrayHolder.push(employeeArray);
  }

  // Table Title
  console.log("------------------------------------------------------");
  console.log("EMPLOYEES");
  console.log("------------------------------------------------------");

  // Display information in table format
  console.table(
    ["ID", "First Name", "Last Name", "Role ID", "Manager ID"],
    employeesArrayHolder
  );
  console.log("\n");

  // Ask what user wants to do next
  loadMainPrompts();
}

// Update Employee Role function
async function updateEmployeeRole() {
  // Create an employee variable to store the array returned from database find all employees function using await
  const updateEmployee = await db.findAllEmployees();

  // With the array variable from above, create a new array for objects for each element in the array variable
  const updateEmployeeChoices = updateEmployee.map(
    ({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    })
  );

  // Ask what employee needs to be updated
  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Who do you want to update?",
      choices: updateEmployeeChoices
    }
  ]);

  // Create a role variable to store the array returned from database find all roles function using await
  const updateRole = await db.findAllRoles();

  // With the array variable from above, create a new array for objects for each element in the array variable
  const updateRoleChoices = updateRole.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  // Ask what new role needs to be assigned
  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "What role would you like to assign?",
      choices: updateRoleChoices
    }
  ]);

  // Parse role and employee id into ints
  const employeeInt = parseInt(employeeId);
  const roleInt = parseInt(roleId);

  // Pass ints to update employe role in database
  const data = await db.updateEmployeeRoleDB(employeeInt, roleInt);

  // Display success
  console.log("Updated employee's role");
  console.log("\n");

  // Ask what the user wants to do next
  loadMainPrompts();
}

// Function to add an employee
async function addEmployee() {
  // Ask the first and last name of employee
  const employeeTemplate = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);
  // Get all roles to display for reference
  const getAllRoles = await db.findAllRoles();
  let roleArrayHolder = [];

  for (let i = 0; i < getAllRoles.length; i++) {
    let roleArray = [
      getAllRoles[i].id,
      getAllRoles[i].title,
      getAllRoles[i].salary,
      getAllRoles[i].department_id
    ];
    roleArrayHolder.push(roleArray);
  }

  console.log("\n");
  console.log("------------------------------------------------------");
  console.log("EMPLOYEE ROLES");
  console.log("------------------------------------------------------");
  // Display information in table format
  console.table(
    ["Role ID", "Title", "Salary", "Derpartment ID"],
    roleArrayHolder
  );
  console.log("\n");

  // Ask what the employee's role id will be
  const roleQuery = await prompt([
    {
      name: "roleId",
      message:
        "What is the employee's role id? All employee roles are listed above as reference."
    }
  ]);

  // Get all managers to display for reference
  const getAllManagers = await db.findManagerRole();
  let managerArrayHolder = [];

  for (let i = 0; i < getAllManagers.length; i++) {
    let managerArray = [getAllManagers[i].manager_id, getAllManagers[i].title];
    managerArrayHolder.push(managerArray);
  }

  console.log("\n");
  console.log("------------------------------------------------------");
  console.log("MANAGER IDs");
  console.log("------------------------------------------------------");
  // Display information in table format
  console.table(["Manager ID", "Employee Role Title"], managerArrayHolder);
  console.log("\n");

  // Ask what manager id needs to be assigned
  const managerQuery = await prompt([
    {
      name: "managerId",
      message:
        "What is the id of the employee's manager? All manager ids are listed above as reference."
    }
  ]);

  // Make manager ID and role ID integers
  const roleID = parseInt(roleQuery.roleId);
  const managerID = parseInt(managerQuery.managerId);

  // Create new employee obj
  const employee = {
    first_name: employeeTemplate.first_name,
    last_name: employeeTemplate.last_name,
    role_id: roleID,
    manager_id: managerID
  };

  // Pass new employee to create employee function
  await db.createEmployee(employee);

  // Display success
  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );
  console.log("\n");

  // Ask what the user wants to do next
  loadMainPrompts();
}

function quit() {
  console.log("Goodbye!");
  // End process
  process.exit();
}
