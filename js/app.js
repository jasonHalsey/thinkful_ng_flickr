
var flickrApp = angular.module('flickrApp',['ngAnimate']);

//main controller for the app
flickrApp.controller('flickrController', function($scope, $http){

	$scope.formSubmitted = false;
	$scope.message = ""; 
	$scope.results = []; 
	$scope.searchingMessage = false;

	$scope.submitForm = function(){
		$scope.formSubmitted = true;
		$scope.searchingMessage = true;
		var tag = $scope.tag;
		searchFlickr(tag);
	};

	function searchFlickr(tag) {
        $http({ 
        	url : "https://api.flickr.com/services/rest",
        	method: 'GET',
        	params: {
    		    method: 'flickr.photos.search',
        		api_key: '2c6c55ca6b5f296450ad15f1d350401b',
        		tags: tag,
        		format: 'json',
        		nojsoncallback: 1
        	}
        }).success(function(response){
        	$scope.results = response;
        	if(response.photos.total > 0){ 
			$scope.message = "There were " + response.photos.total + " photos with the tag " + tag + ".";
			$scope.searchingMessage = false;
			}
			else { 
			$scope.message = "There are no photos tagged with " + tag +'.';			
			}  
        }).error(function(error){
        	$scope.message = "Error!";
        });
	};

    $scope.startOver = function(){
    	$scope.message = "";
    	document.getElementById("form").reset();
    	$scope.formSubmitted = false;
    	$scope.results = [];
    }       
});

