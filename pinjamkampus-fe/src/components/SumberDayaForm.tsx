import { useState, type FormEvent } from 'react'
import { createSumberDaya } from '../api/sumberDayaApi'
import type { Jenis, SumberDaya } from '../types'

type Props = { onCreated: (item: SumberDaya) => void }

type FormState = { nama: string; jenis: Jenis; stok: string }

const formKosong: FormState = { nama: '', jenis: 'ruang', stok: '' }

export default function SumberDayaForm({ onCreated }: Props) {
  const [form, setForm] = useState<FormState>(formKosong)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const nama = form.nama.trim()
    const stok = Number(form.stok)

    if (nama === '' || nama.length > 50) return
    if (!Number.isInteger(stok) || stok < 1) return

    const created = await createSumberDaya({ nama, jenis: form.jenis, stok })
    onCreated(created)
    setForm(formKosong)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nama-sumber-daya">Nama sumber daya</label>
        <input
          id="nama-sumber-daya"
          type="text"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="jenis-sumber-daya">Jenis</label>
        <select
          id="jenis-sumber-daya"
          value={form.jenis}
          onChange={(e) => setForm({ ...form, jenis: e.target.value as Jenis })}
        >
          <option value="ruang">ruang</option>
          <option value="alat">alat</option>
        </select>
      </div>
      <div>
        <label htmlFor="stok-sumber-daya">Stok</label>
        <input
          id="stok-sumber-daya"
          type="number"
          value={form.stok}
          onChange={(e) => setForm({ ...form, stok: e.target.value })}
        />
      </div>
      <button type="submit">Simpan sumber daya</button>
    </form>
  )
}