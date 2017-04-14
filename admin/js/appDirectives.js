var appDirective = angular.module('appDirective', []);
appDirective.directive('userinfo', function() {
    var directive = {};
    directive.controller= 'CustomerController';
    directive.controllerAs= 'ctrl';
    directive.template= 'Hello';
    /*directive.restrict = 'E'; /

    directive.compile = function(element, attributes) {
        element.css("border", "1px solid #cccccc");

        var linkFunction = function($scope, element, attributes) {
            element.html("This is the new content: " + $scope.firstName);
            element.css("background-color", "#ffff00");
        }

        return linkFunction;
    }*/

    return directive;
});

appDirective.directive('hboTabs', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var jqueryElm = $(elm[0]);
            $(jqueryElm).tabs()
        }
    };
});

appDirective.directive('ckEditor', function () {
	  return {
	    require: '?ngModel',
	    link: function (scope, elm, attr, ngModel) {
	      var ck = CKEDITOR.replace(elm[0]);
	      if (!ngModel) return;
	      ck.on('instanceReady', function () {
	        ck.setData(ngModel.$viewValue);
	      });
	      function updateModel() {
	        scope.$apply(function () {
	          ngModel.$setViewValue(ck.getData());
	        });
	      }
	      ck.on('change', updateModel);
	      ck.on('key', updateModel);
	      ck.on('dataReady', updateModel);
	      
	      ck.on('instanceReady', function () {
	          ck.setData(ngModel.$viewValue);
	      });
	      
	      ngModel.$render = function (value) {
	        ck.setData(ngModel.$viewValue);
	      };
	    }
	  };
	});

appDirective.directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'yy-mm-dd',
                    showOn: "button",
                    buttonImage: "img/calendar.gif",
                    buttonImageOnly: true,
                    buttonText: "Select date",
                    onSelect:function (date) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(date);
                        });
                    }
                });
            });
        }
    }
});
