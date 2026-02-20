const filters = {
  subject: document.getElementById('subjectFilter'),
  price: document.getElementById('priceFilter'),
  format: document.getElementById('formatFilter')
};

const tutorCards = [...document.querySelectorAll('.tutor-card')];
const emptyState = document.getElementById('emptyState');

function matchesFilter(value, filter) {
  return filter === 'all' || value === filter;
}

function applyFilters() {
  const subject = filters.subject.value;
  const price = filters.price.value;
  const format = filters.format.value;

  let visibleCount = 0;

  tutorCards.forEach((card) => {
    const isVisible =
      matchesFilter(card.dataset.subject, subject) &&
      matchesFilter(card.dataset.price, price) &&
      matchesFilter(card.dataset.format, format);

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

Object.values(filters).forEach((select) => {
  select.addEventListener('change', applyFilters);
});

const requestForm = document.getElementById('requestForm');
const formMessage = document.getElementById('formMessage');

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(requestForm);
  const subject = formData.get('subject');

  formMessage.textContent = `Спасибо! В течение 15 минут мы подберём репетиторов по предмету «${subject}».`;
  requestForm.reset();
});
