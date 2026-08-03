Browser-optimized paged export for Typst
with videos, speaker notes, and custom elements.

## Usage

```typst
#import "@preview/yap:0.1.0": video, notes

#video("example.mp4")
#notes[Speaker notes]
```

See [the demo presentation](https://yap.snlx.net).

Then:

- If you're using the [Typst web app](https://typst.app),
  export as SVG and select the zip file
- If you're using the local compiler with Firefox or Safari,
  select the individual SVGs using the same button
- If you're using the local compiler with Chromium,
  run `typst watch main.typ main{p}.svg` select the folder
  with the sources and the SVGs

## Background

YapTyp was initially built for a talk at my uni
because different versions of PowerPoint and LibreOffice
handle videos and speaker notes differently and don't play together,
but the browser is the same-ish everywhere.
