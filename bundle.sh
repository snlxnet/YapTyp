tmp="${YAPTYP_DIR:-.}"

typst compile main.typ $tmp/page{0p}.svg

cat $tmp/head.html $tmp/page*.svg $tmp/tail.html > player.html
rm $tmp/page*.svg

echo 'Compilation complete. Saved player.html'
