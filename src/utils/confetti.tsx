/**
 * confetti.ts — Lluvia de confetti para la pantalla final
 */

/** Lanza 100 piezas de confetti en los colores del partido */
export function launchConfetti(): void {
  const colors: string[] = [
    '#FFD100',
    '#9B1C1C',
    '#FF6A00',
    '#FFFFFF',
    '#FFC000'
  ]

  for (let i = 0; i < 100; i++) {
    const el: HTMLDivElement = document.createElement('div')
    el.className = 'cfp'

    const s: number = 6 + Math.random() * 7

    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      top: -10px;
      width: ${s}px;
      height: ${s}px;
      background: ${colors[i % colors.length]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration: ${1.5 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 1.5}s;
    `

    document.body.appendChild(el)

    el.addEventListener('animationend', () => {
      el.remove()
    })
  }
}