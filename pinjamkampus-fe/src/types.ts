
export type Jenis = 'ruang' | 'alat'

export type SumberDaya = {
  id: number
  nama: string
  jenis: Jenis
  stok: number
}

export type SumberDayaInput = {
  nama: string
  jenis: Jenis
  stok: number
}

