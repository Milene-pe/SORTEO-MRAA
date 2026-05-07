/**
 * particles.ts
 * Genera partículas flotantes de brasa en el fondo.
 * @param container - El div#particles
 */
export function initParticles(container: HTMLElement | null): void {
  if (!container) return

  const colors: string[] = ['#FFD200', '#FF9900', '#FF5500', '#FFBB00']

  for (let i = 0; i < 30; i++) {
    const p: HTMLDivElement = document.createElement('div')
    p.className = 'spark'

    const size: number = 3 + Math.random() * 5
    const dur: number = 5 + Math.random() * 9
    const del: number = Math.random() * 12
    const sx: string = `${(Math.random() - 0.5) * 80}px`
    const sx2: string = `${(Math.random() - 0.5) * 130}px`

    p.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: ${-size}px;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[i % colors.length]};
      box-shadow: 0 0 ${size * 2}px ${colors[i % colors.length]};
      animation-duration: ${dur}s;
      animation-delay: ${del}s;
      --sx: ${sx};
      --sx2: ${sx2};
    `

    container.appendChild(p)
  }
}