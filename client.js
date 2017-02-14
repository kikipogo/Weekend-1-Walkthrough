$(document).ready(function(){ //Waits for DOM to completely load
  $('form').on('submit', function(event){ //Event listener on form submit
    event.preventDefault();//Do not bring us to new page

    //Create an array of the inputs, inputs are converted to objects, objects have two proerties: name and values
    //e.g. {name: 'firstName', value: 'Luke'}
    console.log('form values ', $(this).serializeArray());//this refers to form

    var submissionArray = $(this).serializeArray();// [{}, {}, {}]
    var newEmployeeObject = {}; //{firstName: 'Luke', lastName: 'Schlangen'}

    submissionArray.forEach(function(inputFieldObject){
      //first time through newEmployeeObject is {}
      newEmployeeObject[inputFieldObject.name] = inputFieldObject.value;
      //newEmployeeObject.firstName = Luke;
      //first time newEmployeeObject is {firstName: 'Luke'}
      //second time newEmployeeObject is {firstName: 'Luke', lastName: 'Schlangen'}
      // third time newEmployeeObject is {firstName: 'Luke', lastName: 'Schlangen' idNumber: 123}
      //use [] instead of . to go through array
    });
    // FOR EACH ABOVE IS THE SAME AS FOR LOOP
    // for (var i = 0; i < submissionArray.length; i++) {
    //   var inputFieldObject = submissionArray[i];
    //   newEmployeeObject[inputFieldObject.name] = inputFieldObject.value;
    // }

    console.log('New Employee Object:', newEmployeeObject);

    //Adds new employee row to the DOM
    $('#employeeTableBody').append(
      '<tr>' +
      '<td>' + newEmployeeObject.firstName + '</td>' +
      '<td>' + newEmployeeObject.lastName + '</td>' +
      '<td>' + newEmployeeObject.idNumber + '</td>' +
      '<td>' + newEmployeeObject.jobTitle + '</td>' +
      '<td>' + newEmployeeObject.annualSalary + '</td>' +
      '<td><button class="deleteEmployeeButton" data-salary="' + annualSalary + '">Delete</button></td>' +
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
    var deletedEmployeeSalary = $(this).data('salary');
    var deletedEmployeeMonthlyExpenses = deletedEmployeeSalary / 12 //type coercion
    var previousMonthlyExpenses = $('#monthlyExpenses').text(); //emptty .text() gets text
    var newTotalMonhtlyExpenses = previousMonthlyExpenses - deletedEmployeeMonthlyExpenses;
    $('#monthlyExpenses').text(newTotalMonhtlyExpenses); // updating text

    //Selecting and deleting employee row from table
    $(this).parent().parent().remove();
  });
});
