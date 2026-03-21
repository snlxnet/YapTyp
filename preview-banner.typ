#import "@preview/catppuccin:1.1.0": catppuccin, flavors
#show: catppuccin.with(flavors.mocha)
#set text(size: 24pt, font: "DejaVu Sans Mono")
#set page(paper: "presentation-16-9", fill: none, margin: 0mm)
#set align(horizon + center)

#box(fill: flavors.mocha.colors.base.rgb, width: 100%, height: 100%, radius: 1em)[
  = YapTyp

  Yet Another Presentation builder for typst

  #text(fill: flavors.mocha.colors.sapphire.rgb)[Click to open an example presentation]
]
