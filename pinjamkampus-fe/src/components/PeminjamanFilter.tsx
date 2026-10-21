import type { FilterPeminjaman, SumberDaya } from '../types'

type Props = {
  sumberDaya: SumberDaya[]
  filter: FilterPeminjaman
  onChange: (filter: FilterPeminjaman) => void
}

export default function PeminjamanFilter({ sumberDaya, filter, onChange }: Props) {
  return (
    <div>
      <div>
        <label htmlFor="filter-sumber-daya">Filter sumber daya</label>
        <select
          id="filter-sumber-daya"
          value={filter.sumberDayaId}
          onChange={(e) => onChange({ ...filter, sumberDayaId: e.target.value })}
        >
          <option value="">Semua</option>
          {sumberDaya.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nama}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-tanggal">Filter tanggal</label>
        <input
          id="filter-tanggal"
          type="date"
          value={filter.tanggal}
          onChange={(e) => onChange({ ...filter, tanggal: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="filter-status">Filter status</label>
        <select
          id="filter-status"
          value={filter.status}
          onChange={(e) => onChange({ ...filter, status: e.target.value })}
        >
          <option value="">Semua</option>
          <option value="aktif">aktif</option>
          <option value="dibatalkan">dibatalkan</option>
        </select>
      </div>
    </div>
  )
}


