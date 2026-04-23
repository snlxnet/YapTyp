tmp="${YAPTYP_DIR:-.}"

typst compile --input mode=notes main.typ $tmp/note{0p}.svg
typst compile --input mode=slides main.typ $tmp/slide{0p}.svg &> /dev/null
typst compile --input mode=article --features=html main.typ article.html &> /dev/null

cat $tmp/head.html $tmp/slide*.svg $tmp/mid.html $tmp/note*.svg $tmp/tail.html > player.html
rm $tmp/note*.svg $tmp/slide*.svg

echo 'Compilation complete. Saved:'
echo '- player.html'
echo '- article.html'
