angular.module('CustomersCtrl', []).controller('CustomerController', function($scope, $http,$location,$rootScope,CustomerServ,$q) {	
	
                $scope.formData = {};
                $scope.userData = {};  
                $scope.customerOrder = {order: '',booking: ''};
                $scope.customerDetail = {profile:'',booking:'',order:'',points:'',review:''};
      				
                $scope.bookigOrderData={};
                
                $scope.customerDetailOnClick=function(customerid){
                	 window.location.href='#customerdetail?id='+customerid;
                }
                // when landing on the page, get all users and show them
                var viewlocation=$location.path();
                switch(viewlocation)
            	{
            	case '/customers':
            		$http.post(serviceDomain+'api/customers')
                    .success(function(data) {
                            $scope.customers = data;
                            //console.log();
                    })
                    .error(function(data) {
                            console.log('Error: ' + data);
                    });	
            		
            		break;
            		
            	case '/recent-customers':
            		$http.post(serviceDomain+'api/getrecentregisterdcustomers')
            	    .success(function(data) {
            	            $scope.customers = data;
            	    })
            	    .error(function(data) {
            	            console.log('Error: ' + data);
            	    });	
            		break;
            		
            	case '/top-order-customers':            		 
            				  $q.all([
            				    $http.post(serviceDomain+'api/resturanssumonlineorderforcustomer').then(function(response) {
            				      $scope.customerOrder.order = response.data;
            				     
            				    }),
            				    $http.post(serviceDomain+'api/restaurantssumbookingforcustomers').then(function(response) {
            				      $scope.customerOrder.booking = response.data;
            				      
            				    })
            				  ]).then(function(){
            					  
            					  $scope.bookigOrderData=CustomerServ.OederAndBooking($scope.customerOrder);
            				  })
            		
            		break;
            	case '/customerdetail':
            		var searchObject = $location.search();
            		
            		CustomerServ.getCustomerdetail(searchObject.id).then(function(response){
            			$scope.customerDetail.profile=response[0].data;
            			$scope.customerDetail.booking=response[1].data;
            			$scope.customerDetail.order=response[2].data;
            			$scope.customerDetail.points=response[3].data;
            			$scope.customerDetail.review=response[4].data;
            	    });
            		break;
            		
            	case '/customer-feedbacks':
            		CustomerServ.getCustomerFeedBackservice().then(function(response){
            			$scope.customersFeedbacks=CustomerServ.getCustomerFeedback(response.data);
            	    });
            		break;
            	}
                
                
        
});