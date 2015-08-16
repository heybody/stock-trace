function test(arg){
  console.log(arg[0]);
}
test(process.argv.slice(2));