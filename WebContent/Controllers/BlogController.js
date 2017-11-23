/**
 * BlogController
 */
app.controller('BlogController',function($scope,BlogService,$location){
	$scope.addBlog=function(){
		BlogService.addBlog($scope.blog).then(function(response){
			alert('Blog added and waiting for Approval')
	$location.path('/Home')
		},function(response){
			$scope.error=response.data
			if(response.status==401)
				$location.path('/Login')
				else
					$location.path('/addblog')	
		})
	}
	function blogsApproved(){
		console.log("entering")
		BlogService.blogsApproved().then(function(response){
			
			$scope.listOfBlogsApproved=response.data
			console.log(response.status)
		},function(response){
		if(response.status==401)
			$location.path('/Login')
		
		
		})
	}
	function blogsWaitingForApproval(){
		console.log("entering 2")
		BlogService.blogsWaitingForApproval().then(function(response){
			
			$scope.listOfBlogsWaitingForApproval=response.data
			console.log(response.status)
		},function(response){
		if(response.status==401)
			$location.path('/Login')
		})
	}
	blogsApproved()
	blogsWaitingForApproval()
})