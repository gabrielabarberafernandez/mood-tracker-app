// 🌿 Mood Tracker App — versión con borrar y editar

const moodButtons = document.querySelectorAll(".mood-btn");
const noteInput = document.getElementById("note");
const saveButton = document.getElementById("saveMood");
const moodList = document.getElementById("moodList");
const motivationalMessage = document.getElementById("motivational-message");

let selectedMood = "";
let moods = JSON.parse(localStorage.getItem("moods")) || [];

// 💬 Mensajes motivacionales aleatorios
const messages = [
  "🌸 Cada día es una nueva oportunidad para florecer.",
  "☀️ Eres más fuerte de lo que crees.",
  "🌿 Tu bienestar importa, cuídate con amor.",
  "🌈 Hoy puede ser un gran día para empezar de nuevo.",
  "🪷 Respira. Estás haciendo lo mejor que puedes.",
];

// Mostrar mensaje motivacional
function showMotivationalMessage() {
  const random = Math.floor(Math.random() * messages.length);
  motivationalMessage.textContent = messages[random];
}
showMotivationalMessage();

// 😄 Seleccionar estado de ánimo con efecto visual
moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Quitar resaltado de todos
    moodButtons.forEach((btn) => btn.classList.remove("selected"));
    // Resaltar el seleccionado
    button.classList.add("selected");
    // Guardar estado
    selectedMood = button.dataset.mood;
  });
});


// 💾 Guardar estado
saveButton.addEventListener("click", () => {
  if (!selectedMood) {
    alert("Selecciona un estado de ánimo antes de guardar 🌸");
    return;
  }

  const note = noteInput.value.trim();
  const date = new Date().toLocaleDateString();

  const entry = { id: Date.now(), mood: selectedMood, note, date };
  moods.push(entry);
  localStorage.setItem("moods", JSON.stringify(moods));

  renderMoods();
  noteInput.value = "";
  selectedMood = "";
  moodButtons.forEach((b) => b.classList.remove("active"));
  showMotivationalMessage();
});

// 🗑 Borrar estado
function deleteMood(id) {
  moods = moods.filter((m) => m.id !== id);
  localStorage.setItem("moods", JSON.stringify(moods));
  renderMoods();
}

// ✏️ Editar estado
function editMood(id) {
  const moodToEdit = moods.find((m) => m.id === id);
  if (!moodToEdit) return;

  noteInput.value = moodToEdit.note;
  selectedMood = moodToEdit.mood;

  // Visual feedback en botones
  moodButtons.forEach((b) => {
    if (b.dataset.mood === selectedMood) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });

  // Eliminar el antiguo para reemplazarlo al guardar
  moods = moods.filter((m) => m.id !== id);
  localStorage.setItem("moods", JSON.stringify(moods));
  renderMoods();
}

// 📋 Mostrar estados
function renderMoods() {
  moodList.innerHTML = "";

  moods.forEach((m) => {
    const li = document.createElement("li");
    li.classList.add("history-entry");
    li.innerHTML = `
      <span>${m.date} — ${m.mood} ${m.note ? "• " + m.note : ""}</span>
      <div class="actions">
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    li.querySelector(".delete-btn").addEventListener("click", () => deleteMood(m.id));
    li.querySelector(".edit-btn").addEventListener("click", () => editMood(m.id));

    moodList.appendChild(li);
  });
}

// Render inicial
renderMoods();