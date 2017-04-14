angular.module('AdvertisementCtrl', ['ngFileUpload']).controller('AdvertisementController', function(Upload,$scope, $http,$location,$sce) {		
		
                var advertisementsList={};
                var imagepath;
                $http.post(serviceDomain+'api/advertisements')
                .success(function(data) {
                       $scope.advertisementsList=$scope.advertisementsListFunc(data);
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });

               $scope.newAdvertisement=function(){
                window.location.href='#/createadvertisement';
               } 
               
               $scope.advertisementsListFunc=function(data){
                for(var i in data){
                    var imag=serviceDomain+data[i].image;    
                    data[i].image=imag;
                    var description=$sce.trustAsHtml(data[i].description);  
                    data[i].description=description;
                }
                return data;
               }  

               
    $scope.fileUploadSubmit = function(){ 
        if($scope.file){
                $scope.ImageAdvertisementCreate($scope.file,$scope.title,$scope.description);
        }else{
               $scope.textAdvertisementCreate($scope.title,$scope.description);
        }
    }

    $scope.textAdvertisementCreate=function(title,description){
         var parmValue={'advertisementTitle':title,'advertisementDescription':description};
        $http.post(serviceDomain+'advertisement/createTextAdvertisement',parmValue)
                .success(function(data) {
                       alert('Advertisement Creted');
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });

    }

        $scope.ImageAdvertisementCreate = function (file,title,description) {
        Upload.upload({
            url: serviceDomain+'advertisement/createImageAdvertisement', //webAPI exposed to upload the file
            data:{file:file,'advertisementTitle':title,'advertisementDescription':description} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                //alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                alert('Successfully created new advertisement');
            } else {
                alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };

     


    $scope.editAdvertisement=function(id){
        window.location.href='#/editadvertisement?id='+id;
        
    }

    var searchObject = $location.search();
    if(searchObject.id){
        var param={'id':searchObject.id};
        $http.post(serviceDomain+'api/advertisements/find',param)
                .success(function(data) {
                       $scope.title=data[0].title;
                       //$scope.description=$sce.trustAsHtml(data[0].description);
                       $scope.description=data[0].description;
                       $scope.imgsrc=serviceDomain+data[0].image;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
    }

    $scope.updateAdvertisement=function(){
        if($scope.file){
                $scope.ImageAdvertisementUpdate($scope.file,$scope.title,$scope.description);
        }else{
               $scope.textAdvertisementUpdate($scope.title,$scope.description);
        }
    }

    $scope.textAdvertisementUpdate=function(title,description){
        var parmValue={id:searchObject.id,'advertisementTitle':title,'advertisementDescription':description};
        $http.post(serviceDomain+'advertisement/updateTextAdvertisement',parmValue)
                .success(function(data) {
                       alert('Advertisement Updated');
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
    }

    $scope.ImageAdvertisementUpdate = function (file,title,description) {
        Upload.upload({
            url: serviceDomain+'advertisement/updateImageAdvertisement', //webAPI exposed to upload the file
            data:{id:searchObject.id,file:file,'advertisementTitle':title,'advertisementDescription':description} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                //alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                alert('Successfully updated advertisement');
            } else {
                alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
     
     $scope.removeAdvertisement=function(id){
        var parmValue={id:id};
        $http.post(serviceDomain+'advertisement/removeAdvertisement',parmValue)
                .success(function(data) {
                        alert('removed');
                        window.location.reload();
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
     }           
               
});