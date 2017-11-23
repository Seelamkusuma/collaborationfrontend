/**
 * UserController
 */
app.controller('UserController',function($scope,UserService,$location,$rootScope,$cookieStore){
	$scope.registerUser=function(){
		console.log("USER DATA IS" + $scope.user)
		UserService.registerUser($scope.user).then(function(response){
		console.log(response.data)
		console.log(response.status)
		alert('submitted sucessfully')
		$location.path('/Login')
	},function(response){
		console.log(response.data)
		console.log(response.status)
		$scope.error=response.data
		$location.path('/RegistrationForm')
		
		})
	}
	$scope.Login=function(){
		console.log("USER DATA IS"+$scope.user)
		UserService.Login($scope.user).then(function(response){
			$rootScope.currentUser=response.data//response.data is User object
			console.log(response.data)
			$cookieStore.put('userDetails',response.data)
			$location.path('/Home')
		},function(response){
			$scope.error=response.data.message
			$location.path('/Login')
		})
	}
	$scope.updateUser=function(){
		console.log('entering is')
		UserService.updateUser($scope.user).then(function(response){
			alert('updated the details successfully')
			$location.path('/Home')
		},function(response){
			
		if(response.status==401){
			$location.path('/Login')
		}
		else{
			$scope.error=response.data
			$location.path('/editprofile')
		}
		})
	}
	if($rootScope.currentUser!=undefined){
		UserService.getUser().then(function(response){
			$scope.user=response.data
		},function(response){
			console.log(response.status)
			
		})
	}
})