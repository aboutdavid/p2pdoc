const config = require("../config.js")
function run(cmd){
 var { spawn } = require("child_process");
var cmd = spawn(cmd, []);

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