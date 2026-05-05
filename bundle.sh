tmp="${YAPTYP_DIR:-.}"

typst compile --features=html main.typ $tmp/slide{0p}.svg
typst compile --features=html main.typ article.html &> /dev/null

cat $tmp/head.html $tmp/slide*.svg $tmp/tail.html > player.html
rm $tmp/slide*.svg

echo 'Compilation complete. Saved:'
echo '- player.html'
echo '- article.html'
