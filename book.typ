#import "./lib.typ": use-local, video

// automatically get the aspect ratio of local videos
// disabled by defalt because uploading videos to the project
// makes little sense with the official web app
// if you have limited storage
#use-local() 

Local video:
#video("omni.mp4")

Remote video:
#video(
  "https://weldlab.github.io/video/omni.mp4",
  aspect-ratio: "1.33", // default: 16 / 9
)

