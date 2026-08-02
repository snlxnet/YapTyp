load()

async function load() {
  slides.forEach(slide => slide.remove())
  let idx = 1;

  while (true) {
    const response = await fetch(`/slide${idx}.svg`, { cache: "no-cache" }).catch(() => false)
    if (!response || response.status > 299) break;
    document.body.innerHTML += await response.text()
    idx++
  }

  try {
    reload()
    extend()
  } catch(e) {
    console.error(e)
  }

  document.getElementById("save").onclick = download
}

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

  const oldSlides = document.querySelectorAll("body>svg");
  oldSlides.forEach(slide => slide.remove())

  if (files[0].type.includes("zip")) {
    document.body.innerHTML += await readZip(files[0]);
  } else {
    document.body.innerHTML += await readSvgArray(files);
  }

  createVideos(document.body);
  createImages(document.body);
  reload()
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

function download() {
  document.getElementById("save").style.display = "none"
  reload()
  firstSlide()

  const html = Array.from(document.children).map(child => child.innerHTML).join("\n")

  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/html;charset=utf-8," + encodeURIComponent(html),
  );
  element.setAttribute("download", "player.html");
  element.click();

  document.getElementById("save").style.display = null
}

async function observeDirectory() {
  const directoryHandle = await window.showDirectoryPicker();

  const observer = new FileSystemObserver(([event]) => {
    if (event.type !== "modified") {
      return
    }
    console.log("reload")
  });
  await observer.observe(directoryHandle);
}
