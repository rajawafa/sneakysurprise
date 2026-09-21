const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');
const mobileMenuQuery = window.matchMedia('(max-width: 1040px)');

function setHeaderState() {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
}

function setMenuState(isOpen, { restoreFocus = false } = {}) {
  if (!menuButton || !navigation) return;
  menuButton.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  navigation.classList.toggle('is-open', isOpen);

  if (mobileMenuQuery.matches) {
    navigation.toggleAttribute('inert', !isOpen);
    navigation.setAttribute('aria-hidden', String(!isOpen));
  } else {
    navigation.removeAttribute('inert');
    navigation.removeAttribute('aria-hidden');
  }

  if (restoreFocus) menuButton.focus();
}

function closeMenu(options) {
  setMenuState(false, options);
}

setHeaderState();
setMenuState(false);
window.addEventListener('scroll', setHeaderState, { passive: true });
mobileMenuQuery.addEventListener('change', () => closeMenu());

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  setMenuState(!isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu({ restoreFocus: true });
  }
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
