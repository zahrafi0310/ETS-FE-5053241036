import type { Peminjaman } from '../types'
type Props = { detail: Peminjaman | null }

export default function PeminjamanDetail({ detail }: Props) {
  return (
    <section aria-label="Detail peminjaman">
      {detail && (
        <p>
          <span>{detail.peminjam}</span> - <span>{detail.tanggal}</span> -{' '}
          <span>{`Slot ${detail.slot_mulai}-${detail.slot_selesai}`}</span> -{' '}
          <span>Jumlah: {detail.jumlah}</span> - <span>{detail.status}</span>
        </p>
      )}
    </section>
  )
}

