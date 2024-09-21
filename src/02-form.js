const form = document.querySelector('.feedback-form');

const localStorageKey = 'feedback-form-state';

let formData = {};

const saveToLocalStorage = () => {
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
};

form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim();
  saveToLocalStorage();
});

const loadLocalStorage = () => {
  const savedData = localStorage.getItem(localStorageKey);
  if (savedData) {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
  } else {
    form.elements.email.value = '';
    form.elements.message.value = '';
  }
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email === '' || message === '') {
    alert('Please fill in both fields.');
    return;
  }
  console.log({ email, message });

  localStorage.removeItem(localStorageKey);
  form.reset();
  formData = {};
});

loadLocalStorage();
