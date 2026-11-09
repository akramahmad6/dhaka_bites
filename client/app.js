// Change this to the deployed Render URL after the backend is deployed.
const API_URL = 'http://localhost:5000';

const menuButton = document.querySelector('#menu-btn');
const navLinks = document.querySelector('#nav-links');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const submitButton = contactForm.querySelector('button[type="submit"]');

menuButton.addEventListener('click', () => {
  // Keep the visual menu state and screen-reader state in sync.
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

function showStatus(text, type) {
  formStatus.textContent = text;
  formStatus.className = `status ${type}`;
}

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const contact = {
    name: formData.get('name').trim(),
    email: formData.get('email').trim(),
    message: formData.get('message').trim(),
  };

  // Validate before making a network request so invalid submissions are immediate.
  if (!contact.name || !contact.email.includes('@') || contact.message.length < 5) {
    showStatus('Shob field thik vabe puron koro.', 'err');
    return;
  }

  showStatus('Pathano hocche...', '');
  submitButton.disabled = true;

  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      showStatus(result.message || 'Message pathano jayni. Pore abar chesta koro.', 'err');
      return;
    }

    showStatus('Message pathano hoyeche. Dhonnobad!', 'ok');
    contactForm.reset();
  } catch {
    // Network failures have no server message, so use a helpful generic message.
    showStatus('Message pathano jayni. Pore abar chesta koro.', 'err');
  } finally {
    // Re-enable the button even when the network or server reports an error.
    submitButton.disabled = false;
  }
});
