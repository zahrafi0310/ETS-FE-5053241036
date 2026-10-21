import type { SumberDaya } from '../types'
type Props = { items: SumberDaya[] }

export default function SumberDayaList({ items }: Props) {
  return (
    <ul aria-label="Daftar sumber daya">
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.nama}</span> - <span>{item.jenis}</span> - <span>Stok: {item.stok}</span>
        </li>
      ))}
    </ul>
  )
}