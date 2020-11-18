module.exports = {
  installPackages: true, // boolean, should the runtime install packages from npm?
  packages: ["chalk"], // Array, npm pacakges that should be installed if "installPackages" is set to true
  runCmdAfterInstall: true, // boolean, Should the runtime run a command after package install?
  runAfterInstall: "echo Hello World! I run after the NPM installation!" // string, command that should be ran if "runCmdAfterInstall" is set to true
};
