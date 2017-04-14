angular.module('RestaurantsCtrl', []).controller('RestaurantsController', function($scope, $http) {		
	console.log(serviceDomain);
	
	$scope.LoginClick=function(){
				
		alert($scope.username);
	}
	/*$scope.formData = {};
		$scope.userData = {};        
		
		// when landing on the page, get all users and show them
        $http.get('/api/users')
                .success(function(data) {
                        $scope.users = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });				        
		
		// when submitting the add form, send the text to the node API
        $scope.createUser = function() {				
                $http.post('/api/users', $scope.userData)
                        .success(function(data) {
                                $scope.userData = {}; // clear the form so our user is ready to enter another
                                $scope.users = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
		
		// delete a user after checking it
        $scope.deleteUser = function(id) {
                $http.delete('/api/users/' + id)
                        .success(function(data) {
                                $scope.users = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
		
		// edit a user after checking it
        $scope.editUser = function(id) {
                $http.get('/api/users/find/' + id)
                        .success(function(data) {
                                $scope.userData = data[0];
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
		
		// edit a user after checking it
        $scope.updateUser = function() {				
                $http.post('/api/users/update' , $scope.userData)
                        .success(function(data) {
                                $scope.userData = {}; // clear the form so our user is ready to enter another
                                $scope.users = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };*/

});