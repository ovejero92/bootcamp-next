import { clsx } from 'clsx';

/**
 * Une clases de Tailwind de forma condicional.
 * @param  {...import('clsx').ClassValue} inputs
 */
export function cn(...inputs) {
  return clsx(inputs);
}
