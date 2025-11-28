const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const project = document.getElementById('project').value.trim();
    const contact = document.getElementById('contact').value.trim();

    const summary = [
      name ? `Имя: ${name}` : null,
      project ? `Проект: ${project}` : null,
      contact ? `Контакт: ${contact}` : null
    ].filter(Boolean).join('\n');

    alert(`Запрос отправлен.\n${summary}`);
    form.reset();
  });
}
