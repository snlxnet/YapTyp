#let vidata = plugin("vidata.wasm") // https://github.com/snlxnet/vidata

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
    } else {
      ("", )
    }
    wrapper.first() + to-html(it.body) + wrapper.last()
  } else if it == [ ] {
    " "
  }
}

#let notes(body) = context if target() != "html" {
  let url = "note://<p>" + to-html(body) + "</p>"
  place(top + left)[#box(width: 0mm, height: 0mm, fill: none, stroke: none)#label(url)]
} else {
  block(body)
}

#let next() = context if target() != "html" {
  pagebreak()
}

#let vid(url, ..args) = context if target() == "html" {
  html.video(
    controls: true,
    src: url,
  )
} else {
  let props = args.named()

  let placeholder = []
  if url.ends-with(".mp4") {
    let metadata = vidata.from(read(url, encoding: none))
    let video = eval(str(metadata)).find(track => track.type == "Video")

    placeholder = ```xml
      <svg viewBox="0 0 WIDTH HEIGHT" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:h5="http://www.w3.org/1999/xhtml">
      </svg>
    ```.text.replace("WIDTH", str(video.width)).replace("HEIGHT", str(video.height))
    placeholder = image(bytes(placeholder), format: "svg")
  }

  [#box(fill: rgb("12345678"), ..args, placeholder)#label(url)]
}
