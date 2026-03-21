#let player(..args) = box(width: 100%, height: 100%, fill: rgb("#ffffff00"), ..args)
#let notes(body) = []
#let slide(body) = page(
  paper: "presentation-16-9",
  box(body),
)

#let styling(doc) = {
  set text(size: 24pt)
  doc
}
