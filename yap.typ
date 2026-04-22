#let notes(body) = if sys.inputs.mode == "notes" {
  place(
    top + left,
    box(
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
    ),
  )
}

#let next() = pagebreak()

#let vid(url, ..args) = [
  #box(width: 100%, height: 100%, fill: rgb("ffffff00"), ..args) #label(url)
]
