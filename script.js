document.addEventListener("DOMContentLoaded", async () => {
  const node = await window.Ipfs.create({ repo: "ipfs-" + Math.random() });
  window.node = node;
  if (window.location.hash.substr(1) != "") {
    (async () => {
      for await (const data of window.node.cat(
        window.location.hash.substr(1)
      )) {
        window.editor.render(JSON.parse(data.toString()));
      }
    })();
  }
  document.getElementById("savebtn").disabled = false;
  document.getElementById("savebtn").setAttribute("class", "block");
  document.getElementById("savebtn").innerHTML = "Save!";
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
