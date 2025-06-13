'use strict';

// element toggle function
const elementToggleFunc = function (elem) { if (elem) elem.classList.toggle('active'); };

// sidebar variables
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
// sidebar toggle
if (sidebarBtn && sidebar) sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));

// testimonials (guarded in case HTML missing)
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');
const testimonialsModalFunc = function () {
  modalContainer?.classList.toggle('active');
  overlay?.classList.toggle('active');
};
if (testimonialsItem.length) {
  testimonialsItem.forEach(item => item.addEventListener('click', function () {
    modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
    modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
    modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
    modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;
    testimonialsModalFunc();
  }));
  modalCloseBtn?.addEventListener('click', testimonialsModalFunc);
  overlay?.addEventListener('click', testimonialsModalFunc);
}

// custom select and filter (remove if no HTML)
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');  // fixed typo
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

if (select) {
  select.addEventListener('click', () => elementToggleFunc(select));
  selectItems.forEach(item => item.addEventListener('click', function () {
    const val = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(val);
  }));
}

const filterFunc = selectedValue => {
  filterItems.forEach(elem => {
    const cat = elem.dataset.category;
    if (selectedValue === 'all' || selectedValue === cat) elem.classList.add('active');
    else elem.classList.remove('active');
  });
};
if (filterBtn.length) {
  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => btn.addEventListener('click', function () {
    const val = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(val);
    lastClickedBtn.classList.remove('active');
    this.classList.add('active');
    lastClickedBtn = this;
  }));
}

// contact form
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
formInputs.forEach(input => input.addEventListener('input', () => {
  if (form?.checkValidity()) formBtn?.removeAttribute('disabled');
  else formBtn?.setAttribute('disabled', '');
}));

// page navigation
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
navigationLinks.forEach(link => link.addEventListener('click', function () {
  const target = this.innerText.toLowerCase();
  pages.forEach(page => page.dataset.page === target ? page.classList.add('active') : page.classList.remove('active'));
  navigationLinks.forEach(nav => nav === this ? nav.classList.add('active') : nav.classList.remove('active'));
  window.scrollTo(0, 0);
}));
