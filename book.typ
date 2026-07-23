#import "./yap.typ": notes, next, vid

#let style(doc) = context if target() == "html" {
  html.link(
    rel: "stylesheet",
    href: "styles.css",
  )
  doc
} else {
  // set page(paper: "presentation-16-9")
  set text(size: 24pt)
  set align(horizon)
  show link: set text(fill: eastern)
  doc
}
#show: style

#set page(paper: "a3", flipped: true)
= YapTyp

#set page(paper: "a4", flipped: false)

== What YapTyp is
- HTML Generation
- Media
- Speaker Notes
- Tab Sync

#pagebreak()

*YapTyp* is Yet Another Presentation tool for TYPst that
- generates HTML, not PDF
- allows inserting videos into the presentation
- allows opening a window with speaker notes (kinda like impressjs)
- but does not support animations (yet)

Example *bold*, _italic_, and https://example.com link text

== Video Demo
#vid("omni.mp4")

