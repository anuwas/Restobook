angular.module('ProductCtrl', []).controller('ProductController', function($scope, $http) {		
		$scope.formData = {};
		$scope.productData = {};        
		
		// when landing on the page, get all products and show them
        $http.get('/api/products')
                .success(function(data) {
                        $scope.products = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
				        
		// when submitting the add form, send the text to the node API
        $scope.createProduct = function() {				
                $http.post('/api/products', $scope.productData)
                        .success(function(data) {
                                $scope.productData = {}; // clear the form so our product is ready to enter another
                                $scope.products = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
		
		// delete a product after checking it
        $scope.deleteProduct = function(id) {
                $http.delete('/api/products/' + id)
                        .success(function(data) {
                                $scope.products = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
		
		// edit a user after checking it
        $scope.editProduct = function(id) {
                $http.get('/api/products/find/' + id)
                        .success(function(data) {
                                $scope.productData = data[0];
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
		
		// edit a product after checking it
        $scope.updateProduct = function() {				
                $http.post('/api/products/update' , $scope.productData)
                        .success(function(data) {
                                $scope.productData = {}; // clear the form so our product is ready to enter another
                                $scope.products = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

});