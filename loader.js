const config = require("./config.js");
if (config.installPackages) {
  require("./runtime/install.js").run(config.packages);
}

