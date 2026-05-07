/**
 * Header.ts — Barra superior con logo y título
 */

export function renderHeader(): HTMLElement {
  const header: HTMLElement = document.createElement('header')
  header.id = 'header'

  header.innerHTML = `
    <!-- Logo izquierdo: Arequipa Avancemos -->
    <div class="hdr-logo">
      <div class="hdr-logo-box">🐥</div>
      <div class="hdr-logo-text">
        <div class="mv">Movimiento Regional</div>
        <div class="ar">AREQUIPA</div>
        <div class="av">avancemos</div>
      </div>
    </div>

    <!-- Título central -->
    <div class="hdr-center">
      <h1>🍗 Gran Sorteo Pollo a la Brasa 🍗</h1>
      <div class="sub">30 Afortunados Ganadores — En Vivo</div>
    </div>

    <!-- Crédito derecho -->
    <div class="hdr-right">
      <div class="por">Presenta</div>
      <div class="nombre">MARCOS SÁNCHEZ</div>
    </div>
  `

  return header
}