import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIban(iban: string): string {
  return `${iban.slice(0, 4)} ${iban.slice(4, 8)} ${iban.slice(8, 12)} ${iban.slice(12, 14)} ${iban.slice(14)}`
}
