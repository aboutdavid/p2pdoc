function run(packages){
 var { spawn } = require("child_process");
  var args = ["--silent"]
packages = args.concat(packages)
var cmd = spawn("npm install", packages);

cmd.stdout.on("data", data => {
    console.log(data);
});

cmd.stderr.on("data", data => {
    console.error(data);
});

cmd.on('error', (error) => {
    console.error(error.message);
});

cmd.on("close", code => {
    console.log(`child process exited with code ${code}`);
});
}