with (import <nixpkgs> {});
mkShell {
  buildInputs = [
    typst
    typescript-language-server
    nodejs_24
  ];
}
