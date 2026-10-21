import { useEffect, useState } from 'react'
import { getSumberDaya } from './api/sumberDayaApi'
import SumberDayaForm from './components/SumberDayaForm'
import SumberDayaList from './components/SumberDayaList'
import type { SumberDaya } from './types'

export default function App() {
  const [sumberDaya, setSumberDaya] = useState<SumberDaya[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSumberDaya()
      .then(setSumberDaya)
      .finally(() => setLoading(false))
  }, [])

  function handleCreated(item: SumberDaya) {
    setSumberDaya((prev) => [...prev, item])
  }

  return (
    <div>
      <SumberDayaForm onCreated={handleCreated} />
      {loading && <p>Memuat...</p>}
      <SumberDayaList items={sumberDaya} />
    </div>
  )
}