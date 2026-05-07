/**
 * Cards.ts — Tarjetas "Pollo Horneado" para los ganadores
 */

import roastChiken from '../assets/roastchicken.svg'
import { esc } from '../utils/helpers.js'
/**
 * Crea y agrega una tarjeta de ganador al área de display.
 * @param nombre - Nombre del ganador
 * @param num - Número global del ganador
 */
export function addPolloCard(
  nombre: string,
  num: number
): void {
  const wrap = document.getElementById(
    'tanda-display'
  ) as HTMLDivElement | null

  if (!wrap) return

  const card: HTMLDivElement = document.createElement('div')
  card.className = 'pollo-card'

  card.dataset.num = String(num)

  card.innerHTML = `
    <div class="pc-num">#${num}</div>
    <img width='150px' src='${polloSVG2(num)}'></div>
    <div class="pc-name">${esc(nombre)}</div>
    <div class="pc-badge">GANADOR</div>
    <div class="pc-flame">🔥</div>
  `

  wrap.appendChild(card)

  // Animar entrada con escala + rebote
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      card.classList.add('reveal')

      card.addEventListener(
        'animationend',
        () => {
          card.classList.remove('reveal')
          card.classList.add('revealed') // float suave continuo
        },
        { once: true }
      )
    })
  })

  // Scroll para ver las nuevas tarjetas
  wrap.scrollTop = wrap.scrollHeight
}

/**
 * Atenúa las tarjetas de la tanda anterior (sin borrarlas).
 * Las convierte a estado "old-tanda".
 */
export function dimPreviousCards(): void {
  document
    .querySelectorAll(
      '.pollo-card.revealed, .pollo-card.old-tanda'
    )
    .forEach((c) => {
      const card = c as HTMLElement

      card.classList.remove('revealed')
      card.classList.add('old-tanda')
    })
}

/** Elimina todas las tarjetas (usado en reset) */
export function clearCards(): void {
  const wrap = document.getElementById(
    'tanda-display'
  ) as HTMLDivElement | null

  if (wrap) {
    wrap.innerHTML = ''
  }
}

/* ── SVG mini del pollo asado ── */
function polloSVG2(num:number):string{
    return roastChiken;
}
function polloSVG(num: number): string {
  // ID único por número para evitar conflictos de gradiente
  return `
  <svg class="pc-pollo" viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="pgr${num}" cx="38%" cy="32%" r="60%">
        <stop offset="0%" stop-color="#E08500"/>
        <stop offset="50%" stop-color="#A84800"/>
        <stop offset="100%" stop-color="#6B2A00"/>
      </radialGradient>
    </defs>

    <!-- cuerpo -->
    <ellipse
      cx="48"
      cy="40"
      rx="32"
      ry="24"
      fill="url(#pgr${num})"
      stroke="#6B2A00"
      stroke-width="1.5"
    />

    <!-- brillo piel -->
    <ellipse
      cx="42"
      cy="32"
      rx="20"
      ry="13"
      fill="#D07800"
      opacity=".5"
    />

    <ellipse
      cx="38"
      cy="28"
      rx="9"
      ry="6"
      fill="#E09000"
      opacity=".38"
    />

    <!-- muslo / presa -->
    <ellipse
      cx="18"
      cy="33"
      rx="14"
      ry="13"
      fill="#9B4200"
      stroke="#6B2A00"
      stroke-width="1.3"
    />

    <ellipse
      cx="16"
      cy="31"
      rx="8"
      ry="7"
      fill="#BE5800"
      opacity=".55"
    />

    <!-- huesos sobresaliendo -->
    <line
      x1="68"
      y1="50"
      x2="80"
      y2="62"
      stroke="#ECC888"
      stroke-width="3"
      stroke-linecap="round"
    />

    <line
      x1="73"
      y1="44"
      x2="86"
      y2="55"
      stroke="#ECC888"
      stroke-width="2.5"
      stroke-linecap="round"
    />

    <!-- varilla del spiedo -->
    <line
      x1="8"
      y1="40"
      x2="82"
      y2="40"
      stroke="#888"
      stroke-width="2.5"
      stroke-linecap="round"
    />

    <!-- calor bajo el pollo -->
    <ellipse
      cx="48"
      cy="58"
      rx="22"
      ry="5"
      fill="rgba(255,120,0,.15)"
    />
  </svg>`
}