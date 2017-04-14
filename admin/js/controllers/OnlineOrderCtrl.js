angular.module('OnlineOrderCtrl', []).controller('OnlineOrderController', function($scope, $http) {		
		
                $scope.formData = {};
                $scope.userData = {};        
                
                // when landing on the page, get all users and show them
                $http.post(serviceDomain+'api/onlineorders')
                .success(function(data) {
                        $scope.onlineorders = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
       
});