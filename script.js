document.addEventListener("DOMContentLoaded", async () => {
  const node = await window.Ipfs.create({ repo: "ipfs-" + Math.random() });
  window.node = node;
  if (window.location.hash.substr(1) != "") {
    (async () => {
      window.loadDoc();
    })();
  } else {
    (async () => {
      for await (const data of window.node.cat(
        "QmXBA1GRRj7UCzARoJ6pFXyhAHUKUjYKiFeQttB2Zp8hzY"
      )) {
        window.editor.render(JSON.parse(data.toString()));
      }
    })();
  }
  document.getElementById("savebtn").disabled = false;
  document.getElementById("savebtn").setAttribute("class", "block");
  document.getElementById("savebtn").innerHTML = "Save!";
  document.getElementById("clearbtn").disabled = false;
  document.getElementById("clearbtn").setAttribute("class", "block");
  document.getElementById("downloadbtn").disabled = false;
  document.getElementById("downloadbtn").setAttribute("class", "block");
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
function downloadAsHtml() {
  window.editor.save().then(outputData => {
    window.download(
      window.EditorJSParser.render(outputData),
      `${new Date().toISOString()}.html`,
      "text/html"
    );
  });
}
