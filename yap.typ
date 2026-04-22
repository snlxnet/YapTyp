#let notes(body) = if sys.inputs.mode == "notes" {
  place(
    top + left,
    box(
      width: 100%,
      height: 100%,
      fill: rgb("1e1e2e"),
      [
        #set text(18pt)
        #body
      ],
    ),
  )
}

#let next() = pagebreak()

#let vid(url, ..args) = [
  #box(width: 100%, height: 100%, fill: rgb("ffffff00"), ..args) #label(url)
]
