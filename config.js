module.exports = {
  installPackages: true, // boolean, should the runtime install packages from npm?
  packages: ["webpack", "webpack-cli"], // Array, npm pacakges that should be installed if "installPackages" is set to true
  runCmdAfterInstall: true, // boolean, Should the runtime run a command after package install?
  runAfterInstall: "node test.js" // string, command that should be ran if "runCmdAfterInstall" is set to true
};
