/**
 * Harmonia Studio — Form Handling & Filter Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. URL Query Parameter auto-selection for Contact Form
  const params = new URLSearchParams(window.location.search);
  const selectedModality = params.get('modalidade');
  const modalitySelect = document.getElementById('modalidade');

  if (selectedModality && modalitySelect) {
    const formattedVal = decodeURIComponent(selectedModality).toLowerCase().trim();
    for (let i = 0; i < modalitySelect.options.length; i++) {
      const optionVal = modalitySelect.options[i].value.toLowerCase();
      if (optionVal && (optionVal.includes(formattedVal) || formattedVal.includes(optionVal))) {
        modalitySelect.selectedIndex = i;
        break;
      }
    }
  }

  // 2. Phone / WhatsApp Input Masking
  const phoneInput = document.getElementById('telefone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 10) {
        // (XX) XXXXX-XXXX
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (value.length > 6) {
        // (XX) XXXX-XXXX
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else if (value.length > 0) {
        value = value.replace(/^(\d*)$/, '($1');
      }
      e.target.value = value;
    });
  }

  // 3. Contact Form Validation & Submission
  const contactForm = document.getElementById('contact-form');
  const alertSuccess = document.getElementById('alert-success');
  const alertError = document.getElementById('alert-error');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (alertSuccess) alertSuccess.style.display = 'none';
      if (alertError) alertError.style.display = 'none';

      const nome = document.getElementById('nome')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const telefone = document.getElementById('telefone')?.value.trim();
      const mensagem = document.getElementById('mensagem')?.value.trim();

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!nome || !email || !emailRegex.test(email) || !mensagem) {
        if (alertError) {
          alertError.textContent = 'Não foi possível enviar sua mensagem. Verifique os campos obrigatórios e tente novamente.';
          alertError.style.display = 'block';
          alertError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Simulation of successful dispatch
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        if (alertSuccess) {
          alertSuccess.textContent = 'Sua mensagem foi enviada com sucesso! Agradecemos pelo contato.';
          alertSuccess.style.display = 'block';
          alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        contactForm.reset();
      }, 700);
    });
  }

  // 4. Modality Filter Chips (Página Aulas)
  const filterChips = document.querySelectorAll('.category-filter-nav .pill-chip');
  const courseCards = document.querySelectorAll('.courses-grid .course-card');
  const categorySections = document.querySelectorAll('.course-category-section');

  if (filterChips.length > 0 && courseCards.length > 0) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filterVal = chip.getAttribute('data-filter');

        if (filterVal === 'all') {
          categorySections.forEach(sec => sec.style.display = 'block');
          courseCards.forEach(card => card.style.display = 'flex');
        } else {
          categorySections.forEach(sec => {
            const secCategory = sec.getAttribute('data-category');
            if (secCategory === filterVal) {
              sec.style.display = 'block';
            } else {
              sec.style.display = 'none';
            }
          });
        }
      });
    });
  }
});
