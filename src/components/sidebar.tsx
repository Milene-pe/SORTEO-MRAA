/**
 * Sidebar.ts — Panel lateral con lista acumulativa de ganadores
 */

import { TOTAL } from '../config'
import { esc } from '../utils/helpers'

/** Renderiza el aside#sidebar */
export function renderSidebar(): HTMLElement {
  const aside: HTMLElement = document.createElement('aside')
  aside.id = 'sidebar'

  aside.innerHTML = `
    <div class="sb-head">
      <div class="sb-logo">
        <div class="sb-logo-box">🐥</div>
        <div class="sb-logo-text">
          <div class="mv2">Arequipa</div>
          <div class="av2">avancemos</div>
        </div>
      </div>

      <h3>🏆 GANADORES</h3>

      <div class="sb-count" id="sb-count">0 / ${TOTAL}</div>
    </div>

    <div id="sb-list"></div>

    <div class="sb-footer">
      <div class="marcos">Marcos Sánchez</div>
      <div class="cargo">Movimiento Regional</div>
    </div>
  `

  return aside
}

/**
 * Agrega un ganador a la lista del sidebar con animación.
 * @param nombre - Nombre del ganador
 * @param num - Número global (1..30)
 */
export function addSidebarItem(
  nombre: string,
  num: number
): void {
  const list = document.getElementById(
    'sb-list'
  ) as HTMLDivElement | null

  const countEl = document.getElementById(
    'sb-count'
  ) as HTMLDivElement | null

  if (!list) return

  const item: HTMLDivElement = document.createElement('div')
  item.className = 'sb-item new'

  item.innerHTML = `
    <span class="sb-num">${num}.</span>
    <span class="sb-name">${esc(nombre)}</span>
  `

  list.appendChild(item)

  // Fade-in con doble rAF para asegurar transición CSS
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      item.classList.add('show')
    })
  })

  // Quitar highlight "nuevo" después de un momento
  setTimeout(() => {
    item.classList.remove('new')
  }, 1600)

  // Scroll automático al final
  list.scrollTop = list.scrollHeight

  // Actualizar contador
  if (countEl) {
    countEl.textContent = `${num} / ${TOTAL}`
  }
}

/** Limpia la lista del sidebar (usado en reset) */
export function clearSidebar(): void {
  const list = document.getElementById(
    'sb-list'
  ) as HTMLDivElement | null

  if (list) {
    list.innerHTML = ''
  }

  const countEl = document.getElementById(
    'sb-count'
  ) as HTMLDivElement | null

  if (countEl) {
    countEl.textContent = `0 / ${TOTAL}`
  }
}