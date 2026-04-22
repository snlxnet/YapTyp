typst compile --input mode=notes  content.typ note{0p}.svg
typst compile --input mode=slides content.typ slide{0p}.svg

# html
cat head.html slide*.svg mid.html note*.svg tail.html > player.html

# cleanup
rm note*.svg slide*.svg

echo 'Compilation complete. Open `player.html` in your browser to view'
