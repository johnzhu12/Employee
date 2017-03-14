
//directive
// angular.module('employee').directive('employeeList', function() {
//     return {
//         templateUrl: '../tpl/employlist.html',
//         // template: '<div ng-repeat="e in employees track by $index">{{e.name}}</div>',
//         link: function() {

//         }
//     }

// });
// angular.module('employee').controller('employeeCtrl', function($scope) {
//     $scope.employees = employees;
// })

// component has isolated scope
function employeeCtrl($scope) {
    //get the fake data
    $scope.employees = employees;
    $scope.showPerson = -1;  //default to hide all the employee's bio
    //toggle the bio of employee
    $scope.toogleBio = function(index){
      $scope.showPerson = $scope.showPerson == index?-1:index;
    }
    //show the employee's bio
    $scope.showbio = function(bio){
        alert("the employee's bio is"+JSON.stringify(bio));
    }
}
//the employeeList component
angular.module('employee').component('employeeList', {

    templateUrl: '../tpl/employlist.html',
    controller: employeeCtrl,
    // bindings: {
    //     
    // }
});
