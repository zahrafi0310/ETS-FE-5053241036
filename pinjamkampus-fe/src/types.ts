
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

export type Peminjaman = {
  id: number
  sumber_daya_id: number
  peminjam: string
  tanggal: string
  slot_mulai: number
  slot_selesai: number
  jumlah: number
  status: string
}

export type PeminjamanInput = {
  sumber_daya_id: number
  peminjam: string
  tanggal: string
  slot_mulai: number
  slot_selesai: number
  jumlah: number
}

export type FilterPeminjaman = {
  sumberDayaId: string
  tanggal: string
  status: string
}


