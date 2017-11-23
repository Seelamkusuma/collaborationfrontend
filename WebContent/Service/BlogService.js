/**
 *BlogService 
 */
app.factory('BlogService',function($http){
	var blogService={}
var Base_URL="http://localhost:8082/CollaborateMiddleware"
	blogService.addBlog=function(blog){
		return $http.post(Base_URL+"/createBlog",blog)
	}
blogService.blogsWaitingForApproval=function(){
	return $http.get(Base_URL+"/getBlogs/"+0)
}
blogService.blogsApproved=function(){
	return $http.get(Base_URL+"/getBlogs/"+1)
}
blogService.getBlogById=function(blogId){
	return $http.get(Base_URL+"/getBlogById/"+blogId)
}

blogService.updateBlog=function(blog){
	return $http.put(Base_URL+"/update",blog)
}
blogService.addComment=function(blogComment){
	return $http.post(Base_URL+"/addComment",blogComment)
}
blogService.getBlogComments=function(blogId){
	return $http.get(Base_URL+"/getComments/"+blogId)
}
blogService.getNotification=function(){
	return $http.get(Base_URL+"/getnotification")
}
return blogService;


})