/**
 * HomeController
 */
app.controller('HomeController',function(BlogService,$rootScope,$location){
	function getNotification(){
		// returns list of blogposts which are approved/rejected by admin
		//and updated status is not yet viewed by user
		BlogService.getNotification().then(function(response){
			$rootScope.blogApprovalStatus=response.data //List of BlogPost 
			$rootScope.approvalStatusLength=$rootScope.blogApprovalStatus.length  //Number of objects 
		},function(response){
			if(response.status==401)
				$location.path('/Login')
		})
	}
	
	$rootScope.updateViewedStatus=function(blog){
		blog.viewed=1
		BlogService.updateBlog(blog).then(function(response){
			getNotification();
		},function(response){
			if(response.status==401)
				$location.path('/Login')
		})
	}
	
	$rootScope.updateLength=function()
	{
		$rootScope.approvalStatusLength=0
	}
	getNotification()
})
