import { useState, type FormEvent } from 'react'
import { createPeminjaman } from '../api/peminjamanApi'
import type { Peminjaman, SumberDaya } from '../types'

type Props = {
  sumberDaya: SumberDaya[]
  onCreated: (item: Peminjaman) => void
}

type FormState = {
  sumberDayaId: string
  peminjam: string
  tanggal: string
  slotMulai: string
  slotSelesai: string
  jumlah: string
}

const formKosong: FormState = {
  sumberDayaId: '',
  peminjam: '',
  tanggal: '',
  slotMulai: '',
  slotSelesai: '',
  jumlah: '',
}

function tanggalValid(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false
  const [y, m, d] = s.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
}

export default function PeminjamanForm({ sumberDaya, onCreated }: Props) {
  const [form, setForm] = useState<FormState>(formKosong)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const resource = sumberDaya.find((s) => String(s.id) === form.sumberDayaId)
    const peminjam = form.peminjam.trim()
    const slotMulai = Number(form.slotMulai)
    const slotSelesai = Number(form.slotSelesai)
    const jumlah = Number(form.jumlah)

    if (!resource) return
    if (peminjam === '' || peminjam.length > 50) return
    if (!tanggalValid(form.tanggal)) return
    if (!Number.isInteger(slotMulai) || slotMulai < 1 || slotMulai > 8) return
    if (!Number.isInteger(slotSelesai) || slotSelesai < 1 || slotSelesai > 8) return
    if (slotSelesai < slotMulai) return
    if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > resource.stok) return

    const created = await createPeminjaman({
      sumber_daya_id: resource.id,
      peminjam,
      tanggal: form.tanggal,
      slot_mulai: slotMulai,
      slot_selesai: slotSelesai,
      jumlah,
    })
    onCreated(created)
    setForm(formKosong)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="peminjaman-sumber-daya">Sumber daya</label>
        <select
          id="peminjaman-sumber-daya"
          value={form.sumberDayaId}
          onChange={(e) => setForm({ ...form, sumberDayaId: e.target.value })}
        >
          <option value=""></option>
          {sumberDaya.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nama}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="peminjaman-peminjam">Peminjam</label>
        <input
          id="peminjaman-peminjam"
          type="text"
          value={form.peminjam}
          onChange={(e) => setForm({ ...form, peminjam: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="peminjaman-tanggal">Tanggal</label>
        <input
          id="peminjaman-tanggal"
          type="date"
          value={form.tanggal}
          onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="peminjaman-slot-mulai">Slot mulai</label>
        <input
          id="peminjaman-slot-mulai"
          type="number"
          value={form.slotMulai}
          onChange={(e) => setForm({ ...form, slotMulai: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="peminjaman-slot-selesai">Slot selesai</label>
        <input
          id="peminjaman-slot-selesai"
          type="number"
          value={form.slotSelesai}
          onChange={(e) => setForm({ ...form, slotSelesai: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="peminjaman-jumlah">Jumlah</label>
        <input
          id="peminjaman-jumlah"
          type="number"
          value={form.jumlah}
          onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
        />
      </div>
      <button type="submit">Simpan peminjaman</button>
    </form>
  )
}

