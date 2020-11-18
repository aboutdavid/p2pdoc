const config = require("../config.js");
function run(packages) {
  var { spawn } = require("child_process");
  var action = ["install"];
  var args = ["--silent"];
  packages = action.concat(packages).concat(args);
  var cmd = spawn("npm", packages);

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
    if (config.runAfterInstall && config.runCmdAfterInstall) {
      var cmdarray = config.runAfterInstall.split(" ");
      var cmd = cmdarray[0];
      var args = cmdarray.slice(1);
      require("./exec.js").run(cmd, args);
    }
  });
}

module.exports = { run };
