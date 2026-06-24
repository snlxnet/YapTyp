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

= YapTyp
Press `n` to open speaker notes

#notes[
  (insert introduction)
]
#next()

== What YapTyp is
- HTML Generation
- Speaker Notes
- Media

#notes[
  *YapTyp* is Yet Another Presentation tool for TYPst that
  - generates HTML, not PDF
  - allows inserting videos into the presentation
  - allows opening a window with speaker notes (like impressjs)
  - but does not support animations (yet)

  Example *bold*, _italic_, and https://example.com link text
]
#next()

#box[
  == Video Demo
  #box(clip: true, radius: 1em, vid("omni.mp4", height: 80%))

  Videos behave like images now
]
#notes[
  The file is from #link("https://commons.wikimedia.org/wiki/File:Butterfly_catastrophe_animation.webm")[wikimedia commons]
]
#next()

#context if target() != "html" [
  This presentaiton is also available as an article,\
  click #link("article.html")[here] to open
]
