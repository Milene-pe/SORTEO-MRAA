/**
 * App.ts — Componente raíz: ensambla el HTML y orquesta la app
 */

import { shuffle } from './utils/helpers'
import { initAudio } from './utils/audio'

import {
  TOTAL,
  POR_TANDA,
  TANDAS
} from './config'

import {
  setGanadores,
  getGanadores,
  resetState
} from './state'

import { renderHeader } from './components/headers'
import { renderSetup } from './components/setup'
import { renderHornoScene } from './components/horno'
import { renderSidebar } from './components/sidebar'
import { iniciarFlujo } from './components/sorteo'
import { clearCards } from './components/cards'
import { clearSidebar } from './components/sidebar'

/* ──────────────────────────────────────────────
   RENDER PRINCIPAL
────────────────────────────────────────────── */

/**
 * Inyecta todo el HTML de la app en el elemento raíz.
 * @param root - El div#app
 */
export  function renderApp(root: HTMLElement): void {
  // 1. Header
  root.appendChild(renderHeader())

  // 2. Pantalla de setup (visible al inicio)
  root.appendChild(renderSetup(onStartSorteo))

  // 3. Área principal (oculta hasta iniciar)
  root.appendChild(buildMainArea())

  // 4. Sidebar (oculto hasta iniciar)
  root.appendChild(renderSidebar())

  // Botón de reinicio en la pantalla final
  const restartBtn = document.getElementById(
    'restart-btn'
  ) as HTMLButtonElement | null

  if (restartBtn) {
    restartBtn.addEventListener('click', resetSorteo)
  }
}

/* ──────────────────────────────────────────────
   CONSTRUIR ÁREA PRINCIPAL
────────────────────────────────────────────── */

function buildMainArea(): HTMLElement {
  const main: HTMLElement = document.createElement('main')

  main.id = 'main-area'
  main.classList.add('hidden')

  // Escena del horno
  main.appendChild(renderHornoScene())

  // Zona de status
  main.innerHTML += `
    <div id="status-area">
      <div id="tanda-label">Calentando el horno…</div>
      <div id="proc-msg"></div>
      <div id="prog-wrap">
        <div id="prog-bar"></div>
      </div>
      <div id="countdown-wrap"></div>
    </div>

    <div id="tanda-display"></div>
  `

  return main
}

/* ──────────────────────────────────────────────
   INICIO DEL SORTEO
────────────────────────────────────────────── */

/**
 * Se ejecuta cuando el usuario confirma la lista en el Setup.
 * @param lines - Nombres únicos sin limpiar
 */
function onStartSorteo(lines: string[]): void {
  // Inicializar audio (requiere gesto del usuario)
  initAudio()

  // Mezclar y seleccionar exactamente TOTAL nombres
  const shuffled: string[] = shuffle([...lines])

  const selected: string[] = shuffled.slice(0, TOTAL)

  // Dividir en grupos de POR_TANDA
  const grupos: string[][] = []

  for (let i = 0; i < TANDAS; i++) {
    grupos.push(
      selected.slice(
        i * POR_TANDA,
        (i + 1) * POR_TANDA
      )
    )
  }

  setGanadores(grupos)

  // Mostrar pantalla de sorteo, ocultar setup
  const setupScreen = document.getElementById(
    'setup-screen'
  ) as HTMLElement | null

  const mainArea = document.getElementById(
    'main-area'
  ) as HTMLElement | null

  const sidebar = document.getElementById(
    'sidebar'
  ) as HTMLElement | null

  setupScreen?.classList.add('hidden')
  mainArea?.classList.remove('hidden')
  sidebar?.classList.remove('hidden')

  // Arrancar el flujo automático
  iniciarFlujo(getGanadores())
}

/* ──────────────────────────────────────────────
   RESET
────────────────────────────────────────────── */

function resetSorteo(): void {
  resetState()

  clearCards()
  clearSidebar()

  // Ocultar pantalla final y sidebar, mostrar setup
  const finish = document.getElementById(
    'finish-screen'
  ) as HTMLElement | null

  if (finish) {
    finish.style.display = 'none'
    finish.classList.add('hidden')
  }

  const mainArea = document.getElementById(
    'main-area'
  ) as HTMLElement | null

  const sidebar = document.getElementById(
    'sidebar'
  ) as HTMLElement | null

  const setupScreen = document.getElementById(
    'setup-screen'
  ) as HTMLElement | null

  mainArea?.classList.add('hidden')
  sidebar?.classList.add('hidden')
  setupScreen?.classList.remove('hidden')

  // Resetear controles de status
  const ids: Record<
    string,
    (el: HTMLElement) => void
  > = {
    'prog-bar': (el) => {
      ;(el as HTMLDivElement).style.width = '0%'
    },

    'tanda-label': (el) => {
      el.textContent = 'Calentando el horno…'
    },

    'proc-msg': (el) => {
      el.textContent = ''
    },

    'countdown-wrap': (el) => {
      el.textContent = ''
    },

    'names-input': (el) => {
      ;(el as HTMLTextAreaElement).value = ''
    },

    'names-count': (el) => {
      el.textContent = '0 nombres ingresados'
    },

    'error-msg': (el) => {
      el.textContent = ''
    }
  }

  Object.entries(ids).forEach(([id, fn]) => {
    const el = document.getElementById(id)

    if (el) {
      fn(el)
    }
  })

  // Deshabilitar botón de inicio
  const btn = document.getElementById(
    'start-btn'
  ) as HTMLButtonElement | null

  if (btn) {
    btn.disabled = true
  }
}