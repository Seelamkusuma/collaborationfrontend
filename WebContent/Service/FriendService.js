/**
 * FriendService
 */
app.factory('FriendService',function($http){
	var friendService={}
	var BASE_URL="http://localhost:8082/CollaborateMiddleware"
		friendService.listOfSuggestedUsers=function(){
		return $http.get(BASE_URL + "/getsuggestedusers")
	}
	friendService.sendFriendRequest=function(toId){
		return $http.get(BASE_URL + "/friendrequest/"+toId)
	}
	friendService.pendingRequests=function(){
		return $http.get(BASE_URL + "/pendingRequests")
	}
	friendService.updatePendingRequest=function(request){
		return $http.put(BASE_URL + "/updatependingrequest",request)
	}
	friendService.listOfFriends=function(){
		return $http.get(BASE_URL + "/friendslist")
	}
	return friendService;
})