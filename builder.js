let extendScriptTimeoutId = -1
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

  const input = document.createElement("input");
  input.type = "file"
  input.setAttribute("multiple", "true")
  input.style.display = "none"

  const label = document.createElement("label");
  label.appendChild(input)
  label.style.display = "block";
  label.style.cursor = "pointer"
  getTypstLabel("zip").appendChild(label)

  const dirButton = document.createElement("button")
  dirButton.style.opacity = "0";
  getTypstLabel("dir").appendChild(dirButton)

  input.addEventListener("input", onFileSelect)
  dirButton.addEventListener("click", observeDirectory)

  reload()

  const extendScript = document.createElement("script")
  extendScript.id = "extend"
  extendScript.src = "extend.js"
  document.body.appendChild(extendScript)

  document.addEventListener("keydown", (event) => {
    if (event.key === "d" || event.key === "Enter") {
      download()
    }
  })

  document.querySelector('script[src="builder.js"]').remove()
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

async function download() {
  breakDirentryMedia()
  createTimer()
  firstSlide()

  const runtime = await fetch("runtime.js").then(res => res.text())
  const html = Array.from(document.children).map(child => child.innerHTML).join("\n").replace(`<script src="runtime.js"></script>`, `<script>${runtime}</script>`)

  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/html;charset=utf-8," + encodeURIComponent(html),
  );
  element.setAttribute("download", "player.html");
  element.click();

  unbreakDirentryMedia()
}

async function observeDirectory() {
  const root = await window.showDirectoryPicker();

  const prefixes = ["slide", "page"]
  for await (let entry of root.values()) {
    if (entry.name.startsWith("yap") || entry.name.startsWith("preview-banner")) continue // DUCT TAPE WARNING

    if (entry.name.endsWith(".typ")) {
      prefixes.push(entry.name.slice(0, -4))
    }
  }

  const observer = new FileSystemObserver(([event]) => {
    showCurrent()
  });
  await observer.observe(root);

  showCurrent()

  async function showCurrent() {
    const oldSlides = document.querySelectorAll("body>svg");
    oldSlides.forEach(slide => slide.remove())

    document.body.innerHTML += await readSvgDirentry(root, prefixes)

    clearTimeout(extendScriptTimeoutId)
    extendScriptTimeoutId = setTimeout(async () => {
      document.getElementById("extend")?.remove()
      const extend = document.createElement("script")
      extend.id = "extend"
      extend.innerHTML = await openFile(root, "extend.js").then((f) => f.text(), () => "")
      document.body.appendChild(extend)
      reload()
    }, 100)
    fixDirentryMedia(root)
  }
}

async function fixDirentryMedia(root) {
  Array.from(document.querySelectorAll("video"))
    .filter(video => !video.getAttribute("src").includes("://"))
    .map(async (video) => {
      const src = video.getAttribute("src")
      const file = await openFile(root, src)
      const url = URL.createObjectURL(file)
      video.setAttribute("src", url)
      video.dataset.originalPath = src
    })

  Array.from(document.querySelectorAll("img"))
    .map(async (img) => {
      const src = img.getAttribute("src")
      const file = await openFile(root, img.getAttribute("src"))
      const url = URL.createObjectURL(file)
      img.setAttribute("src", url)
      img.dataset.originalPath = src
    })
}

async function breakDirentryMedia() {
  document.querySelectorAll("video, img").forEach(media => {
    if (!media.dataset.originalPath) return
    media.dataset.blob = media.src
    media.src = media.dataset.originalPath
  })
}

async function unbreakDirentryMedia() {
  document.querySelectorAll("video, img").forEach(media => {
    if (!media.dataset.blob) return
    media.src = media.dataset.blob
    delete media.dataset.blob
  })
}

async function readSvgDirentry(root, prefixes) {
  const pages = []

  for await (let entry of root.values()) {
    const name = entry.name

    if (!name.endsWith(".svg")) {
      continue
    }

    if (prefixes.find(prefix => name.startsWith(prefix))) {
      const body = await entry.getFile().then(f => f.text())
      pages.push({name, body})
    }
  }

  return pages.sort((a, b) => (
    a.name.match(/\d+/)[0] - b.name.match(/\d+/)[0]
  )).map(({body}) => body).join("\n")
}

async function openFile(root, path) {
  const parts = path.replaceAll("./", "").split("/").filter(Boolean)

  if (parts.length === 0) {
    return
  } else if (parts.length === 1) {
    return root.getFileHandle(parts[0]).then(handle => handle.getFile())
  }
  console.log('dir', path)

  const lastDir = await parts.slice(0, -1).reduce(async (acc, curr) => await acc.getDirectoryHandle(curr), root)
  return lastDir.getFileHandle(parts.at(-1)).then(handle => handle.getFile())
}
