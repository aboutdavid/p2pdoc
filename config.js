module.exports = {
  installPackages: true, // boolean, should the runtime install packages from npm?
  packages: ["@editorjs/editorjs"], // Array, npm pacakges that should be installed if "installPackages" is set to true
  runCmdAfterInstall: false, // boolean, Should the runtime run a command after package install?
  runAfterInstall: null // string, command that should be ran if "runCmdAfterInstall" is set to true
};
