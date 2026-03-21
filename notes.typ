#let player(..args) = []
#let notes(body) = body
#let slide(body) = pagebreak()

#let styling(doc) = {
  import "@preview/catppuccin:1.1.0": catppuccin, flavors
  show: catppuccin.with(flavors.mocha)

  counter(page).update(0)
  set page(paper: "a6", flipped: true, numbering: "1 / 1", margin: 10mm)
  set text(size: 3.5mm, font: "DejaVu Sans Mono")
  show emph: set text(fill: flavors.mocha.colors.sapphire.rgb)
  show strong: set text(fill: flavors.mocha.colors.sapphire.rgb)

  align(
    horizon + center,
    text(
      size: 10mm,
      fill: flavors.mocha.colors.sapphire.rgb,
      weight: "bold",
      "Presenter's Notes",
    )
  )

  doc
}
