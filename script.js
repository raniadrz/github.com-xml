const form = document.querySelector("form");
const fileInput = document.getElementById("file-input");
const treeContainer = document.getElementById("tree-container");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const file = fileInput.files[0];
  processFile(file);
});

fileInput.addEventListener("change", handleFileInputChange);


function handleFileInputChange(event) {
  const file = event.target.files[0];
  processFile(file);
}

function handleDragOver(event) {
  event.preventDefault();
  treeContainer.classList.add("drag-over");
}

function processFile(file) {
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const xmlString = event.target.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");
      const tree = createTree(xmlDoc.documentElement);
      treeContainer.innerHTML = "";
      treeContainer.appendChild(tree);
    };
    reader.readAsText(file);
  }
}


    function createTree(xmlNode) {
    document.getElementById("text-title").innerHTML = "Try another file";
    document.getElementById("text-second-title").innerHTML = "Tree diagram";
      const ul = document.createElement("ul");
      const nodeName = document.createElement("li");
      nodeName.textContent = xmlNode.nodeName;
      ul.appendChild(nodeName);
      if (xmlNode.hasAttributes()) {
        const attributes = document.createElement("ul");
        for (const attribute of xmlNode.attributes) {
          const li = document.createElement("li");
          li.textContent = `${attribute.nodeName}: ${attribute.nodeValue}`;
          attributes.appendChild(li);
        }
        ul.appendChild(attributes);
      }
      for (const child of xmlNode.children) {
        ul.appendChild(createTree(child));
      }
      return ul;
    }
