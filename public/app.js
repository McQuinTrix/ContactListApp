(function(){
	var app = angular.module('myApp',[]);
	app.controller('AppController',['$scope','$http',function($scope,$http){
		var refresh = function(){
		$http.get('/contactlist').success(function(response){
			console.log("Yes we did");
			$scope.contactlist = response;
		});};
		refresh();
			
		$scope.addContact = function(){
			$http.post('/contactlist',$scope.cont).success(
			function(response){console.log(response);});
			console.log($scope.cont);
			refresh();
		};
		
		$scope.remove = function(id){
			console.log(id);
			$http.delete('/contactlist/'+id);
			refresh();
		}
	
		$scope.edit = function(id){
			console.log(id);
			$http.get('/contactlist/'+id).success(function(response){$scope.cont = response;});
		};
		$scope.update = function(){
			console.log($scope.cont._id);
			$http.put('/contactlist/'+$scope.cont._id, $scope.cont).success(function(resp){
				refresh();
			});
		}
		$scope.deselect = function(){
			$scope.cont = "";
		}
	}]);
})();
