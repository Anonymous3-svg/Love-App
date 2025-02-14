// Load existing notes when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadNotes();
  loadMusic();
  showRandomQuote();
  typeLoveMessage();
});

// 🔸 Toggle Love Notes Section
document.getElementById("loveNotes").addEventListener("click", () => {
  let section = document.getElementById("loveNotesSection");
  section.style.display = section.style.display === "block" ? "none" : "block";
});

// 🔸 Add a Love Note
document.getElementById("addNote").addEventListener("click", addLoveNote);

function addLoveNote() {
  let noteInput = document.getElementById("loveNoteInput");
  let noteText = noteInput.value.trim();

  if (noteText === "") {
    alert("Please enter a love note!");
    return;
  }

  let notes = JSON.parse(localStorage.getItem("loveNotes")) || [];
  notes.push(noteText);
  localStorage.setItem("loveNotes", JSON.stringify(notes));

  noteInput.value = "";
  loadNotes(); // Refresh the displayed notes
}

// 🔸 Load and Display Love Notes (Persists on Exit)
function loadNotes() {
  let notesList = document.getElementById("notesList");
  let notes = JSON.parse(localStorage.getItem("loveNotes")) || [];

  notesList.innerHTML = ""; // Clear previous notes before reloading

  notes.forEach((note, index) => {
    let noteDiv = document.createElement("div");
    noteDiv.classList.add("note-item"); // Optional styling class
    noteDiv.textContent = note;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteNote(index);

    noteDiv.appendChild(deleteBtn);
    notesList.appendChild(noteDiv);
  });
}

// 🔸 Delete a Love Note (Only Removes When Clicking ❌)
function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("loveNotes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("loveNotes", JSON.stringify(notes));
  loadNotes(); // Refresh the displayed notes
}

// 🔸 Music Upload & Playback
document.getElementById("uploadMusic").addEventListener("change", uploadMusic);
document.getElementById("playMusic").addEventListener("click", toggleMusic);

function uploadMusic(event) {
  let file = event.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      localStorage.setItem("customMusic", e.target.result);
      loadMusic();
    };
    reader.readAsDataURL(file);
  }
}

function loadMusic() {
  let musicPlayer = document.getElementById("musicPlayer");
  let savedMusic = localStorage.getItem("customMusic");

  if (savedMusic) {
    document.getElementById("audioSource").src = savedMusic;
    musicPlayer.load();
  }
}

function toggleMusic() {
  let musicPlayer = document.getElementById("musicPlayer");

  if (!musicPlayer.src || musicPlayer.src === window.location.href) {
    alert("No music uploaded yet!");
    return;
  }

  if (musicPlayer.paused) {
    musicPlayer.play().catch(error => {
      alert("Your browser blocked autoplay. Tap again to play!");
    });
  } else {
    musicPlayer.pause();
  }
}

// 🔸 Typing Animation for Love Messages
function typeLoveMessage() {
  let messages = [
        "You are my sunshine ☀️",
        "Every moment with you is special 💖",
        "I love you more than words can say ❤️",
        "You complete my world 🌎",
        "Forever and always 💕"
    ];

  let index = 0;
  let messageDiv = document.createElement("div");
  messageDiv.id = "typingEffect";
  document.querySelector(".glass-card").appendChild(messageDiv);

  function typeMessage() {
    messageDiv.innerHTML = "";
    let text = messages[index];
    let i = 0;

    function typeLetter() {
      if (i < text.length) {
        messageDiv.innerHTML += text[i];
        i++;
        setTimeout(typeLetter, 100);
      } else {
        setTimeout(() => {
          index = (index + 1) % messages.length;
          typeMessage();
        }, 2000);
      }
    }

    typeLetter();
  }

  typeMessage();
}

// 🔸 Surprise Reveal Button
let surpriseButton = document.createElement("button");
surpriseButton.textContent = "💝 Secret Surprise";
surpriseButton.classList.add("btn");
document.querySelector(".glass-card").appendChild(surpriseButton);

let surpriseDiv = document.createElement("div");
surpriseDiv.id = "secretSurprise";
surpriseDiv.style.display = "none";
surpriseDiv.innerHTML = "<h2>🎁 A Special Surprise for You! 🎁</h2><p>You mean the world to me! 💖</p>";
document.querySelector(".glass-card").appendChild(surpriseDiv);

surpriseButton.addEventListener("click", () => {
  surpriseDiv.style.display = "block";
  surpriseDiv.style.animation = "fadeIn 1s ease-in-out";
});

// 🔸 Love Quotes Generator
let quotes = [
    "Love is not about how many days, months, or years you have been together. It is about how much you love each other every day. 💕",
    "You are my today and all of my tomorrows. ❤️",
    "To love and be loved is to feel the sun from both sides. ☀️",
    "Every love story is beautiful, but ours is my favorite. 💖",
    "You make my heart smile. 😊"
];

function showRandomQuote() {
  let quoteContainer = document.createElement("div");
  quoteContainer.id = "loveQuote";
  document.querySelector(".glass-card").appendChild(quoteContainer);

  function changeQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    quoteContainer.innerHTML = `<p>${quotes[randomIndex]}</p>`;
  }

  changeQuote();
  setInterval(changeQuote, 5000);
}
