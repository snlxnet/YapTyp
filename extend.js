function extend() {
  const button = document.querySelector('[data-typst-label="button"]')

  const input = document.createElement("input");
  input.type = "file"
  input.setAttribute("multiple", "true")
  input.style.display = "none"

  const label = document.createElement("label");
  label.appendChild(input)
  label.style.display = "block";
  label.style.width = "100%";
  label.style.height = "100%";
  label.style.cursor = "pointer"

  const foreign = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")
  button.appendChild(foreign)
  foreign.appendChild(label)
  foreign.setAttribute("width", "100%");
  foreign.setAttribute("height", "100%");

  input.addEventListener("input", onFileSelect)
}

async function onFileSelect(event) {
  const files = Array.from(event.target.files || []);
  console.log(event.target)

  if (!files.length) {
    return;
  }

  const body = document.createElement("div");
  if (files[0].type.includes("zip")) {
    body.innerHTML = await readZip(files[0]);
  } else {
    body.innerHTML = await readSvgArray(files);
  }

  createVideos(body);
  createImages(body);

  const template = await fetch("template").then((res) => res.text());
  const generated = template.replace("INSERT_SVG_HERE", body.innerHTML);

  download(generated);
};

async function readSvgArray(files) {
  let body = "";
  for (let file of files) {
    body += await file.text();
  }
  return body;
}

async function readZip(file) {
  const zip = new JSZip();
  const { files } = await zip.loadAsync(file);
  let body = "";
  for (const file of Object.values(files)) {
    body += await file.async("string");
  }
  return body;
}

function download(text) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text),
  );
  element.setAttribute("download", "player.html");
  element.click();
}
