'use strict';

console.log();
console.log('----- RUNNING IN RESOURCES RUNLEVEL ------');
console.log('-----', process.argv[0]);
console.log('-----', process.argv[1]);
console.log('-----', process.argv[2]);
//console.log('-----', Object.keys(process));

//for(var arg of process.argv[2]){
//  console.log('----- ARG', arg);
//}

if( process.argv[2] ){

  // Messaging
  process.send({fromChild: true});
  process.on('message', function(data){
    console.log('RES RUNLEVEL:', data);
  });

  //console.log();
  //console.log('ITERATE:');
  //var sum = 0;
  //for(var i=0; i<100^3; i++){
  //  //console.log('>', i);
  //  sum += i;
  //}
  //console.log();
  //console.log('>>', sum);

}

console.log();
console.log();