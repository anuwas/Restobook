angular.module('BookingCtrl', []).controller('BookingController', function($scope, $http) {		
		
                $scope.formData = {};
                $scope.userData = {};        
                var date= new Date();
                var todayStr=date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                
                // when landing on the page, get all users and show them
                var serviceData={'dateTime':todayStr};
                $http.post(serviceDomain+'api/restaurantbookingsbytoday',serviceData)
                .success(function(data) {
                        $scope.restaurantbookings = data;
                        
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });

                //getting all restaurant for listing
                $http.post(serviceDomain+'api/restaurants')
                        .success(function(data) {
                                $scope.restaurants = data;
                        })
                        .error(function(data) {
                             console.log('Error: ' + data);
                        }); 

                $scope.BookingSearcOnClick=function(){
                        var dateTime=$scope.dateTime;
                        var restaurantId=$scope.restaurantId;
                        if(restaurantId==undefined || restaurantId==''){
                                restaurantId='';
                        }
                        var userData={'restaurantId':restaurantId,'dateTime':dateTime};
                        $http.post(serviceDomain+'api/restaurantbookingsbyrestaurantanddate/find',userData)
                                .success(function(data) {
                                console.log(data);
                                $scope.restaurantbookings = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });

                }
       
});