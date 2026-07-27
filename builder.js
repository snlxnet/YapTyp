const fileList = document.getElementById("source-files")

fileList.oninput = async () => {
  const files = Array.from(fileList.files || [])

  const body = document.createElement("div")
  for (let file of files) {
    const text = await file.text()
    body.innerHTML += text
  }

  createVideos(body)
  createImages(body)

  const template = await fetch("/template").then(res => res.text())
  const generated = template.replace("INSERT_SVG_HERE", body.innerHTML)

  download(generated)
}

function download(text) {
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", "player.html");
  element.click();
}

function createVideos(root) {
    Array.from(root.querySelectorAll("[data-typst-label]"))
        .filter(element => element.dataset.typstLabel?.startsWith("vid://"))
        .map(anchor => {
            const video = document.createElement("video")
            const image = anchor.querySelector("image")
            if (!image) {
                console.error("Failed to create video", anchor)
                return
            }
            const src = anchor.dataset.typstLabel.replace("vid://", "")
            video.src = src.startsWith("http") ? src : "./" + src
            video.loop = true
            video.preload = "auto"
            image.appendChild(video)
            image.outerHTML = `<foreignObject transform="${image.attributes.transform?.value || ''}" width="${image.attributes.width.value}" height="${image.attributes.height.value}">` + image.innerHTML + `</foreignObject>`
        })
}

function createImages(root) {
    Array.from(root.querySelectorAll("[data-typst-label]"))
        .filter(element => element.dataset.typstLabel?.startsWith("img://"))
        .map(parent => {
            const url = parent.dataset.typstLabel.replace("img://", "")
            const anchor = parent.querySelector(".typst-shape")
            const rectShape = anchor.attributes.getNamedItem("d").value.split(" ")
            const height = rectShape.at(3)
            const width = rectShape.at(5)
            parent.innerHTML = `<foreignObject width="${width}" height="${height}"><img src="${url}" /></foreignObject>`
        })
}

