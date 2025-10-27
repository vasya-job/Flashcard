let words = [];
let index = 0;

fetch('data/words.json')
  .then(response => response.json())
  .then(data => {
    words = data;
    showCard();
  });

function showCard() {
  const card = words[index];
  document.getElementById('chinese').textContent = card.chinese;
  document.getElementById('pinyin').textContent = card.pinyin;
  document.getElementById('russian').textContent = card.russian;
  document.getElementById('english').textContent = card.english;
}

document.getElementById('next').onclick = () => {
  index = (index + 1) % words.length;
  showCard();
};

document.getElementById('prev').onclick = () => {
  index = (index - 1 + words.length) % words.length;
  showCard();
};
