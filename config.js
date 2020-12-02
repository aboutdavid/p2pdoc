module.exports = {
  installPackages: true,
  packages: [
    "normalize.min.css",
    "blocks.css",
    "@aboutdavid/easypwa",
    "@editorjs/editorjs",
    "@editorjs/quote",
    "@editorjs/inline-code",
    "@editorjs/underline",
    "@editorjs/marker",
    "@editorjs/list",
    "@editorjs/code",
    "@editorjs/table",
    "@editorjs/delimiter",
    "@editorjs/simple-image",
    "@editorjs/header"
  ],
  runCmdAfterInstall: false,
  runAfterInstall: "echo Finished installing!"
};
