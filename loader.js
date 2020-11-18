const config = require("./config.js")
if(config.installPackages){
  require("./runtime/install.js").run(config.packages)
}
if(config.runAfterInstall){
  var cmdarray = config.runAfterInstall.split(" ")
  var cmd = cmdarray[0]
  var args = cmdarray
  require("./runtime/exec.js").run(config.runAfterInstall)
}