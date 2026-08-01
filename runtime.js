let slides = []
let currentSlide = 0;
let lastIntervalId = 0;

load()

async function load() {
  slides.forEach(slide => slide.remove())
  let idx = 1;

  while (true) {
    const response = await fetch(`/slide${idx}.svg`, { cache: "no-cache" }).catch(() => false)
    if (!response || response.status > 299) break;
    document.body.innerHTML += await response.text()
    idx++
  }

  try {
    updateSlides()
  } catch(e) {
    console.error(e)
  }
}

function updateSlides() {
  slides = document.querySelectorAll("body>svg");

  createVideos(document.body);
  createImages(document.body);

  updateDisplayMode()
  showSlide(currentSlide)

  extend()
}

//////////////////////////////////////////

const channel = new BroadcastChannel("control");
channel.addEventListener("message", ({ data: idx }) =>
  showSlide(idx, true),
);

function updateDisplayMode() {
  const notes = document.getElementById("notes");
  const noteBlocks = Array.from(slides).map(findNotes);

  if (noteBlocks.filter(Boolean).length > 0) {
    noteBlocks.map(wrapNotes).forEach((el) => notes.appendChild(el));
    document.body.classList.remove("book-mode");
    document.querySelectorAll("video").forEach((video) => {
      video.removeAttribute("controls");
    });
  } else {
    document.body.classList.add("book-mode");
    document.querySelectorAll("video").forEach((video) => {
      video.setAttribute("controls", "true");
    });
  }

  document.querySelectorAll("a").forEach((el) =>
    el.addEventListener("click", (event) => {
      event.stopPropagation();
    }),
  );
  document.getElementById("full").onclick = fullscreen;
  document.getElementById("next").onclick = nextSlide;
  document.getElementById("prev").onclick = prevSlide;
}

document.addEventListener("keydown", (event) => {
  const actions = {
    ArrowRight: nextSlide,
    ArrowDown: nextSlide,
    ArrowLeft: prevSlide,
    ArrowUp: prevSlide,
    Home: firstSlide,
    End: lastSlide,
    f: fullscreen,
  };

  actions[event.key]();
});

function fullscreen() {
  document.body.requestFullscreen();
  document.getElementById("notes").innerHTML = "";
  firstSlide();
}

function firstSlide() {
  showSlide(0);
}
function lastSlide() {
  showSlide(slides.length - 1);
}

function nextSlide() {
  console.log(currentSlide, slides.length, slides)
  if (currentSlide + 1 === slides.length) {
    firstSlide();
  } else {
    showSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide === 0) {
    lastSlide();
  } else {
    showSlide(currentSlide - 1);
  }
}

function showAll() {
  slides.forEach((slide) => {
    slide.classList.add("visible");
  });
}

function showSlide(idx, quiet = false) {
  if (idx === 0) {
    createTimer();
  }

  document
    .querySelectorAll(".note-title")
    .forEach((el) => el.classList.remove("highlight"));
  document.getElementById("notes" + idx)?.classList.add("highlight");
  console.log("notes" + idx, document.getElementById("notes" + idx));
  currentSlide = idx;
  slides.forEach((slide, currentIdx) => {
    let videos = Array.from(slide.querySelectorAll("video"));
    if (currentIdx !== idx) {
      slide.classList.remove("visible");
      videos.forEach((video) => {
        video.pause();
        requestAnimationFrame(() => (video.currentTime = 0));
      });
    } else {
      slide.classList.add("visible");
      videos.forEach((video) => video.play());
    }
  });
  if (!quiet) {
    channel.postMessage(idx);
  }
  document.dispatchEvent(new Event("slideswitched"));
}

function findNotes(parent) {
  return Array.from(parent.querySelectorAll("[data-typst-label]"))
    .filter((element) => element.dataset.typstLabel)
    .filter((element) => element.dataset.typstLabel.startsWith("note://"))
    .map((element) => element.dataset.typstLabel.replace("note://", ""))
    .join("\n");
}

function wrapNotes(note, slideIdx) {
  const container = document.createElement("div");
  container.innerHTML = note || "<p></p>";
  const heading = document.createElement("h2");
  heading.textContent = "Slide " + slideIdx;
  heading.id = "notes" + slideIdx;
  heading.classList.add("note-title");
  container.prepend(heading);
  return container;
}


function createTimer() {
  const started = new Date();
  const timer = document.getElementById("timer");

  clearInterval(lastIntervalId);
  timer.textContent = "00:00";

  lastIntervalId = setInterval(() => {
    const seconds = (new Date() - started) / 1000;
    timer.textContent =
      prettifyNumber(seconds / 60) + ":" + prettifyNumber(seconds % 60);
  }, 1000);
}

function prettifyNumber(x) {
  if (x > 100) {
    return Math.floor(x);
  }

  return ("00" + Math.floor(x)).slice(-2);
}
