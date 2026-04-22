typst compile --input mode=notes main.typ note{0p}.svg
typst compile --input mode=slides main.typ slide{0p}.svg
typst compile --input mode=article --features=html main.typ article.html

cat head.html slide*.svg mid.html note*.svg tail.html > player.html
rm note*.svg slide*.svg

echo 'Compilation complete. Saved:'
echo '- player.html'
echo '- article.html'
