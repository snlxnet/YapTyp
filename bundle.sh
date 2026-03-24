# notes
echo "
#import \"./notes.typ\": *
#show: styling
$(cat content.typ)
" > main.typ
typst compile main.typ note{0p}.svg

# slides
echo "
#import \"./slide.typ\": *
#show: styling
$(cat content.typ)
" > main.typ
typst compile main.typ slide{0p}.svg

# html
cat head.html slide*.svg mid.html note*.svg tail.html > player.html

# cleanup
rm note*.svg slide*.svg main.typ

echo 'Compilation complete. Open `player.html` in your browser to view'
