#import "./lib.typ": video, image, notes

#set page(paper: "presentation-16-9")
#set text(size: 24pt)

= A slide is just a page
You can also use any package you like.

#video(
  "https://weldlab.github.io/video/omni.mp4",
  aspect-ratio: "1.3333",
  height: 70%,
)
#notes[
  Slide one speaker notes
]

#pagebreak()

Noteless slide

#pagebreak()

Not embedded image
#image("yap.svg")
#notes[
  Slide two speaker notes
]

#pagebreak()
Second noteless slide
