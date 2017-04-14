angular.module('CustomerService', []).factory('CustomerServ', ['$http','$q', function($http,$q) {
	factory={};
	factory.getOrder = function () {
		return $http.post(serviceDomain+'api/restaurantssumbookingforcustomers');
    };
    factory.getBooking = function () {
        return $http.post(serviceDomain+'api/restaurantssumbookingforcustomers');
    };
    
    factory.getCustomerFeedBackservice=function(){
    	return $http.post(serviceDomain+'api/customer/feedback/findAll');
    };
    factory.getCustomerFeedback=function(feedbackData){
    	var feedbacks=feedbackData;
    	var returnFeedback={};
    	for(var i in feedbacks){
    		feedbacks[i].createdAt=feedbacks[i].createdAt.split("T")[0];
    	}
    	return feedbacks;
    };
    
    factory.getCustomerdetail=function(customerId){
    	var userData={'customerId':customerId};
    	return $q.all([
			    $http.post(serviceDomain+'api/customer/find',userData),
			    $http.post(serviceDomain+'api/totbookingcustomer/find',userData),
			    $http.post(serviceDomain+'api/totonlineordercustomer/find',userData),
			    $http.post(serviceDomain+'api/customer/find/points',userData),
			    $http.post(serviceDomain+'api/customer/getallreviewbyacustomer',userData)
			  ]);
    }
    var fruits = [];
	factory.OederAndBooking=function(customerOrder)
	{
		var order=factory.prepareCustomerOrder(customerOrder.order);
		var booking=factory.prepareCustomerBooking(customerOrder.booking);
		var customerOrderBooking=factory.prepareCustomerOrderAndBooking(order,booking);
		return customerOrderBooking;
	};
	factory.prepareCustomerOrderAndBooking=function(order,booking){
		orderBooking=[];
		for(var i in order){
			var orderData={'customerId':order[i].customerID,'customerName':order[i].customerName,'total':order[i].count,'order':order[i].count,'booking':0}
			orderBooking.push(orderData);
		}
		
		for(var i in booking)
			{
				var customerId=booking[i].customerID;
				if(factory.checkCustomerIdExistInBooking(customerId,orderBooking))
					{
						for(var j in orderBooking)
							{
								if(orderBooking[j].customerId==customerId)
									{
										var totalorder=parseInt(orderBooking[j].order)+booking[i].count;
										orderBooking[j].total=totalorder;
										orderBooking[j].booking=booking[i].count;
									}
							}
					}
				else{
					var BookingData={'customerId':booking[i].customerID,'customerName':booking[i].customerName,'total':booking[i].count,'order':0,'booking':booking[i].count}
					orderBooking.push(BookingData);
				}
			}
		
		return orderBooking;
	};
	factory.checkCustomerIdExistInBooking=function(PcustomerID,orderBooking)
	{
		var status=false;
		for(var i in orderBooking){
			if(PcustomerID==orderBooking[i].customerId)
				{
					status=true;
				}
		}
		return status;
	}
	factory.prepareCustomerOrder=function(order){
		orderData=[];
		for(var i in order){
			var orderArr={'customerID':order[i]._id.customerId,'customerName':order[i]._id.customerName,'count':order[i].count,'type':'order'};
			orderData.push(orderArr);
		}

		return orderData;
	};
	factory.prepareCustomerBooking=function(order){
		orderData=[];
		for(var i in order){
			var orderArr={'customerID':order[i]._id.customerId,'customerName':order[i]._id.customerName,'count':order[i].count,'type':'booking'};
			orderData.push(orderArr);
		}

		return orderData;
	};
	
	return factory;
}]);