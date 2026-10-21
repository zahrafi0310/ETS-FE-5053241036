import type { SumberDaya, SumberDayaInput } from '../types'
export const BASE_URL = 'http://localhost:8080'

export async function getSumberDaya(): Promise<SumberDaya[]> {
  const res = await fetch(`${BASE_URL}/sumber-daya`)
  if (!res.ok) throw new Error('Gagal mengambil sumber daya')
  return (await res.json()) as SumberDaya[]
}

export async function createSumberDaya(input: SumberDayaInput): Promise<SumberDaya> {
  const res = await fetch(`${BASE_URL}/sumber-daya`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('Gagal menyimpan sumber daya')
  return (await res.json()) as SumberDaya
}

