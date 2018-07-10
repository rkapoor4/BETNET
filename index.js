import cluster from 'cluster';
import os from 'os';
import server from './server';

//if (cluster.isMaster) {
//    var cpuCount = os.cpus().length;

//    for (let i = 0; i < cpuCount; i += 1) {
//        cluster.fork()
//    }
  
//} else {
	server()
//}