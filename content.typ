#import "./slide.typ": *

#slide[
  = Hello, world
  Example presentation built with YapTyp
]
#notes[
  (insert introduction)
]

#slide[
  == What YapTyp is
  - HTML Generation
  - Speaker Notes
  - Media
]
#notes[
  *YapTyp* is Yet Another Presentation tool for TYPst that
  - generates HTML, not PDF
  - allows inserting videos into the presentation
  - allows opening a window with speaker notes (like impressjs)
  - but does not support animations (yet)
]

#slide[
  == Video Demo

  #player(height: 90%, fill: eastern)<demo.webm>

  Note that the player will try to take up 100% of the available space
]
