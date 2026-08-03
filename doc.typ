#import "@preview/tidy:0.4.3"
#import "@preview/catppuccin:1.1.0": catppuccin, flavors, show-module
#import "yap.typ": notes, video

#let flavor = flavors.mocha
#let teal = flavor.colors.teal.rgb
#let white = flavor.colors.text.rgb

#set text(font: "JetBrains Mono", size: 14pt)
#show raw: set text(font: "JetBrains Mono", size: 14pt)
#set align(horizon)
#show: catppuccin.with(flavor)

#set page(
  paper: "a5",
  flipped: true,
  margin: (top: 3cm, bottom: 1cm, x: 1cm),
  fill: flavor.colors.mantle.rgb,
  header: place(dy: 10mm, {
    set text(16pt)

    box(
      fill: rgb("#1e1e2e"),
      stroke: 1mm + teal,
      radius: 1em,
      outset: (y: 5mm, x: 5mm),
      grid(
        columns: (1fr, auto),
        align: horizon,
        image(
          "logo.svg",
          height: 1.2em,
        ),
        text(
          fill: white,
          [*Yap*],
        ),
      ),
    )
  }),
)

/*
#video(
  "https://weldlab.github.io/video/omni.mp4",
  aspect-ratio: "1.3333",
  height: 70%,
)
#notes[
  Slide one speaker notes
]
#pagebreak()

= This is a presentation example
\<- Speaker notes\
And this is the actual slide

If you don't know what Typst is,
#link("https://typst.app", underline[check it out])

#notes[
  Yap is a Typst package
  that adds video and speaker note support.
]

#pagebreak()
*/

1. Import & use the library
   ```typst
   #import "@preview/yap:0.1.0": video, notes

   #video("example.mp4")
   #notes[Notes enable presentation mode]
   ```

2. Export
   - #link("https://typst.app")[Typst web app] ->
     export SVG -> select the zip
   - Typst compiler -> compile to SVG -> select folder

#let button(message) = box(
  baseline: 0.6em,
  inset: 0.6em,
  stroke: 1mm + teal,
  fill: rgb("12345600"),
  radius: 0.6em,
  text(fill: teal, message),
)

3. Select #button[ZIP / SVGs (static)]<zip> or #button[Folder with SVGs (auto-reloads)]<dir>

#notes[
  Add videos and interactive speaker notes to your Typst documents
  in 3 steps.

  If you're using the local compiler and anything but Firefox or Safari,
  the preview will auto-update if the SVGs change.
  Press the download button when you want to export the presentation.

  To generate a book, don't use speaker notes.
]

#pagebreak()

#let docs = tidy.parse-module(read("yap.typ"))
#set align(top+left)
#set text(size: 11pt)
#show raw: set text(size: 11pt)
#show-module(docs, show-outline: false)

#align(bottom+center)[\@snlxnet 2026]
