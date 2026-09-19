import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import axios from 'axios'
import './App.css'
import { bicycleService } from './services/bicycleService'
import type { Bicycle, BicyclePayload } from './services/bicycleService'

const emptyForm: BicyclePayload = { brand: '', model: '', description: '', price: 0, stock: 0 }

const formatPrice = (price: number | string) => new Intl.NumberFormat('es-ES', {
  style: 'currency', currency: 'EUR',
}).format(Number(price))

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) return error.response?.data?.message || 'No se pudo conectar con la API.'
  return 'Ha ocurrido un error inesperado.'
}

function App() {
  const [bicycles, setBicycles] = useState<Bicycle[]>([])
  const [form, setForm] = useState<BicyclePayload>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadBicycles = async () => {
    try {
      setLoading(true); setError(''); setBicycles(await bicycleService.getAll())
    } catch (requestError) { setError(getErrorMessage(requestError)) }
    finally { setLoading(false) }
  }

  useEffect(() => { void loadBicycles() }, [])

  const filteredBicycles = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()
    if (!normalizedSearch) return bicycles
    return bicycles.filter((bicycle) => `${bicycle.brand} ${bicycle.model}`.toLowerCase().includes(normalizedSearch))
  }, [bicycles, search])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setSaving(true); setError('')
      if (editingId === null) await bicycleService.create(form)
      else await bicycleService.update(editingId, form)
      setForm(emptyForm); setEditingId(null); await loadBicycles()
    } catch (requestError) { setError(getErrorMessage(requestError)) }
    finally { setSaving(false) }
  }

  const handleEdit = (bicycle: Bicycle) => {
    setEditingId(bicycle.id)
    setForm({ brand: bicycle.brand, model: bicycle.model, description: bicycle.description || '', price: Number(bicycle.price), stock: bicycle.stock })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (bicycle: Bicycle) => {
    if (!window.confirm(`¿Eliminar ${bicycle.brand} ${bicycle.model}?`)) return
    try { setError(''); await bicycleService.remove(bicycle.id); await loadBicycles() }
    catch (requestError) { setError(getErrorMessage(requestError)) }
  }

  const handleCancel = () => { setEditingId(null); setForm(emptyForm) }

  return (
    <main className="app-shell">
      <header className="topbar"><div className="brand-lockup"><span className="brand-mark" aria-hidden="true">BS</span><div><p className="eyebrow">Bicycle shop</p><span className="brand-name">Inventario</span></div></div><span className="api-status"><span className="status-dot" /> API conectada</span></header>
      <section className="intro"><div><p className="eyebrow accent-text">Catálogo / bicicletas</p><h1>Tu flota,<br /><em>en movimiento.</em></h1><p className="intro-copy">Controla modelos, precios y unidades disponibles desde un único lugar.</p></div><div className="summary-stamp"><strong>{bicycles.length.toString().padStart(2, '0')}</strong><span>bicicletas<br />registradas</span></div></section>
      <section className="workspace">
        <form className="form-panel" onSubmit={handleSubmit}><div className="panel-heading"><div><p className="eyebrow accent-text">{editingId === null ? 'Nueva entrada' : 'Editando entrada'}</p><h2>{editingId === null ? 'Añadir bicicleta' : 'Actualizar bicicleta'}</h2></div><span className="form-index">{editingId === null ? '01' : '02'}</span></div>
          <label>Marca<input required value={form.brand} onChange={(event) => setForm({ ...form, brand: event.target.value })} placeholder="Ej. Specialized" /></label><label>Modelo<input required value={form.model} onChange={(event) => setForm({ ...form, model: event.target.value })} placeholder="Ej. Rockhopper" /></label><label>Descripción<textarea rows={3} value={form.description || ''} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Una breve descripción del modelo" /></label><div className="field-row"><label>Precio (€)<input required min="0" step="0.01" type="number" value={form.price} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} /></label><label>Stock<input required min="0" step="1" type="number" value={form.stock} onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })} /></label></div>
          <div className="form-actions">{editingId !== null && <button className="button secondary" type="button" onClick={handleCancel}>Cancelar</button>}<button className="button primary" type="submit" disabled={saving}>{saving ? 'Guardando...' : editingId === null ? 'Añadir bicicleta +' : 'Guardar cambios'}</button></div>
        </form>
        <div className="list-panel"><div className="list-heading"><div><p className="eyebrow">Vista general</p><h2>Catálogo actual</h2></div><label className="search-box"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar modelo..." aria-label="Buscar bicicleta" /></label></div>
          {error && <div className="error-message" role="alert">{error}</div>}{loading ? <div className="empty-state">Cargando catálogo...</div> : filteredBicycles.length === 0 ? <div className="empty-state">{search ? 'No hay coincidencias.' : 'Aún no hay bicicletas registradas.'}</div> : <div className="bicycle-list">{filteredBicycles.map((bicycle) => <article className="bicycle-row" key={bicycle.id}><div className="bike-number">{String(bicycle.id).padStart(2, '0')}</div><div className="bike-info"><h3>{bicycle.brand} <span>{bicycle.model}</span></h3><p>{bicycle.description || 'Sin descripción'}</p></div><div className="bike-metric"><small>Precio</small><strong>{formatPrice(bicycle.price)}</strong></div><div className={`stock-badge ${bicycle.stock === 0 ? 'empty' : ''}`}><small>Stock</small><strong>{bicycle.stock}</strong></div><div className="row-actions"><button type="button" onClick={() => handleEdit(bicycle)} aria-label={`Editar ${bicycle.model}`} title="Editar">✎</button><button type="button" onClick={() => void handleDelete(bicycle)} aria-label={`Eliminar ${bicycle.model}`} title="Eliminar">×</button></div></article>)}</div>}
        </div>
      </section>
    </main>
  )
}

export default App
