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
  let width = none
  let height = none
  let props = args.named()

  if url.ends-with(".mp4") {
    let metadata = vidata.from(read(url, encoding: none))
    let video = eval(str(metadata))

    if "width" in props and "height" in props {
      width = props.width
      height = props.height
    } else if "width" in props {
      width = props.width
      height = video.height / video.width * props.width
    } else if "height" in props {
      height = props.height
      width = video.width / video.height * props.height
    } else {
      width = video.width
      height = video.height
    }
  }

  [#box(fill: rgb("12345600"), ..args, width: width, height: height)#label(url)]
}
