$(document).ready(function(){ //Waits for DOM to completely load
  $('#submitNewEmployee').on('click', function(){ //Event listener on submitNewEmployee
    //Declaring variables and retrieving values from input boxes
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var idNumber = $('#idNumber').val();
    var jobTitle = $('#jobTitle').val();
    var annualSalary = $('#annualSalary').val();

    //Adds new employee row to the DOM
    $('#employeeTableBody').append(
      '<tr>' +
      '<td>' + firstName + '</td>' +
      '<td>' + lastName + '</td>' +
      '<td>' + idNumber + '</td>' +
      '<td>' + jobTitle + '</td>' +
      '<td>' + annualSalary + '</td>' +
      '<td><button class="deleteEmployeeButton">Delete</button></td>' +
    '</tr>'
    );

    //Add monthly salary expenses to the DOM
    var newEmployeeMonthlyExpenses = annualSalary / 12;
    var previousMonthlyExpenses = $('#monthlyExpenses').text();
    var totalMonthlyExpenses = parseFloat(previousMonthlyExpenses) + newEmployeeMonthlyExpenses;
    $('#monthlyExpenses').text(totalMonthlyExpenses);

    //Clear out input boxes use .val for input
    $('.employeeFormInput').val('');
  });

  //Adding listener for clicking delete employee buttons
  $('#employeeTableBody').on('click', '.deleteEmployeeButton', function(){
    //Removing employee salary from total
    var deletedEmployeeSalary = $(this).parent().prev().text();
    var deletedEmployeeMonthlyExpenses = deletedEmployeeSalary / 12
    var previousMonthlyExpenses = $('#monthlyExpenses').text();
    var newTotalMonhtlyExpenses = previousMonthlyExpenses - deletedEmployeeMonthlyExpenses;
    $('#monthlyExpenses').text(newTotalMonhtlyExpenses);

    //Selecting and deleting employee row from table
    $(this).parent().parent().remove();
  });
});
