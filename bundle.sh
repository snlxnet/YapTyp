tmp="${YAPTYP_DIR:-.}"

typst compile main.typ $tmp/page{0p}.svg

cat $tmp/head.html $tmp/page*.svg $tmp/tail.html > player.html
rm $tmp/page*.svg

cat $tmp/head.html > template.html
echo "INSERT_SVG_HERE" >> template.html
cat $tmp/tail.html >> template.html

echo 'Compilation complete. Saved player.html'
