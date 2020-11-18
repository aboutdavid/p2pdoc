const config = require("./config.js")
function run(packages){
 var { spawn } = require("child_process");
  var action = ["install"]
  var args = ["--silent"]
packages = action.concat(packages).concat(args)
var cmd = spawn(config.packageInstaller || "npm", packages);

cmd.stdout.on("data", data => {
    console.log(data.toString());
});

cmd.stderr.on("data", data => {
    console.error(data.toString());
});

cmd.on('error', (error) => {
    console.error(error.message.toString());
});

cmd.on("close", code => {
    console.log(`child process exited with code ${code}`.toString());
});
}
module.exports = {run}