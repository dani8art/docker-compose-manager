/*!
docker-composer-manager 0.0.3, built on: 2017-03-30
Copyright (C) 2017 Daniel Arteaga
http://darteaga.com
https://github.com/dani8art/docker-compose-manager

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/

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