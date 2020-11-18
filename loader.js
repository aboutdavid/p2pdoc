const config = require("./config.js");
if (config.installPackages) {
  require("./runtime/install.js").run(config.packages);
}
if (config.runAfterInstall && config.runCmdAfterInstall) {
  var cmdarray = config.runAfterInstall.split(" ");
  var cmd = cmdarray[0];
  var args = cmdarray.slice(1);
  require("./runtime/exec.js").run(cmd, args);
}
