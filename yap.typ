#let vidata = plugin("vidata.wasm") // https://github.com/snlxnet/vidata
#let yap-enable-fs = state("yap-enable-fs", false)
#let use-local-videos() = yap-enable-fs.update((_current) => true)

#let to-html(it) = {
  if type(it) == str {
    it
  } else if type(it) != content {
    str(it)
  } else if it.func() == parbreak {
    "</p><p>"
  } else if it.has("text") {
    it.text
  } else if it.has("children") {
    it.children.map(to-html).join()
  } else if it.has("body") {
    let wrapper = if it.func() == strong {
      ("<strong>", "</strong>")
    } else if it.func() == emph {
      ("<em>", "<em>")
    } else if it.func() == heading {
      let level = str(it.depth)
      ("#"*level+" ", "\n")
    } else if it.func() == link {
      ("<a href=\""+it.dest+"\">", "</a>")
    } else if it.func() == list.item {
      ("<ul><li>", "</li></ul>")
    } else if it.func() == enum.item {
      ("<ol><li>", "</li></ol>")
    } else {
      ("", )
    }
    wrapper.first() + to-html(it.body) + wrapper.last()
  } else if it == [ ] {
    " "
  }
}

#let notes(body) = context if target() != "html" {
  let url = "note://<p>" + to-html(body).replace("</ul> <ul>", "").replace("</ol> <ol>", "") + "</p>"
  place(top + left)[#box(width: 0mm, height: 0mm, fill: none, stroke: none)#label(url)]
} else {
  block(body)
}

#let next() = context if target() != "html" {
  pagebreak()
}

#let vid(url, ..args, aspect-ratio: "16/9") = context if target() == "html" {
  html.video(
    controls: true,
    src: url,
  )
} else {
  let vertical = true

  let placeholder = ```xml
    <svg viewBox="0 0 WIDTH HEIGHT" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:h5="http://www.w3.org/1999/xhtml">
    </svg>
  ```.text

  // Auto aspect ratio
  if (not url.contains("://")) and yap-enable-fs.get() and url.ends-with(".mp4") {
    let metadata = vidata.from(read(url, encoding: none))
    let video = eval(str(metadata)).find(track => track.type == "Video")
    vertical = video.height > video.width

    placeholder = placeholder.replace("WIDTH", str(video.width)).replace("HEIGHT", str(video.height))
  }

  // Manual aspect ratio
  let width = float(eval(aspect-ratio))
  let height = 1.0
  vertical = height > width
  placeholder = placeholder
    .replace("WIDTH", str(width))
    .replace("HEIGHT", str(height))

  // Build the image
  placeholder = image(
    bytes(placeholder),
    format: "svg",
    ..if vertical or "height" in args.named() {
      (height: 100%)
    } else {
      (width: 100%)
    }
  )

  [#box(fill: rgb("12345678"), ..args, placeholder)#label(url)]
}
