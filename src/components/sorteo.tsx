/**
 * Sorteo.ts — Lógica del flujo completo del sorteo:
 * countdown → revelar tanda → repetir → pantalla final
 */

import {
  TOTAL,
  POR_TANDA,
  TANDAS,
  INTERVALO,
  REVEAL_MS
} from '../config'

import { wait } from '../utils/helpers'

import {
  playReveal,
  playProcessing,
  playFinale
} from '../utils/audio'

import {
  addPolloCard,
  dimPreviousCards
} from './cards'

import { addSidebarItem } from './sidebar'

import { launchConfetti } from '../utils/confetti'

import {
  setCdInterval,
  clearCdInterval
} from '../state.js'

/* ──────────────────────────────────────────────
   INICIAR EL FLUJO COMPLETO
────────────────────────────────────────────── */

/**
 * Arranca el sorteo con los ganadores ya divididos en grupos.
 * @param ganadores - Arreglo de TANDAS grupos de POR_TANDA nombres
 */
export async function iniciarFlujo(
  ganadores: string[][]
): Promise<void> {
  for (let t = 0; t < TANDAS; t++) {
    // Mensaje de espera antes de cada tanda
    setLabel(
      t === 0
        ? '🔥 Preparando el Gran Sorteo…'
        : '🔥 Preparando siguiente grupo…'
    )

    setMsg(false, '')

    await esperarCountdown(
      INTERVALO,
      t === 0
        ? '🍗 El sorteo inicia en'
        : '⏳ Próximo grupo en'
    )

    await mostrarTanda(ganadores[t], t)
  }

  await wait(2500)

  mostrarFinale()
}

/* ──────────────────────────────────────────────
   MOSTRAR UNA TANDA
────────────────────────────────────────────── */

async function mostrarTanda(
  grupo: string[],
  tandaIdx: number
): Promise<void> {
  const inicio: number = tandaIdx * POR_TANDA + 1

  const fin: number = inicio + POR_TANDA - 1

  // Fase 1: atenuar tarjetas anteriores + procesando
  setLabel('GANADORES')

  setMsg(true, '🔥 Procesando…')

  playProcessing()

  // Las tarjetas previas se atenúan pero NO se borran
  dimPreviousCards()

  await wait(2500)

  // Fase 2: revelar nuevas tarjetas una por una
  setMsg(false, `🎉 Ganadores ${inicio} al ${fin}`)

  playReveal()

  for (let i = 0; i < grupo.length; i++) {
    const num: number = inicio + i
    const name: string = grupo[i]

    addPolloCard(name, num)
    addSidebarItem(name, num)

    updateProgressBar(num)

    await wait(REVEAL_MS)
  }
}

/* ──────────────────────────────────────────────
   COUNTDOWN VISUAL
────────────────────────────────────────────── */

function esperarCountdown(
  ms: number,
  prefijo: string
): Promise<void> {
  return new Promise((resolve) => {
    let rem: number = Math.floor(ms / 1000)

    const wrap = document.getElementById(
      'countdown-wrap'
    ) as HTMLDivElement | null

    const tick = (): void => {
      const m: number = Math.floor(rem / 60)
      const s: number = rem % 60

      if (wrap) {
        wrap.innerHTML = `
          ${prefijo}
          <span id="countdown-num">
            ${m}:${String(s).padStart(2, '0')}
          </span>
        `
      }

      if (rem <= 0) {
        clearCdInterval()

        if (wrap) {
          wrap.innerHTML = ''
        }

        resolve()
      }

      rem--
    }

    tick()

    setCdInterval(setInterval(tick, 1000))
  })
}

/* ──────────────────────────────────────────────
   PANTALLA FINAL
────────────────────────────────────────────── */

function mostrarFinale(): void {
  const el = document.getElementById(
    'finish-screen'
  ) as HTMLDivElement | null

  if (el) {
    el.classList.remove('hidden')
    el.style.display = 'flex'
  }

  playFinale()

  launchConfetti()
}

/* ──────────────────────────────────────────────
   HELPERS DE UI
────────────────────────────────────────────── */

function setLabel(txt: string): void {
  const el = document.getElementById(
    'tanda-label'
  ) as HTMLElement | null

  if (el) {
    el.textContent = txt
  }
}

function setMsg(
  dots: boolean,
  txt: string
): void {
  const el = document.getElementById(
    'proc-msg'
  ) as HTMLDivElement | null

  if (!el) return

  if (dots) {
    el.innerHTML = `
      <span>${txt}</span>

      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `
  } else {
    el.textContent = txt
  }
}

function updateProgressBar(n: number): void {
  const bar = document.getElementById(
    'prog-bar'
  ) as HTMLDivElement | null

  if (bar) {
    bar.style.width = `${(n / TOTAL) * 100}%`
  }
}