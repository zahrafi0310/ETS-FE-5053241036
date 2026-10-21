import type { FilterPeminjaman, Peminjaman, PeminjamanInput } from '../types'
import { BASE_URL } from './sumberDayaApi'

export async function createPeminjaman(input: PeminjamanInput): Promise<Peminjaman> {
  const res = await fetch(`${BASE_URL}/peminjaman`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    throw new Error('Gagal menyimpan peminjaman')
  }
  return (await res.json()) as Peminjaman
}

export async function getPeminjaman(filter: FilterPeminjaman): Promise<Peminjaman[]> {
  const params = new URLSearchParams()
  if (filter.sumberDayaId !== '') params.set('sumber_daya_id', filter.sumberDayaId)
  if (filter.tanggal !== '') params.set('tanggal', filter.tanggal)
  if (filter.status !== '') params.set('status', filter.status)
  const query = params.toString()

  const res = await fetch(`${BASE_URL}/peminjaman${query ? `?${query}` : ''}`)
  if (!res.ok) throw new Error('Gagal mengambil peminjaman')
  return (await res.json()) as Peminjaman[]
}

export async function getPeminjamanById(id: number): Promise<Peminjaman> {
  const res = await fetch(`${BASE_URL}/peminjaman/${id}`)
  if (!res.ok) throw new Error('Gagal mengambil detail peminjaman')
  return (await res.json()) as Peminjaman
}
