const moodButtons = document.querySelectorAll(".mood-btn");
const saveButton = document.getElementById("saveMood");
const noteInput = document.getElementById("note");
const moodList = document.getElementById("moodList");

let selectedMood = null;

moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedMood = btn.dataset.mood;
    moodButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

saveButton.addEventListener("click", () => {
  if (!selectedMood) {
    alert("Por favor, elige un estado de ánimo 😊");
    return;
  }

  const note = noteInput.value;
  const entry = {
    mood: selectedMood,
    note,
    date: new Date().toLocaleDateString()
  };

  // guardar en localStorage
  const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
  history.push(entry);
  localStorage.setItem("moodHistory", JSON.stringify(history));

  renderHistory();
  noteInput.value = "";
  selectedMood = null;
  moodButtons.forEach(b => b.classList.remove("selected"));
});

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
  moodList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.date} - ${entry.mood} ${entry.note ? "– " + entry.note : ""}`;
    moodList.appendChild(li);
  });
}

// render al cargar
renderHistory();