const config = require("../config.js");
function run(cmd, args) {
  var { spawn } = require("child_process");
  var cmd = spawn(cmd, args);

  cmd.stdout.on("data", data => {
    console.log(data.toString());
  });

  cmd.stderr.on("data", data => {
    console.error(data.toString());
  });

  cmd.on("error", error => {
    console.error(error.message.toString());
  });

  cmd.on("close", code => {
    console.log(`NPM installation exited ${(code == 0) ? "successfully": "unsuccessfully"}`.toString());
  });
}
module.exports = { run };
