/**
 * Horno.ts — Escena central: imágenes laterales + horno GIF animado
 */

import { HORNO_GIF_URL } from '../config.js'
import oven from '../assets/oven.svg'
import roastChikenRotate from '../assets/roastchiken-rotate.svg'
/** Devuelve el div#horno-scene completo */
export function renderHornoScene(): HTMLElement {
  const scene: HTMLDivElement = document.createElement('div')
  scene.id = 'horno-scene'

  scene.innerHTML = `
    <!-- Imagen lateral izquierda (pollero / cocinero) -->
    ${lateralImgHTML('left', '👨‍🍳', 'Tu imagen<br/>aquí<br/>(clic)')}

    <!-- Horno central -->
    <div class="horno-svg-wrap">
      <!-- Humos CSS flotando sobre el GIF -->
      <div class="humo-layer">
        <div class="humo-puff hp1"></div>
        <div class="humo-puff hp2"></div>
        <div class="humo-puff hp3"></div>
      </div>

      <!-- Contenedor GIF con efectos de calor -->
      <div class="horno-gif-container">
        <img
          class="horno-gif"
          width="300px"
          src="${oven}"
          alt="Horno pollo a la brasa girando"
          id="horno-gif-img"
        />
        <img
          class="chicken-rotate"
          width="300px"
          src="${roastChikenRotate}"
          alt="Pollo a la brasa girando"
          id="horno-gif-img"
        />
        <div class="horno-fire-glow"></div>
        <div class="horno-floor-glow"></div>
      </div>
    </div>

    <!-- Imagen lateral derecha (pollo decorativo) -->
    ${lateralImgHTML('right', '🍗', 'Tu imagen<br/>aquí<br/>(clic)')}
  `

  // Fallback si el GIF no carga
  const gifImg = scene.querySelector(
    '#horno-gif-img'
  ) as HTMLImageElement | null

  gifImg?.addEventListener('error', () => handleGifError(scene))

  // Listeners para subir imágenes laterales
  scene
    .querySelectorAll('input[type=file]')
    .forEach((input) => {
      input.addEventListener('change', () =>
        handleImageUpload(input as HTMLInputElement, scene)
      )
    })

  return scene
}

/* ── Helpers ── */

function lateralImgHTML(
  side: string,
  ico: string,
  label: string
): string {
  return `
    <div class="lateral-img" id="img-${side}-wrap" title="Clic para subir imagen PNG">
      <input type="file" accept="image/png,image/jpeg,image/webp" data-side="${side}" />
      <div class="img-placeholder" id="img-${side}-ph">
        <div class="ico">${ico}</div>
        <div class="lbl">${label}</div>
      </div>
      <div class="upload-hint">Clic · Subir PNG</div>
    </div>
  `
}

function handleImageUpload(
  input: HTMLInputElement,
  scene: HTMLElement
): void {
  const side: string | undefined = input.dataset.side
  const file: File | undefined = input.files?.[0]

  if (!file || !side) return

  const reader: FileReader = new FileReader()

  reader.onload = (e: ProgressEvent<FileReader>) => {
    const wrap = scene.querySelector(
      `#img-${side}-wrap`
    ) as HTMLElement | null

    const ph = scene.querySelector(
      `#img-${side}-ph`
    ) as HTMLElement | null

    if (!wrap || !ph) return

    const hint = wrap.querySelector(
      '.upload-hint'
    ) as HTMLElement | null

    // Ocultar placeholder y hint
    ph.style.display = 'none'

    if (hint) {
      hint.style.display = 'none'
    }

    // Insertar o reemplazar la imagen real
    let img = wrap.querySelector(
      'img.real'
    ) as HTMLImageElement | null

    if (!img) {
      img = document.createElement('img')
      img.className = 'real'

      const fileInput = wrap.querySelector('input')

      if (fileInput) {
        wrap.insertBefore(img, fileInput)
      } else {
        wrap.appendChild(img)
      }
    }

    if (typeof e.target?.result === 'string') {
      img.src = e.target.result
    }
  }

  reader.readAsDataURL(file)
}

function handleGifError(scene: HTMLElement): void {
  // Si el GIF no carga, ocultar el contenedor y mostrar emoji de respaldo
  const container = scene.querySelector(
    '.horno-gif-container'
  ) as HTMLElement | null

  if (container) {
    container.innerHTML = `
      <div style="
        height: 220px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 6rem;
        animation: logoNod 2s ease-in-out infinite;
        filter: drop-shadow(0 0 20px rgba(255,150,0,0.6));
      ">🔥</div>
    `
  }
}