import './styles.css'

// Mobile menu (native dialog)
const menu = document.getElementById('mobile-menu') as HTMLDialogElement | null
const openBtn = document.getElementById('menu-open')
const closeBtn = document.getElementById('menu-close')

openBtn?.addEventListener('click', () => {
  menu?.showModal()
  openBtn.setAttribute('aria-expanded', 'true')
})
closeBtn?.addEventListener('click', () => {
  menu?.close()
  openBtn?.setAttribute('aria-expanded', 'false')
})
menu?.addEventListener('close', () => {
  openBtn?.setAttribute('aria-expanded', 'false')
})
menu?.addEventListener('click', (e) => {
  if (e.target === menu) menu.close()
})

// Book page: experience type toggle + static form note
const typeButtons = document.querySelectorAll<HTMLButtonElement>('[data-experience]')
const typeInput = document.getElementById('experience-type') as HTMLInputElement | null

typeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.experience || ''
    typeButtons.forEach((b) => {
      const on = b === btn
      b.setAttribute('aria-pressed', on ? 'true' : 'false')
      b.className = on
        ? 'rounded-lg px-4 py-4 text-left transition-colors duration-150 bg-teal-soft ring-2 ring-teal'
        : 'rounded-lg px-4 py-4 text-left transition-colors duration-150 bg-paper shadow-card hover:bg-paper-deep'
    })
    if (typeInput) typeInput.value = value
  })
})

const bookForm = document.getElementById('book-form') as HTMLFormElement | null
bookForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  const note = document.getElementById('book-form-note')
  if (note) {
    note.hidden = false
    note.textContent =
      'This form is static for now. Please call or WhatsApp +60 16-414 1416, or email nyonyasupei@gmail.com.'
    note.focus()
  }
})

const waitForm = document.getElementById('waitlist-form') as HTMLFormElement | null
waitForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  const note = document.getElementById('waitlist-note')
  if (note) {
    note.hidden = false
    note.textContent =
      'Waiting list is not connected yet. Email nyonyasupei@gmail.com or WhatsApp +60 16-414 1416 to leave your name.'
    note.focus()
  }
})
