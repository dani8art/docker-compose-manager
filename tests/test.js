var dockerManager = require("../index.js");

dockerManager.dockerComposeUp("/home/darteaga/Programacion/workspaces/mongoDB/mongodb-cluster/", [ "-d" ], function(stdout, stderr){

	console.log(stdout + stderr);
	
	setTimeout(function(){
		
		dockerManager.dockerExec("mongo00", "mongo replicaSet.js", ["-t"], function(stdout1){
		console.log(stdout1);

		}, function(err, stderr){
			console.log(err + stderr);
		});

	}, 10000);
	
}, function(error){
	console.log(error);
});