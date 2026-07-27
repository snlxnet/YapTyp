# YapTyp

[![preview](./preview-banner.svg)](https://snlxnet.github.io/YapTyp/)

Add videos, web images, iframes, and interactive speaker notes
to your Typst documents.

YapTyp was initially built for my talk at the uni.
The idea was that different versions of PowerPoint and LibreOffice
handle videos and speaker notes differently, but the browser is the same everywhere.

This project
- generates HTML, not PDF
- allows inserting videos into the presentation
  - but then we needed to make a book so if you don't use the notes it will run in book mode
- allows opening a window with speaker notes (kinda like impressjs)
- but does not support animations

## Getting Started

1. `curl https://snlx.net/yaptyp/ | sh`
2. edit `main.typ`
3. run the `curl https://snlx.net/yaptyp/ | sh` again to rebuild

If you want to add it to the project more permanently, you have a few options:
- clone this repo
- wait until I make an eleventy starter config :)

## Requirements

The system should have typst and some kind of shell.
If you have Nix, you can run `nix-shell`.

## Credits

- The [typst](https://typst.app) compiler is the heart of this project
- [Catppuccin](https://github.com/catppuccin/typst) is the theme used for speaker notes by default

## Project Status
This was built in a few days, I do intend to keep working on it,
though it does pretty much everything I want it to do for now.
If you have any suggestions, please open an issue or write me an email.

