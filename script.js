document.addEventListener("DOMContentLoaded", async () => {
  const node = await window.Ipfs.create({ repo: "ipfs-" + Math.random() });
  window.node = node;

  const status = node.isOnline() ? "online" : "offline";

  console.log(`Node status: ${status}`);
  document.getElementById("status").innerHTML = `Node status: ${status}`;

  // You can write more code here to use it. Use methods like
  // node.add, node.get. See the API docs here:
  // https://github.com/ipfs/js-ipfs/tree/master/packages/interface-ipfs-core
});

window.saveDoc = function() {
  window.editor
    .save()
    .then(outputData => {
      console.log("Article data: ", outputData.blocks);
      (async () => {
        var res = JSON.stringify({ blocks: outputData.blocks });
        const { cid } = await window.node.add(res);

        navigator.clipboard
          .writeText(`https://${location.hostname}/#${cid.string}`)
          .then(
            function() {
              /* clipboard successfully set */
            },
            function() {
              /* clipboard write failed */
            }
          );
      })();
    })
    .catch(error => {
      console.log("Saving failed: ", error);
    });
};
window.addEventListener("DOMContentLoaded", event => {
  if (window.location.hash.substr(1) != "") {
    (async () => {
      for await (const data of window.node.cat(
        window.location.hash.substr(1)
      )) {
        window.editor.render(JSON.parse(data.toString()));
      }
    })();
  }
});
