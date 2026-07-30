#import "./lib.typ": video, img, notes

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

#image("yap.svg", width: 8cm, height: 5cm, fit: "contain")
#img("yap.svg", width: 8cm, height: 5cm, fit: "contain")
#notes[
  Slide two speaker notes
]

#pagebreak()
Second noteless slide

#video(
  "https://weldlab.github.io/video/omni.mp4",
  aspect-ratio: "1.3333",
  width: 50%,
  height: 50%
)

