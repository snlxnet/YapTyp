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
} else [
  #box(width: 100%, height: 100%, fill: rgb("ffffff00"), ..args) #label(url)
]
