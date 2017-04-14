angular.module('RestaurantsCtrl', ['googlechart','ngFileUpload','cloudinary']).controller('RestaurantsController', function($scope, $http,$location,RestaurantSrv,$q,Upload,cloudinary) {		
	
	$scope.restaurantData = {};   
	var viewlocation=$location.path();
	$scope.RestaurantOrder = {
			  order: '',
			  booking: ''
			};
      $scope.bookigOrderData={};
      
      //Cloudinary Configuration
      var cloud_name = "indwarecloudimage";
      var api_key = "459748154664384";
      //var public_id = "Restaurant";
      //var signature = "fc9pezyu";
      var upload_preset='eqohikpb';
      var timestamp = Date.now();
      
      
	switch(viewlocation)
	{
	case '/restaurants':
		$http.post(serviceDomain+'api/restaurants')
	    .success(function(data) {
	            $scope.restaurants = data;
	    })
	    .error(function(data) {
	            console.log('Error: ' + data);
	    });	
		break;
	case '/recentre-restaurants':
		$http.post(serviceDomain+'api/getrecentregisteredrestaurant')
	    .success(function(data) {
	            $scope.restaurants = data;
	    })
	    .error(function(data) {
	            console.log('Error: ' + data);
	    });	
		break;
	case '/top-order-restaurants':
		 $q.all([
			    $http.post(serviceDomain+'api/resturanssumonlineorder').then(function(response) {
			      $scope.RestaurantOrder.order = response.data;
			    }),
			    $http.post(serviceDomain+'api/restaurantssumbooking').then(function(response) {
			      $scope.RestaurantOrder.booking = response.data;
			    })
			  ]).then(function(){
				  $scope.bookigOrderData=RestaurantSrv.OederAndBooking($scope.RestaurantOrder);
				  
			  })
				  
		break;
		 
	case '/restaurantsedit':
		var searchObject = $location.search();
		var userData={'id':searchObject.id};
		$http.post(serviceDomain+'api/restaurant/find',userData)
        .success(function(data) {
        $scope.restaurantData = data[0];
        $scope.photoGallerys=data[0].photoGallery;
        $scope.timingsAvailabilityLists=data[0].timingsAvailabilityList;
        $scope.mealAvailabilityLists=data[0].mealAvailabilityList;
        $scope.itemDishess=data[0].itemDishes;
        $scope.cuisineTypes=data[0].cuisineType;
        })
		break;
	case '/viewrestatuant':
		var searchObject = $location.search();
	    if(searchObject.id){
	        if(!searchObject.type){
	            var userData={'id':searchObject.id};
	            $http.post(serviceDomain+'api/restaurant/find',userData)
	            .success(function(data) {
		            $scope.restaurantData = data[0];
		            $scope.photoGallerys=data[0].photoGallery;
		            $scope.timingsAvailabilityLists=data[0].timingsAvailabilityList;
		            $scope.mealAvailabilityLists=data[0].mealAvailabilityList;
		            $scope.itemDishess=data[0].itemDishes;
		            $scope.cuisineTypes=data[0].cuisineType;
	            })
	            .error(function(data) {
	            console.log('Error: ' + data);
	            });
	        }else{
	            var userData={'id':searchObject.id};
	            $http.post(serviceDomain+'api/restaurant/find',userData)
	            .success(function(data) {
	            $scope.restaurantData = data[0];
	            })
			    .error(function(data) {
			            console.log('Error: ' + data);
			    });
	        }
	         
	    }
		break;
	case '/viewrestatuantorders':
		var searchObject = $location.search();
		RestaurantSrv.getOnlineOrderByRestaurant(searchObject.id).then(function(response){
			$scope.onlineorders=response[0].data;
			$scope.restaurant=response[1].data[0];
			console.log(response[0].data);
	    });
		break;
	}
	

    $scope.restaurantsViewMoreOnClick=function(id){
        window.location.href='#viewrestatuant/?id='+id;
    }

    $scope.restaurantsViewBookingeOnClick=function(id){
        window.location.href='#viewrestatuantbooking/?id='+id+'&type=booking';
    }

    $scope.restaurantsViewOrderOnClick=function(id){
    	window.location.href='#viewrestatuantorders/?id='+id;
    }

    $scope.searchBookingOnClick=function(){
        var searchDate=$scope.bookingDate;
        var restaurantId=searchObject.id;
        var userData={'restaurantId':restaurantId,'dateTime':searchDate};
            $http.post(serviceDomain+'api/restaurantbookingbydate/find',userData)
            .success(function(data) {
            $scope.restaurantDatas = data;
    })
    .error(function(data) {
            console.log('Error: ' + data);
    });

    }
    
    
    $scope.tabs = [
     {title: 'Profile',url: 'Restaurant_Profile_Details.tpl.html'},
     {title: 'Gallery',url: 'Restaurant_gallery.tpl.html'},
     {title: 'Dishes',url: 'Restaurant_dishes.tpl.html'},
     {title: 'Timing', url: 'Restaurant_timing.tpl.html' },
     {title: 'Meal',url: 'Restaurant_meal.tpl.html' },
     {title: 'Cusine',url: 'Restaurant_cusine.tpl.html' },
     {title: 'Reservation Statistics',url: 'Reservation_Statistics.tpl.html'	},
     {title: 'Take Away Statistics', url: 'Take_Away_Statistics.tpl.html'},
     {title: 'Pickup Order Statistics',url: 'Pickup_Order_Statistics.tpl.html'}];
                  
    $scope.currentTab = 'Restaurant_Profile_Details.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
    $scope.restaurantsCloneOnClick=function(id){
    	var userData={'id':id};
    	$http.post(serviceDomain+'api/restaurant/createclone',userData)
	        .success(function(data) {
	        	alert('Duplicate Restaurant Created');
	        	window.location.href='#restaurants';
        })
    }
    $scope.restaurantsUpdateOnClick=function(id){
    	window.location.href='#restaurantsedit?id='+id;
    }
    $scope.restaurantsDeleteOnClick=function(id){
    	var userData={'id':id};
    	$http.post(serviceDomain+'api/restaurant/removefromadmin',userData)
	        .success(function(data) {
	        	alert('Restaurant Removed');
	        	window.location.href='#restaurants';
        })
    }
    
    $scope.updateRestaurantOnClick=function(id){
    	var userData={'id':$scope.restaurantData._id,
						'name':(($scope.restaurantData.name == undefined) ? '' : $scope.restaurantData.name),
						'phno':(($scope.restaurantData.phno == undefined) ? '' : $scope.restaurantData.phno),
						'email':(($scope.restaurantData.email == undefined) ? '' : $scope.restaurantData.email),
						'imageName':(($scope.restaurantData.imageName == undefined) ? '' : $scope.restaurantData.imageName),
						'imagePath':(($scope.restaurantData.imagePath == undefined) ? '' : $scope.restaurantData.imagePath),
						'imageSecurePath':(($scope.restaurantData.imageSecurePath == undefined) ? '' : $scope.restaurantData.imageSecurePath),
						'website':(($scope.restaurantData.website == undefined) ? '' : $scope.restaurantData.website),
						'pincode':(($scope.restaurantData.pincode == undefined) ? '' : $scope.restaurantData.pincode),
						'address':(($scope.restaurantData.address == undefined) ? '' : $scope.restaurantData.address),
						'linkYoutube':(($scope.restaurantData.linkYoutube == undefined) ? '' : $scope.restaurantData.linkYoutube),
						'linkIntsagram':(($scope.restaurantData.linkIntsagram == undefined) ? '' : $scope.restaurantData.linkIntsagram),
						'linkTwitter':(($scope.restaurantData.linkTwitter == undefined) ? '' : $scope.restaurantData.linkTwitter),
						'linkPinterest':(($scope.restaurantData.linkPinterest == undefined) ? '' : $scope.restaurantData.linkPinterest),
						'linkFacebook':(($scope.restaurantData.linkFacebook == undefined) ? '' : $scope.restaurantData.linkFacebook),
						'latitude':(($scope.restaurantData.latitude == undefined) ? '' : $scope.restaurantData.latitude),
						'longitude':(($scope.restaurantData.longitude == undefined) ? '' : $scope.restaurantData.longitude)
						};
    	console.log(userData);
    	$http.post(serviceDomain+'api/restaurant/updateresprofilefromadmin',userData)
        .success(function(data) {
        	alert('Restaurant Updated');
    }).error(function(data) {
        console.log('Error: ' + data);
    });
   };
    
   $scope.updateDishesRestaurantOnClick=function(id){
	   var userData={'id':$scope.restaurantData._id,'itemDishess':$scope.itemDishess};
				
	   console.log(userData);
		$http.post(serviceDomain+'api/restaurant/updateresdishesfromadmin',userData)
		.success(function(data) {
			alert('Restaurant Updated');
			//window.location.href='#restaurants';
		}).error(function(data) {
		console.log('Error: ' + data);
		});
   }
   $scope.updateTimingRestaurantOnClick=function(id){
	   var userData={'id':$scope.restaurantData._id,'timingsAvailabilityLists':$scope.timingsAvailabilityLists};
		
	   console.log(userData);
		$http.post(serviceDomain+'api/restaurant/updaterestimingfromadmin',userData)
		.success(function(data) {
			alert('Restaurant Updated');
			//window.location.href='#restaurants';
		}).error(function(data) {
		console.log('Error: ' + data);
		});
   }
   
   $scope.updateMealRestaurantOnClick=function(id){
	   var userData={'id':$scope.restaurantData._id,'mealAvailabilityList':$scope.mealAvailabilityLists};
	   $http.post(serviceDomain+'api/restaurant/updateresmealsfromadmin',userData)
		.success(function(data) {
			alert('Restaurant Updated');
			//window.location.href='#restaurants';
		}).error(function(data) {
		console.log('Error: ' + data);
		});
   }
   
   $scope.updateCuisineestaurantOnClick=function(id){
	   var userData={'id':$scope.restaurantData._id,'cuisineType':$scope.cuisineTypes};
	   $http.post(serviceDomain+'api/restaurant/updaterescuisinefromadmin',userData)
		.success(function(data) {
			alert('Restaurant Updated');
			//window.location.href='#restaurants';
		}).error(function(data) {
		console.log('Error: ' + data);
		});
   }
   
   $scope.generateLatitudeLongitude=function(){
	   var address=$scope.restaurantData.address;
	   if(address=='' || address==undefined){
		   alert("Please insert address");
		   return false;
	   }
	   var pin = $scope.restaurantData.pincode;
	   if(pin=='' || pin==undefined){
		   alert("Please insert PIN ");
		   return false;
	   }
	   if(address!='' && pin!='' && address!=undefined && pin!=undefined){
		   address=address+" ,"+pin;
		   var geocoder = new google.maps.Geocoder();
		   //var address = "new york";

		   geocoder.geocode( { 'address': address}, function(results, status) {

		     if (status == google.maps.GeocoderStatus.OK) {
		       $scope.restaurantData.latitude = results[0].geometry.location.lat();
		       $scope.restaurantData.longitude = results[0].geometry.location.lng();
		     } 
		   });
	   }
	   
   }
   
   $scope.restaurantsGaalleryImageDelete=function(index){
	   var temparr=[];
	   for(var i in $scope.photoGallerys){
		   if(i!=index){
			   temparr.push($scope.photoGallerys[i]);
		   }
	   }
	   $scope.photoGallerys=temparr;
	   var userData={'id':$scope.restaurantData._id,'photoGallery':$scope.photoGallerys};
	   $http.post(serviceDomain+'api/restaurant/updateresgalleryfromadmin',userData)
		.success(function(data) {
			alert('Restaurant Updated');
		}).error(function(data) {
		console.log('Error: ' + data);
		});
   }
   
   $scope.uploadGalleryImageFiles = function(files){
	    if(!files){
	      return false;
	    }        

	    angular.forEach(files, function(file){
	        if (file && !file.$error) {
	            file.upload = Upload.upload({
	              url: "https://api.cloudinary.com/v1_1/" + cloud_name + "/upload",
	              data: {
	            	  upload_preset:upload_preset,
	            	  timestamp: timestamp,
	                  //public_id: public_id,
	                  api_key: api_key,
	                  //signature: signature,
	                  file: file
	              }
	            }).progress(function (e) {
	                file.progress = Math.round((e.loaded * 100.0) / e.total);
	                file.status = "Uploading... " + file.progress + "%";
	            }).success(function (data) {
	                console.log('success');
	                console.log(data);
	                var temparr=[];
	                $scope.photoGallerys.push({'description':'','imageCreatedAt':data.created_at,'imageId':data.public_id,'imageName':data.url,'imagePath':data.url,'imageSecurePath':data.secure_url});
	                
	                var userData={'id':$scope.restaurantData._id,'photoGallery':$scope.photoGallerys};
	         	   $http.post(serviceDomain+'api/restaurant/updateresgalleryfromadmin',userData)
	         		.success(function(data) {
	         			alert('Uploaded');
	         		}).error(function(data) {
	         		console.log('Error: ' + data);
	         		});
	         	   
	                //alert('Finish');
	            }).error(function (data) {
	                console.log('failed');
	                console.log(data);
	                alert('failed');
	            });
	        }
	    });
	};
	
	$scope.uploadRestaurantImageFiles = function(files){
	    if(!files){
	      return false;
	    }        

	    angular.forEach(files, function(file){
	        if (file && !file.$error) {
	            file.upload = Upload.upload({
	              url: "https://api.cloudinary.com/v1_1/" + cloud_name + "/upload",
	              data: {
	            	  upload_preset:upload_preset,
	            	  timestamp: timestamp,
	                  //public_id: public_id,
	                  api_key: api_key,
	                  //signature: signature,
	                  file: file
	              }
	            }).progress(function (e) {
	                file.progress = Math.round((e.loaded * 100.0) / e.total);
	                file.status = "Uploading... " + file.progress + "%";
	            }).success(function (data) {
	                console.log('success');
	                console.log(data);
	                var temparr=[];
	                $scope.restaurantData.imageName=data.public_id+'.'+data.format;
	                $scope.restaurantData.imagePath=data.url;
	                $scope.restaurantData.imageSecurePath=data.secure_url;
	                
	                
	            }).error(function (data) {
	                console.log('failed');
	                console.log(data);
	                alert('failed');
	            });
	        }
	    });
	};
	
	

    
    $scope.chart={
    		  "type": "ColumnChart",
    		  "cssStyle": "height:200px; width:300px;",
    		  "data": {
    		    "cols": [
    		      {
    		        "id": "month",
    		        "label": "Month",
    		        "type": "string",
    		        "p": {}
    		      },
    		      {
    		        "id": "laptop-id",
    		        "label": "Laptop",
    		        "type": "number",
    		        "p": {}
    		      },
    		      {
    		        "id": "desktop-id",
    		        "label": "Desktop",
    		        "type": "number",
    		        "p": {}
    		      },
    		      {
    		        "id": "server-id",
    		        "label": "Server",
    		        "type": "number",
    		        "p": {}
    		      },
    		      {
    		        "id": "cost-id",
    		        "label": "Shipping",
    		        "type": "number"
    		      }
    		    ],
    		    "rows": [
    		      {
    		        "c": [
    		          {
    		            "v": "January"
    		          },
    		          {
    		            "v": 19,
    		            "f": "42 items"
    		          },
    		          {
    		            "v": 12,
    		            "f": "Ony 12 items"
    		          },
    		          {
    		            "v": 7,
    		            "f": "7 servers"
    		          },
    		          {
    		            "v": 4
    		          }
    		        ]
    		      },
    		      {
    		        "c": [
    		          {
    		            "v": "February"
    		          },
    		          {
    		            "v": 13
    		          },
    		          {
    		            "v": 1,
    		            "f": "1 unit (Out of stock this month)"
    		          },
    		          {
    		            "v": 12
    		          },
    		          {
    		            "v": 2
    		          }
    		        ]
    		      },
    		      {
    		        "c": [
    		          {
    		            "v": "March"
    		          },
    		          {
    		            "v": 24
    		          },
    		          {
    		            "v": 0
    		          },
    		          {
    		            "v": 11
    		          },
    		          {
    		            "v": 6
    		          }
    		        ]
    		      }
    		    ]
    		  },
    		  "options": {
    		    "title": "Sales per month",
    		    "isStacked": "true",
    		    "fill": 20,
    		    "displayExactValues": true,
    		    "vAxis": {
    		      "title": "Sales unit",
    		      "gridlines": {
    		        "count": 6
    		      }
    		    },
    		    "hAxis": {
    		      "title": "Date"
    		    }
    		  },
    		  "formatters": {},
    		  "displayed": true
    		};

	/*
	 * 
	 
	   $scope.timingsAvailabilityListsFunc = function(arr){
        for(var i in arr){
            if(arr[i].checked==true){
                arr[i].chekedStr='Open';
            }else{
                arr[i].chekedStr='Close';
            }
        }
        return arr;
    }
    $scope.mealAvaliablityFunc = function(arr){
        var returnArr=[];
        for(var i in arr){
            if(arr[i].checked==true){
                arr[i].chekedStr='Open';
                returnArr.push(arr[i]);
            }
        }
        return returnArr;
    }
    $scope.cuisineTypeFunc = function(arr){
        var returnArr=[];
        for(var i in arr){
            if(arr[i].checked==true){
                arr[i].chekedStr='Open';
                returnArr.push(arr[i]);
            }
        }
        return returnArr;
    }
    
	 * $scope.formData = {};
		    
		
		// when landing on the page, get all users and show them
        			        
		
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