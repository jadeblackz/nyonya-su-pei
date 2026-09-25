import './styles.css'

const WEB3FORMS_ACCESS_KEY = '95821aae-f5b8-4889-bfe2-c40ace87b6e2'
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const FORM_ERROR_MESSAGE =
  'Could not send. Please call or WhatsApp +60 16-414 1416, or email nyonyasupei@gmail.com.'

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

// Book page: experience type toggle
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

// Book page: guest count controls
const guestsInput = document.getElementById('guests') as HTMLInputElement | null
const guestsCount = document.getElementById('guests-count')
const guestButtons = document.querySelectorAll<HTMLButtonElement>('[data-guests]')

guestButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!guestsInput || !guestsCount) return
    const current = Number.parseInt(guestsInput.value, 10) || 2
    const change = btn.dataset.guests === 'increase' ? 1 : -1
    const guests = Math.min(12, Math.max(1, current + change))
    guestsInput.value = String(guests)
    guestsCount.textContent = String(guests)
  })
})

async function submitBooking(form: HTMLFormElement, note: HTMLElement, button: HTMLButtonElement) {
  const originalButtonText = button.textContent || 'Send my request'
  const formData = new FormData(form)
  if (!formData.has('botcheck')) formData.delete('botcheck')
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    ...Object.fromEntries(formData.entries()),
  }

  button.disabled = true
  button.textContent = 'Sending…'
  note.hidden = false
  note.textContent = 'Sending…'
  note.focus()

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const result = (await response.json()) as { success?: boolean }
    if (!response.ok || result.success === false) throw new Error('Web3Forms submission failed')
    note.textContent = 'Thank you. We will confirm by phone or WhatsApp.'
  } catch {
    note.textContent = FORM_ERROR_MESSAGE
  } finally {
    button.disabled = false
    button.textContent = originalButtonText
  }
}

const bookForm = document.getElementById('book-form') as HTMLFormElement | null
bookForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!bookForm.checkValidity()) {
    bookForm.reportValidity()
    return
  }
  const note = document.getElementById('book-form-note')
  const button = bookForm.querySelector<HTMLButtonElement>('button[type="submit"]')
  if (note && button) void submitBooking(bookForm, note, button)
})

// The waiting list remains a static form until its separate Web3Forms key is provided.
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
