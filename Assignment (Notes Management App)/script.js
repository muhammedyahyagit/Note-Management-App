const noteForm = document.getElementById("note-form");
const noteTitle = document.getElementById("note-title");
const noteDescription = document.getElementById("note-description");
const notesList = document.getElementById("notes-list");

function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  notesList.innerHTML = ""; 
  const notes = getNotes();

  if (notes.length === 0) {
    notesList.innerHTML = `<p>No notes available. Add a new note!</p>`;
    return;
  }

  notes.forEach((note, index) => {
    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card");

    noteCard.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.description}</p>
      <button onclick="deleteNote(${index})">X</button>
    `;

    notesList.appendChild(noteCard);
  });
}


noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = noteTitle.value.trim();
  const description = noteDescription.value.trim();

  if (title === "" || description === "") {
    alert("Both fields are required!");
    return;
  }

  const notes = getNotes();
  notes.push({ title, description });
  saveNotes(notes);

  noteTitle.value = "";
  noteDescription.value = "";

  renderNotes();
});


function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1);
  saveNotes(notes);
  renderNotes();
}


document.addEventListener("DOMContentLoaded", renderNotes);