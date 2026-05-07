/**
 * config.ts — Configuración central del sorteo
 * Modifica aquí para cambiar el comportamiento.
 */

/** Total de ganadores a seleccionar */
export const TOTAL: number = 30

/** Ganadores por tanda / grupo */
export const POR_TANDA: number = 5

/** Número de tandas (calculado automáticamente) */
export const TANDAS: number = TOTAL / POR_TANDA // 6

/** Intervalo entre tandas en milisegundos (3 minutos) */
export const INTERVALO: number = 30 * 1000

/** Delay entre la aparición de cada tarjeta dentro de una tanda (ms) */
export const REVEAL_MS: number = 380

/** URL del GIF del horno rotisserie */
export const HORNO_GIF_URL: string =
  'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'