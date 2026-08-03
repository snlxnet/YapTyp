extend()

function extend() {
  const bookButton = document.createElement("button")
  bookButton.style.opacity = "0";
  getTypstLabel("book").appendChild(bookButton)
  bookButton.addEventListener("click", toggleBook)

  getTypstLabel("say-hi").onclick = () => alert("hi")

  const input = document.createElement("input")
  input.type = "color"
  getTypstLabel("input").appendChild(input)
}

function toggleBook() {
  document.body.classList.toggle("book-mode")
}
