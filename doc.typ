#let print-mode = true
#import "@preview/tidy:0.4.3"
#import "@preview/catppuccin:1.1.0": catppuccin, flavors

#let show-module = if print-mode { tidy.show-module } else { catppuccin.show-module }
#let teal = if print-mode { cmyk(100%, 0%, 50%, 0%) } else { flavors.mocha.colors.teal.rgb }

#set page(flipped: true, columns: 2, margin: 1cm)
#set text(font: "JetBrainsMono NF", size: 11pt)
#show raw: set text(font: "JetBrainsMono NF", size: 11pt)
#if print-mode { show: catppuccin.with(flavors.mocha) }

#{
  set text(1.2em)

  box(
    stroke: teal + 1mm,
    radius: 1em,
    inset: 1em,
    grid(
      columns: (1fr, auto),
      align: horizon,
      image(
        if print-mode { "logo-print.svg" } else { "logo.svg" },
        height: 1.2em,
      ),
      text(
        fill: teal,
        link("https://snlx.net/yaptyp")[*YapTyp*],
      ),
    ),
  )
}

#let docs = tidy.parse-module(read("yap.typ"))
#show-module(docs, show-outline: false)

#align(bottom+center)[\@snlxnet 2026]
