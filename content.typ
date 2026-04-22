#import "./slide.typ": notes, next, vid

#set page(paper: "presentation-16-9")
#set text(size: 24pt)
#set align(horizon)

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
  - if the notes are longer than an A6 page, they will overflow and currently break the presenter's view
]
#next()

#box[
  == Video Demo
  #vid("demo.webm")
  Note that the player will try to take up 100% of the available space by default
]
#next()

The End.
