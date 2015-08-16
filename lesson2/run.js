process.send('run something here ');
try{
   ff();
}catch (err){
  process.send('err='+err);
  process.exit(1);
}