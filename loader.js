if (window) {
  throw new Error("This cannot run in a browser.");
}
require("./runtime/index.js")