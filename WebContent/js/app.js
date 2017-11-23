/**
 * Angular Js Module
 */
var app=angular.module("app",['ngRoute','ngCookies'])
app.config(function($routeProvider){
	$routeProvider
	.when('/RegistrationForm',{
		templateUrl:'views/RegistrationForm.html',
		controller:'UserController'
		})
		.when('/Home',{
			templateUrl:'views/Home.html',
			 controller:'HomeController'
		})
		.when('/Login',{
			templateUrl:'views/Login.html',
			controller:'UserController'
		})
		.when('/editprofile',{
			templateUrl:'views/editprofile.html',
			controller:'UserController'
		})
		.when('/addblog',{
			templateUrl:'views/blogform.html',
			controller:'BlogController'
		})
		.when('/getblogs',{
			templateUrl:'views/bloglist.html',
			controller:'BlogController'
		})
		.when('/getBlogById/:blogId',{
			templateUrl:'views/blogdetails.html',
			controller:'BlogDetailController'
		})
		.when('/getapprovalform/:blogId',{
			templateUrl:'views/blogapprovalform.html',
			controller:'BlogDetailController'
		})
		.when('/addjob',{
			templateUrl:'views/jobform.html',
			controller:'JobController'
		})
		.when('/getjobs',{
			templateUrl:'views/joblist.html',
			controller:'JobController'
		})
		.when('/profilepic',{
		templateUrl:'views/profilepic.html'
	})
	.when('/getsuggestedusers',{
			templateUrl:'views/suggestedusers.html',
			controller:'FriendController'
		})
		.when('/pendingrequests',{
			templateUrl:'views/pendingrequests.html',
			controller:'FriendController'
		})
		.when('/listoffriends',{
			templateUrl:'views/listoffriends.html',
			controller:'FriendController'
		})
		.when('/chat',{
		templateUrl:'views/chat.html',
		controller:'ChatController'
	    })
	    
        .otherwise({
			templateUrl:'views/Home.html'
		})
})
app.run(function($rootScope,$cookieStore,UserService,$location,BlogService){
	console.log('entering app.run function')
	if($rootScope.currentUser==undefined)
		$rootScope.currentUser=$cookieStore.get('userDetails')
		
		$rootScope.logout=function(){
		console.log('entering logout function')
		UserService.logout().then(function(response){
			console.log('loggedout successfully')
			delete $rootScope.currentUser;
				$cookieStore.remove('userDetails')
				$location.path('/Login')
		},function(response){
			console.log(response.status)
			if(response.status==401){
				console.log('error in logout')
				delete $rootScope.currentUser;
				$cookieStore.remove('userDetails')
				$location.path('/Login')
			}
		})
	}
	BlogService.getNotification().then(function(response){
		$rootScope.blogApprovalStatus=response.data //List of BlogPost 
		$rootScope.approvalStatusLength=$rootScope.blogApprovalStatus.length  //Number of objects 
	},function(response){
		if(response.status==401)
			$location.path('/Login')
	})
	$rootScope.updateViewedStatus=function(blog){
		blog.viewed=1
		BlogService.updateBlog(blog).then(function(response){
			getNotification();
		},function(response){
			if(response.status==401)
				$location.path('/Login')
		})
	}
})