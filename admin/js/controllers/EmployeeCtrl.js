angular.module('EmployeeCtrl', []).controller('EmployeeController', function($scope, $http) {		
		$scope.formData = {};
		$scope.employeeData = {};
        
		// when landing on the page, get all employees and show them
        $http.get('/api/employees')
                .success(function(data) {
                        $scope.employees = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
				                
		// when submitting the add form, send the text to the node API
        $scope.createEmployee = function() {				
                $http.post('/api/employees', $scope.employeeData)
                        .success(function(data) {
                                $scope.employeeData = {}; // clear the form so our employee is ready to enter another
                                $scope.employees = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
		
		// delete a employee after checking it
        $scope.deleteEmployee = function(id) {
                $http.delete('/api/employees/' + id)
                        .success(function(data) {
                                $scope.employees = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
		
		// edit a employee after checking it
        $scope.editEmployee = function(id) {
                $http.get('/api/employees/find/' + id)
                        .success(function(data) {
                                $scope.employeeData = data[0];
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
		
		// edit a employee after checking it
        $scope.updateEmplouee = function() {				
                $http.post('/api/employees/update' , $scope.employeeData)
                        .success(function(data) {
                                $scope.employeeData = {}; // clear the form so our employee is ready to enter another
                                $scope.employees = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

});