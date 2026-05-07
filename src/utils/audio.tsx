/**
 * audio.ts — Efectos de sonido con Web Audio API
 */

let audioCtx: AudioContext | null = null

/** Inicializa el AudioContext (debe llamarse desde un gesto del usuario) */
export function initAudio(): void {
  if (audioCtx) return

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext

    if (!AudioContextClass) {
      console.warn('Web Audio API no disponible')
      return
    }

    audioCtx = new AudioContextClass()
  } catch (e) {
    console.warn('Web Audio API no disponible:', e)
  }
}

/**
 * Toca un tono simple.
 * @param freq  - Frecuencia en Hz
 * @param type  - Tipo de onda
 * @param vol   - Volumen máximo (0-1)
 * @param dur   - Duración en segundos
 * @param delay - Retraso de inicio en segundos
 */
function tone(
  freq: number,
  type: OscillatorType,
  vol: number,
  dur: number,
  delay: number = 0
): void {
  if (!audioCtx) return

  const o: OscillatorNode = audioCtx.createOscillator()
  const g: GainNode = audioCtx.createGain()

  o.connect(g)
  g.connect(audioCtx.destination)

  o.type = type
  o.frequency.value = freq

  const t: number = audioCtx.currentTime + delay

  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(vol, t + 0.05)
  g.gain.exponentialRampToValueAtTime(0.001, t + dur)

  o.start(t)
  o.stop(t + dur + 0.05)
}

/** Acorde de revelación Do-Mi-Sol */
export function playReveal(): void {
  ;[523.25, 659.25, 783.99].forEach((f, i) =>
    tone(f, 'triangle', 0.13, 0.5, i * 0.1)
  )
}

/** Tono grave de "procesando" */
export function playProcessing(): void {
  tone(110, 'sawtooth', 0.05, 0.5)
}

/** Fanfarria final */
export function playFinale(): void {
  ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
    tone(f, 'sine', 0.17, 0.9, i * 0.13)
  )
}