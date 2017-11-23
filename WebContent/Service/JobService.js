/**
 * JobService
 */
app.factory('JobService',function($http){
	var jobService={}
	var BASE_URL="http://localhost:8082/CollaborateMiddleware"
	
		jobService.addJob=function(job){
		return $http.post(BASE_URL+"/addJob",job)
	}
	jobService.getJobs=function(){
		return $http.get(BASE_URL+"/getJobs")
	}
	jobService.getJobDetails=function(jobId){
		return $http.get(BASE_URL+"/getJobDetails/"+jobId)
	}
	return jobService
})