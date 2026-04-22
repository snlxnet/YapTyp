# YapTyp

[![preview](./preview-banner.svg)](https://snlxnet.github.io/YapTyp/)

This is Yet Another Presentation builder for Typst, the key differences from the rest are:
- it generates HTML, not PDF
- it allows inserting videos into the presentation
- it allows opening a window with speaker notes (like impressjs)
- and generates an article version (slides + notes)

Things worth keeping in mind:
- no animation support
- very little opinions - the styling is up to you

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
- `demo.webm` is from WikiMedia Commons, [source](https://commons.wikimedia.org/wiki/File:Butterfly_catastrophe_animation.webm)

## Project Status
This was built in a few days, I do intend to keep working on it,
though it does pretty much everything I want it to do for now.
If you have any suggestions, please open an issue or write me an email.

