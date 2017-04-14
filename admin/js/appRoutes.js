angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/dashboard.html',
		})
		.when('/restaurants', {
			templateUrl: 'views/restaurants.html',
			controller: 'RestaurantsController'
		})
		.when('/recentre-restaurants', {
			templateUrl: 'views/recentrestaurants.html',
			controller: 'RestaurantsController'
		})
		.when('/top-order-restaurants', {
			templateUrl: 'views/toporderrestaurant.html',
			controller: 'RestaurantsController'
		})
		.when('/viewrestatuant', {
			templateUrl: 'views/viewrestaurant.html',
			controller: 'RestaurantsController'
		})
		.when('/restaurantsedit', {
			templateUrl: 'views/restaurantupdate.html',
			controller: 'RestaurantsController'
		})
		.when('/viewrestatuantbooking', {
			templateUrl: 'views/restaurantbooking.html',
			controller: 'RestaurantsController'
		})
		.when('/viewrestatuantorders', {
			templateUrl: 'views/restaurantorders.html',
			controller: 'RestaurantsController'
		})
		.when('/customers', {
			templateUrl: 'views/customers.html',
			controller: 'CustomerController'	
		})
		.when('/customerdetail', {
			templateUrl: 'views/customerdetail.html',
			controller: 'CustomerController'	
		})
		.when('/recent-customers', {
			templateUrl: 'views/recentcustomers.html',
			controller: 'CustomerController'	
		})
		.when('/top-order-customers', {
			templateUrl: 'views/topordercustomers.html',
			controller: 'CustomerController'	
		})
		.when('/customer-feedbacks', {
			templateUrl: 'views/customerfeedbacks.html',
			controller: 'CustomerController'	
		})
		.when('/advertisement', {
			templateUrl: 'views/advertisement.html',
			controller: 'AdvertisementController'	
		})
		.when('/createadvertisement', {
			templateUrl: 'views/createadvertisement.html',
			controller: 'AdvertisementController'	
		})
		.when('/editadvertisement', {
			templateUrl: 'views/editadvertisement.html',
			controller: 'AdvertisementController'	
		})
		.when('/bookings', {
			templateUrl: 'views/booking.html',
			controller: 'BookingController'	
		})
		.when('/onlineorder', {
			templateUrl: 'views/onlineorder.html',
			controller: 'OnlineOrderController'	
		})
		
		.when('/product', {
			templateUrl: 'views/product.html',
			controller: 'ProductController'	
		})
		.when('/customer', {
			templateUrl: 'views/customer.html',
			controller: 'CustomerController'	
		})
		.when('/client', {
			templateUrl: 'views/client.html',
			controller: 'ClientController'	
		});
	
	

}]);