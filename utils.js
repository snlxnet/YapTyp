function createVideos(root) {
  Array.from(root.querySelectorAll("[data-typst-label]"))
    .filter((element) => element.dataset.typstLabel?.startsWith("vid://"))
    .map((anchor) => {
      const video = document.createElement("video");
      const fill = anchor.querySelector(".typst-shape")
      fill.remove()
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
