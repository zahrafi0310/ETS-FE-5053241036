import type { Peminjaman } from '../types'
type Props = {
  items: Peminjaman[]
  onDetail: (id: number) => void
}


export default function PeminjamanList({ items, onDetail }: Props) {
  return (
    <ul aria-label="Daftar peminjaman">
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.peminjam}</span> - <span>{item.tanggal}</span> -{' '}
          <span>{`Slot ${item.slot_mulai}-${item.slot_selesai}`}</span> -{' '}
          <span>Jumlah: {item.jumlah}</span> - <span>{item.status}</span>{' '}
          <button type="button" onClick={() => onDetail(item.id)}>
            Detail
          </button>
        </li>
      ))}
    </ul>
  )
}

