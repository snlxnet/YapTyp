#let vidata = plugin("vidata.wasm") // https://github.com/snlxnet/vidata

#let notes(body) = context if target() != "html" {
  place(top + left)[
    #box(
      width: 100%,
      height: 100%,
      outset: 50%,
      fill: rgb("1e1e2e"),
      [
        #set text(
          size: 18pt,
          font: "DejaVu Sans Mono",
          fill: rgb("cdd6f4"),
        )
        #show emph: set text(fill: rgb("b4befe"))
        #show strong: set text(fill: rgb("b4befe"))
        #show link: set text(fill: rgb("a6e3a1"))
        #body
      ],
    )<note>
  ]
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
    let video = eval(str(metadata))

    placeholder = ```xml
      <svg viewBox="0 0 WIDTH HEIGHT" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:h5="http://www.w3.org/1999/xhtml">
      </svg>
    ```.text.replace("WIDTH", str(video.width)).replace("HEIGHT", str(video.height))
    placeholder = image(bytes(placeholder), format: "svg")
  }

  [#box(fill: rgb("12345678"), ..args, placeholder)#label(url)]
}
