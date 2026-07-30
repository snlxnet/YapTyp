# YapTyp

[![banner](./yaptyp.svg)](https://yap.snlx.net)

Browser-optimized paged export for Typst.

Add videos and interactive speaker notes to your Typst documents.

## Writing the document

```typst
#import "@preview/yap:0.1.0": video, notes

#video("example.mp4")
#notes[Notes enable presentation mode]
```

[Full documentation](https://yap.snlx.net/doc.pdf)

## Hydrating

- If you're using the [Typst web app](https://typst.app),
  export as SVG and select the zip file on https://yap.snlx.net
- If you're using the local compiler, select the individual SVGs

## Background

YapTyp was initially built for my talk at the uni.
The idea was that different versions of PowerPoint and LibreOffice
handle videos and speaker notes differently, but the browser is the same everywhere.

It works by inserting `<labels>` into the SVG,
then reading them and replacing the elements that have them
with `<foreignElement>`.
