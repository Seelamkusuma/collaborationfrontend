/**
 * FriendController
 */
app.controller('FriendController',function($scope,$location,FriendService){
	function listOfSuggestedUsers(){
		console.log('entering function 33')
		FriendService.listOfSuggestedUsers().then(function(response){
			$scope.suggestedUsers=response.data
		}
		,function(response){
			if(response.status==401)
				$location.path('/Login')
		
		})
	}
	function pendingRequests(){
		console.log('entering function 2')
		FriendService.pendingRequests().then(function(response){
			
			console.log(response.data)
			$scope.pendingRequests=response.data
			
		},function(response){
			if(response.status==401)
				$location.path('/Login')
		
		})
	}
	$scope.sendFriendRequest=function(toId){
		console.log('entering function 1')
		FriendService.sendFriendRequest(toId).then(function(response){
			alert('Friend Request has been succesfully')
			
			console.log(response.status)
			listOfSuggestedUsers()
			$location.path('/getsuggestedusers')
		},function(response){
			if(response.status==401)
				$location.path('/Login')
		
		})
	}
	$scope.updatePendingRequest=function(request,statusValue){
	console.log(request)
	console.log(request.status)
	request.status=statusValue
	console.log(request.status)
	console.log(request)
	FriendService.updatePendingRequest(request).then(function(response){
		pendingRequests()
		$location.path('/pendingrequests')
	},function(response){
		if(response.status==401)
			$location.path('/Login')
	})
}
	listOfSuggestedUsers()
	pendingRequests()
})