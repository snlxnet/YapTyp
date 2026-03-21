with (import <nixpkgs> {});
mkShell {
  buildInputs = [
    typst
  ];
}
