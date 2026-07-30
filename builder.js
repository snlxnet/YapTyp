const fileList = document.getElementById("source-files");

fileList.oninput = async () => {
  const files = Array.from(fileList.files || []);

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

function createVideos(root) {
  Array.from(root.querySelectorAll("[data-typst-label]"))
    .filter((element) => element.dataset.typstLabel?.startsWith("vid://"))
    .map((anchor) => {
      const video = document.createElement("video");
      const image = anchor.querySelector("image");
      if (!image) {
        console.error("Failed to create video", anchor);
        return;
      }
      const src = anchor.dataset.typstLabel.replace("vid://", "");
      video.src = src.startsWith("http") ? src : "./" + src;
      video.loop = true;
      video.preload = "auto";
      image.appendChild(video);
      image.outerHTML =
        `<foreignObject transform="${image.attributes.transform?.value || ""}" width="${image.attributes.width.value}" height="${image.attributes.height.value}">` +
        image.innerHTML +
        `</foreignObject>`;
    });
}

function createImages(root) {
  Array.from(root.querySelectorAll("[data-typst-label]"))
    .filter((element) => element.dataset.typstLabel?.startsWith("img"))
    .map((parent) => {
      const [metadata, url] = parent.dataset.typstLabel.split("://");
      const anchor = parent.querySelector(".typst-shape");
      const rectShape = anchor.attributes.getNamedItem("d").value.split(" ");
      const height = rectShape.at(3);
      const width = rectShape.at(5);
      const [_img, fit] = metadata.split("-");
      parent.innerHTML = `<foreignObject width="${width}" height="${height}"><img src="${url}" style="object-fit: ${fit}" /></foreignObject>`;
    });
}
