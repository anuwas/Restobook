angular.module('RestaurantService', []).factory('RestaurantSrv', ['$http','$q', function($http,$q) {

	factory={}
	
	factory.getOnlineOrderByRestaurant=function(restaurantId)
	{
		var userData={'restaurantId':restaurantId};
		var RestaurantData={'id':restaurantId};
		//return $http.post(serviceDomain+'api/restaurant/onlineorder/find',userData);
		return $q.all([
					    $http.post(serviceDomain+'api/restaurant/onlineorder/find',userData),
					    $http.post(serviceDomain+'api/restaurant/find',RestaurantData)
					  ]);
	};
	
	factory.OederAndBooking=function(customerOrder)
	{
		var order=factory.prepareRestaurantOrder(customerOrder.order);
		var booking=factory.prepareRestaurantBooking(customerOrder.booking);
		var customerOrderBooking=factory.prepareRestaurantOrderAndBooking(order,booking);
		return customerOrderBooking;
	};
	factory.prepareRestaurantOrderAndBooking=function(order,booking){
		orderBooking=[];
		for(var i in order){
			var orderData={'restaurantId':order[i].restaurantID,'restaurantName':order[i].restaurantName,'total':order[i].count,'order':order[i].count,'booking':0}
			orderBooking.push(orderData);
		}
		for(var i in booking)
			{
				var restaurantId=booking[i].restaurantID;
				if(factory.checkCustomerIdExistInBooking(restaurantId,orderBooking))
					{
						for(var j in orderBooking)
							{
								if(orderBooking[j].restaurantId==restaurantId)
									{
										var totalorder=parseInt(orderBooking[j].order)+booking[i].count;
										orderBooking[j].total=totalorder;
										orderBooking[j].booking=booking[i].count;
									}
							}
					}
				else{
					var BookingData={'restaurantId':booking[i].restaurantID,'restaurantName':booking[i].restaurantName,'total':booking[i].count,'order':0,'booking':booking[i].count}
					orderBooking.push(BookingData);
				}
			}
		
		return orderBooking;
	};
	factory.checkCustomerIdExistInBooking=function(PrestaurantID,orderBooking)
	{
		var status=false;
		for(var i in orderBooking){
			if(PrestaurantID==orderBooking[i].restaurantId)
				{
					status=true;
				}
		}
		return status;
	};
	factory.prepareRestaurantOrder=function(order){
		orderData=[];
		for(var i in order){
			var orderArr={'restaurantID':order[i]._id.restaurantId,'restaurantName':order[i]._id.restaurantName,'count':order[i].count,'type':'order'};
			orderData.push(orderArr);
		}

		return orderData;
	};
	factory.prepareRestaurantBooking=function(order){
		orderData=[];
		for(var i in order){
			var orderArr={'restaurantID':order[i]._id.restaurantId,'restaurantName':order[i]._id.restaurantName,'count':order[i].count,'type':'booking'};
			orderData.push(orderArr);
		}

		return orderData;
	};
return factory;
}]);