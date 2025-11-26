const products = [
  {
    id: 1,
    name: "Диван «Oslo»",
    price: "54 900 ₽",
    category: "Диваны",
    description: "Сканди-дизайн, съемные чехлы, 10 цветов",
    tag: "Хит",
    accent: "#d5e8ff"
  },
  {
    id: 2,
    name: "Кровать «Cloud»",
    price: "48 500 ₽",
    category: "Кровати",
    description: "Мягкое изголовье, ниша для хранения, 8 тканей",
    tag: "Новинка",
    accent: "#ffe5d9"
  },
  {
    id: 3,
    name: "Стол «Loft 120»",
    price: "26 900 ₽",
    category: "Столы",
    description: "Натуральный дуб, металл, защищенное покрытие",
    tag: "Хит",
    accent: "#e3ffe5"
  },
  {
    id: 4,
    name: "Кресло «Hug»",
    price: "21 700 ₽",
    category: "Кресла",
    description: "Глубокая посадка, бархатная обивка, 6 оттенков",
    tag: "-10%",
    accent: "#f4e8ff"
  },
  {
    id: 5,
    name: "Диван-кровать «City»",
    price: "62 000 ₽",
    category: "Диваны",
    description: "Раскладывается за 5 секунд, ниша для белья",
    tag: "Топ продаж",
    accent: "#fff4d6"
  },
  {
    id: 6,
    name: "Обеденная группа «Nordic»",
    price: "44 500 ₽",
    category: "Столы",
    description: "Стол + 4 стула, влагостойкая столешница",
    tag: "Комплект",
    accent: "#dff7ff"
  },
  {
    id: 7,
    name: "Рабочее место «Focus»",
    price: "32 900 ₽",
    category: "Столы",
    description: "Электроподъемный стол, кабель-менеджмент",
    tag: "Для офиса",
    accent: "#ffe3f0"
  },
  {
    id: 8,
    name: "Тумба «Line»",
    price: "15 900 ₽",
    category: "Хранение",
    description: "Шпон дуба, доводчики, 3 цвета фасада",
    tag: "Новинка",
    accent: "#e8f4ff"
  }
];

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const tabsContainer = document.getElementById("category-tabs");
const quizSubmit = document.getElementById("quiz-submit");

function renderTabs() {
  const categories = ["Все", ...new Set(products.map(p => p.category))];
  categories.forEach((category, index) => {
    const tab = document.createElement("button");
    tab.className = `tab ${index === 0 ? "active" : ""}`;
    tab.textContent = category;
    tab.dataset.category = category;
    tab.onclick = () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderProducts(category, searchInput.value.trim());
    };
    tabsContainer.appendChild(tab);
  });
}

function renderProducts(category = "Все", query = "") {
  const normalizedQuery = query.toLowerCase();
  const filtered = products.filter(product => {
    const matchesCategory = category === "Все" || product.category === category;
    const matchesQuery =
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  productList.innerHTML = "";

  filtered.forEach(product => {
    const card = document.createElement("article");
    card.className = "product";
    card.innerHTML = `
      <div class="product__badge">${product.tag}</div>
      <div class="product__preview" style="background:${product.accent}">
        <div class="product__shape"></div>
        <div class="product__icon">🛋️</div>
      </div>
      <div class="product__body">
        <div>
          <p class="eyebrow">${product.category}</p>
          <h3>${product.name}</h3>
          <p class="muted">${product.description}</p>
        </div>
        <div class="product__footer">
          <div class="price">${product.price}</div>
          <div class="actions">
            <button class="secondary">В корзину</button>
            <button class="ghost">Подробнее</button>
          </div>
        </div>
      </div>
    `;
    productList.appendChild(card);
  });

  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "Ничего не найдено. Попробуйте другую категорию или запрос.";
    productList.appendChild(empty);
  }
}

searchInput.addEventListener("input", event => {
  const activeCategory = document.querySelector(".tab.active")?.dataset.category || "Все";
  renderProducts(activeCategory, event.target.value);
});

quizSubmit.addEventListener("click", () => {
  const need = document.getElementById("need").value;
  const budget = document.getElementById("budget").value;
  const contact = document.getElementById("contact").value.trim();

  const message = contact
    ? `Мы подготовим подборку ${need.toLowerCase()} до ${budget}. Свяжемся по контакту: ${contact}.`
    : `Мы подготовим подборку ${need.toLowerCase()} до ${budget}. Укажите контакт, чтобы отправить варианты.`;

  alert(message);
});

renderTabs();
renderProducts();
