/**
 * state.ts — Estado global del sorteo (módulo singleton)
 * Mantiene los datos del sorteo en un único lugar.
 */

/** Grupos de ganadores (TANDAS × POR_TANDA) */
let ganadores: string[][] = []

/** Referencia al setInterval del countdown */
let cdInterval: ReturnType<typeof setInterval> | null = null

/* ── Getters / setters ── */

export const getGanadores = (): string[][] => ganadores

export const setGanadores = (g: string[][]): void => {
  ganadores = g
}

export const getCdInterval = (): ReturnType<typeof setInterval> | null =>
  cdInterval

export const setCdInterval = (
  id: ReturnType<typeof setInterval>
): void => {
  cdInterval = id
}

export function clearCdInterval(): void {
  if (cdInterval !== null) {
    clearInterval(cdInterval)
    cdInterval = null
  }
}

/** Reinicia el estado completo */
export function resetState(): void {
  clearCdInterval()
  ganadores = []
}