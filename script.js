let words = [];
let current = 0;
let completed = JSON.parse(localStorage.getItem("completedWords")) || [];
let stats = JSON.parse(localStorage.getItem("stats")) || { rounds: 0, learned: 0 };

const chinese = document.getElementById("chinese");
const pinyin = document.getElementById("pinyin");
const translation = document.getElementById("translation");
const showBtn = document.getElementById("show");
const knowBtn = document.getElementById("know");
const dontKnowBtn = document.getElementById("dontknow");
const completedEl = document.getElementById("completed");
const totalEl = document.getElementById("total");
const resetBtn = document.getElementById("reset");

async function loadWords() {
  const res = await fetch("data/words.json");
  const data = await res.json();
  words = data.filter(w => !completed.includes(w.chinese));
  totalEl.textContent = data.length;
  showCard();
}

function showCard() {
  if (words.length === 0) {
    chinese.textContent = "🎉 Все слова изучены!";
    pinyin.textContent = "";
    translation.textContent = "";
    showBtn.classList.add("hidden");
    knowBtn.classList.add("hidden");
    dontKnowBtn.classList.add("hidden");
    return;
  }
  const word = words[current];
  chinese.textContent = word.chinese;
  pinyin.textContent = word.pinyin;
  translation.textContent = `${word.russian} / ${word.english}`;
  translation.classList.add("hidden");
  showBtn.classList.remove("hidden");
  knowBtn.classList.add("hidden");
  dontKnowBtn.classList.add("hidden");
}

showBtn.onclick = () => {
  translation.classList.remove("hidden");
  showBtn.classList.add("hidden");
  knowBtn.classList.remove("hidden");
  dontKnowBtn.classList.remove("hidden");
};

knowBtn.onclick = () => {
  const word = words[current];
  completed.push(word.chinese);
  stats.learned++;
  localStorage.setItem("completedWords", JSON.stringify(completed));
  localStorage.setItem("stats", JSON.stringify(stats));
  completedEl.textContent = completed.length;
  nextCard();
};

dontKnowBtn.onclick = () => nextCard();

function nextCard() {
  current = (current + 1) % words.length;
  if (current === 0) {
    words = words.filter(w => !completed.includes(w.chinese));
  }
  showCard();
}

resetBtn.onclick = () => {
  completed = [];
  stats.rounds++;
  localStorage.setItem("completedWords", JSON.stringify([]));
  localStorage.setItem("stats", JSON.stringify(stats));
  completedEl.textContent = 0;
  loadWords();
};

window.onload = () => {
  completedEl.textContent = completed.length;
  loadWords();
};
