/**
 * Setup.ts — Pantalla de configuración inicial
 * Permite ingresar la lista de participantes.
 */

import { TOTAL } from '../config.js'

/**
 * @param onStart - Callback al hacer clic en "Iniciar"
 * @returns HTMLElement
 */
export function renderSetup(
  onStart: (lines: string[]) => void
): HTMLElement {
  const el: HTMLDivElement = document.createElement('div')
  el.id = 'setup-screen'

  el.innerHTML = `
    <h2>🔥 Ingresa los participantes</h2>

    <textarea
      id="names-input"
      placeholder="Ana García&#10;Juan Pérez&#10;María López&#10;...&#10;(mínimo ${TOTAL} nombres)"
      spellcheck="false"
    ></textarea>

    <div id="error-msg"></div>
    <p id="names-count">0 nombres ingresados</p>

    <button id="start-btn" disabled>🍗 Iniciar Sorteo 🍗</button>

    <p class="setup-hint">
      ${TOTAL} ganadores en grupos de 5 · Intervalo de 3 minutos por tanda
    </p>
  `

  // Reactivo: contador y validación
  const textarea = el.querySelector(
    '#names-input'
  ) as HTMLTextAreaElement

  const countEl = el.querySelector(
    '#names-count'
  ) as HTMLParagraphElement

  const errorEl = el.querySelector(
    '#error-msg'
  ) as HTMLDivElement

  const btn = el.querySelector(
    '#start-btn'
  ) as HTMLButtonElement

  textarea.addEventListener('input', () => {
    const lines: string[] = getLines(textarea.value)

    countEl.textContent = `${lines.length} nombre${
      lines.length !== 1 ? 's' : ''
    } ingresado${lines.length !== 1 ? 's' : ''}`

    btn.disabled = lines.length < TOTAL

    errorEl.textContent =
      lines.length > 0 && lines.length < TOTAL
        ? `⚠ Faltan ${TOTAL - lines.length} nombres (mínimo ${TOTAL}).`
        : ''
  })

  btn.addEventListener('click', () => {
    const lines: string[] = [...new Set(getLines(textarea.value))]

    if (lines.length < TOTAL) {
      errorEl.textContent = `⚠ Solo ${lines.length} únicos. Necesitas ${TOTAL}.`
      return
    }

    onStart(lines)
  })

  return el
}

/** Convierte el texto del textarea en un array de nombres limpios */
function getLines(raw: string): string[] {
  return raw
    .split('\n')
    .map((l: string) => l.trim())
    .filter((l: string) => l.length > 0)
}