if (window) {
  throw new Error("This cannot run in a browser.");
}
require("./runtime/index.js")
const config = require("./config.js")
if(config.installPackages){
  require("./install.js").run(config.packages)
}