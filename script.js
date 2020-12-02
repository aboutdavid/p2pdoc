document.addEventListener("DOMContentLoaded", async () => {
  const node = await window.Ipfs.create({ repo: "ipfs-" + Math.random() });
  window.node = node;
  if (window.location.hash.substr(1) != "") {
    (async () => {
      window.loadDoc();
    })();
  }
  document.getElementById("savebtn").disabled = false;
  document.getElementById("savebtn").setAttribute("class", "block");
  document.getElementById("savebtn").innerHTML = "Save!";
});
window.loadDoc = async function() {
  for await (const data of window.node.cat(window.location.hash.substr(1))) {
    window.editor.render(JSON.parse(data.toString()));
  }
};
window.saveDoc = function() {
  window.editor
    .save()
    .then(outputData => {
      console.log("Article data: ", outputData.blocks);
      (async () => {
        var res = JSON.stringify({ blocks: outputData.blocks });
        const { cid } = await window.node.add(res);
        await window.node.pin.add(cid.string);
        navigator.clipboard
          .writeText(`https://${location.hostname}/#${cid.string}`)
          .then(
            function() {
              document.getElementById("savebtn").innerHTML = "Saved!";
              setTimeout(function() {
                document.getElementById("savebtn").innerHTML = "Save!";
              }, 3000);
            },
            function() {
              document.getElementById("savebtn").innerHTML =
                "Failed to save :/";
              setTimeout(function() {
                document.getElementById("savebtn").innerHTML = "Save!";
              }, 3000);
            }
          );
      })();
    })
    .catch(error => {
      console.log("Saving failed: ", error);
    });
};
var pwa = window.PWAinit();
pwa.name = "P2Pdoc";
pwa.short_name = "P2Pdoc";
pwa.description =
  "P2Pdoc allows you to create a document and then upload it to the distributed web!";
pwa.icons = [
  window.PWAIcon("/img/android-chrome-192x192.png", "192x192", "png"),
  window.PWAIcon("/img/android-chrome-512x512.png", "512x512", "png"),
  window.PWAIcon("/img/apple-touch-icon.png", "180x180", "png"),
  window.PWAIcon("/img/favicon-16x16.png", "16x16", "png"),
  window.PWAIcon("/img/favicon-32x32.png", "32x32", "png")
];
window.PWAInject(pwa, "/sw.js");
