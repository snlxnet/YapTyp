#import "./yap.typ": notes, next, vid

#let style(doc) = context if target() == "html" {
  html.link(
    rel: "stylesheet",
    href: "styles.css",
  )
  doc
} else {
  set page(paper: "presentation-16-9")
  set text(size: 24pt)
  set align(horizon)
  show link: set text(fill: eastern)
  doc
}
#show: style
#show "Typst": set text(fill: eastern)

= YapTyp

Add videos, web images, iframes, and interactive speaker notes
to your Typst documents.

#notes[
  To hide the notes, press `f` or the fullscreen icon below.
]
#next()

== What YapTyp is
- HTML Generation
- Media
- Speaker Notes
- Tab Sync

#notes[
  *YapTyp* was initially built for my talk at the uni.
  The idea was that different versions of PowerPoint and LibreOffice
  handle videos and speaker notes differently, but the browser is the same everywhere.

  This project
  - generates HTML, not PDF
  - allows inserting videos into the presentation
    - but then we needed to make a book so if you don't use the notes it will run in book mode
  - allows opening a window with speaker notes (kinda like impressjs)
  - but does not support animations

  Speaker notes don't allow using anything that isn't convertable to MarkDown.
  Example *bold*, _italic_, and https://example.com link text.
]
#next()

#box[
  == Video Demo
  #box(clip: true, radius: 1em, vid("omni.mp4", height: 80%))

  Videos behave like images now
]
#notes[
  All the shortcuts work as you would expect:
  - #sym.arrow.r #sym.arrow.b go to the next slide
  - #sym.arrow.l #sym.arrow.t go to the previous slide
  - HOME goes to the beginning
  - END goes to the end
  - f starts the fullscreen presentation

  If you duplicate the tab and press #sym.arrow.r, for example,
  both tabs will switch to the next slide.
]
#next()

#context if target() != "html" [
  This presentaiton is also available as an article,\
  click #link("article.html")[here] to open
]
#notes[
  YapTyp also has article mode, which is when it exports an HTML page.
  #link("https://snlxnet.github.io/YapTyp/article.html")[Example.]
]
