import { useEffect, useState } from 'react'
import { getSumberDaya } from './api/sumberDayaApi'
import SumberDayaForm from './components/SumberDayaForm'
import SumberDayaList from './components/SumberDayaList'
import PeminjamanForm from './components/PeminjamanForm'
import PeminjamanList from './components/PeminjamanList'
import { getPeminjaman, getPeminjamanById } from './api/peminjamanApi'
import PeminjamanFilter from './components/PeminjamanFilter'
import PeminjamanDetail from './components/PeminjamanDetail'
import type { SumberDaya, Peminjaman, FilterPeminjaman } from './types'


const filterAwal: FilterPeminjaman = { sumberDayaId: '', tanggal: '', status: '' }

export default function App() {
  const [sumberDaya, setSumberDaya] = useState<SumberDaya[]>([])
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([])
  const [detail, setDetail] = useState<Peminjaman | null>(null)
  const [filter, setFilter] = useState<FilterPeminjaman>(filterAwal)
  const [refreshKey, setRefreshKey] = useState(0)
  const [loadingSumberDaya, setLoadingSumberDaya] = useState(true)
  const [loadingPeminjaman, setLoadingPeminjaman] = useState(true)

  useEffect(() => {
    getSumberDaya()
      .then(setSumberDaya)
      .finally(() => setLoadingSumberDaya(false))
  }, [])

  useEffect(() => {
    let ignore = false
    getPeminjaman(filter)
      .then((data) => {
        if (!ignore) setPeminjaman(data)
      })
      .finally(() => setLoadingPeminjaman(false))
    return () => {
      ignore = true
    }
  }, [filter, refreshKey])

  function handleSumberDayaCreated(item: SumberDaya) {
    setSumberDaya((prev) => [...prev, item])
  }

  function handlePeminjamanCreated() {
    setRefreshKey((k) => k + 1)
  }

  function handleDetail(id: number) {
    getPeminjamanById(id).then(setDetail)
  }

  const loading = loadingSumberDaya || loadingPeminjaman

  return (
    <div>
      <SumberDayaForm onCreated={handleSumberDayaCreated} />
      {loading && <p>Memuat...</p>}
      <SumberDayaList items={sumberDaya} />
      <PeminjamanForm sumberDaya={sumberDaya} onCreated={handlePeminjamanCreated} />
      <PeminjamanFilter sumberDaya={sumberDaya} filter={filter} onChange={setFilter} />
      <PeminjamanList items={peminjaman} onDetail={handleDetail} />
      <PeminjamanDetail detail={detail} />
    </div>
  )
}

