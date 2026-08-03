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
  const zipButton = document.querySelector('[data-typst-label="zip"]')

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

  const zipForeign = createForeign()
  zipButton.appendChild(zipForeign)
  zipForeign.appendChild(label)

  const dirButton = document.querySelector('[data-typst-label="dir"]')

  const button = document.createElement("button")
  button.style.width = "100%";
  button.style.height = "100%";
  button.style.opacity = "0";

  const dirForeign = createForeign()
  dirButton.appendChild(dirForeign)
  dirForeign.appendChild(button)

  input.addEventListener("input", onFileSelect)
  button.addEventListener("click", observeDirectory)
}

function createForeign() {
  const foreign = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")
  foreign.setAttribute("width", "100%");
  foreign.setAttribute("height", "100%");
  return foreign
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
  const root = await window.showDirectoryPicker();

  const observer = new FileSystemObserver(([event]) => {
    if (event.type !== "modified") {
      return
    }
    console.log("reload")
  });
  await observer.observe(root);

  // return await openFile(root, "extend.js")

  const prefixes = ["slide", "page"]
  for await (let entry of root.values()) {
    if (entry.name.startsWith("yap") || entry.name.startsWith("preview-banner")) continue // DUCT TAPE WARNING

    if (entry.name.endsWith(".typ")) {
      prefixes.push(entry.name.slice(0, -4))
    }
  }

  readSvgDirentry(root, prefixes)
}

async function readSvgDirentry(root, prefixes) {
  const pages = []

  for await (let entry of root.values()) {
    const name = entry.name

    if (!name.endsWith(".svg")) {
      continue
    }

    if (prefixes.find(prefix => name.startsWith(prefix))) {
      pages.push(await entry.getFile().then(f => f.text()))
    }
  }

  console.log(pages)
}

async function openFile(root, path) {
  const parts = path.split("/")

  if (parts.length === 0) {
    return
  } else if (parts.length === 1) {
    return root.getFileHandle(path).then(handle => handle.getFile())
  }

  const lastDir = await parts.slice(0, -1).reduce(async (acc, curr) => await acc.getDirectoryHandle(curr), root)
  return lastDir.getFileHandle(parts.at(-1)).then(handle => handle.getFile())
}
