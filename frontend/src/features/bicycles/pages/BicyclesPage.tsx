import { useRef, useState } from 'react'
import Button from '../../../components/ui/Button'
import BicycleList from '../components/BicycleList'
import BicycleModal from '../components/BicycleModal'
import { useBicycles } from '../hooks/useBicycles'
import type { Bicycle, BicyclePayload } from '../types/bicycle'

function BicyclesPage() {
    const { bicycles, loading, error, setError, loadBicycles, saveBicycle, deleteBicycle } = useBicycles()
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedBicycle, setSelectedBicycle] = useState<Bicycle | null>(null)
    const [deleting, setDeleting] = useState(false)
    const deletingRef = useRef(false)

    function openModal(bicycle: Bicycle | null) {
        setError(null)
        setSelectedBicycle(bicycle)
        setModalOpen(true)
    }

    async function handleSave(payload: BicyclePayload) {
        await saveBicycle(selectedBicycle?.id ?? null, payload)
        setModalOpen(false)
    }

    async function handleDelete(id: number) {
        if (deletingRef.current) return
        const bicycle = bicycles.find((item) => item.id === id)
        if (!bicycle || !window.confirm(`¿Eliminar la bicicleta ${bicycle.brand} ${bicycle.model}?`)) return
        deletingRef.current = true
        setDeleting(true)
        try {
            await deleteBicycle(id)
        } finally {
            deletingRef.current = false
            setDeleting(false)
        }
    }

    return (
        <main className="mx-auto max-w-6xl p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">Bicicletas</h1>
                <Button onClick={() => openModal(null)} disabled={loading || deleting}
                    className="rounded px-4 py-2 disabled:opacity-50">Nueva bicicleta</Button>
            </div>

            {error && !modalOpen && (
                <div className="mb-4">
                    <p role="alert" className="text-red-600">{error}</p>
                    <Button variant="secondary" disabled={loading || deleting}
                        onClick={() => void loadBicycles()} className="mt-2 rounded px-4 py-2">
                        Volver a cargar
                    </Button>
                </div>
            )}
            {deleting && <p role="status">Eliminando bicicleta...</p>}

            {loading ? (
                <p role="status">Cargando bicicletas...</p>
            ) : bicycles.length === 0 ? (
                !error && <p>No hay bicicletas disponibles.</p>
            ) : (
                <BicycleList bicycles={bicycles}
                    onEdit={deleting ? undefined : (id) => {
                        const bicycle = bicycles.find((item) => item.id === id)
                        if (bicycle) openModal(bicycle)
                    }}
                    onDelete={deleting ? undefined : (id) => void handleDelete(id)} />
            )}
            {modalOpen && <BicycleModal bicycle={selectedBicycle} onSave={handleSave}
                onClose={() => setModalOpen(false)} />}
        </main>
    )
}

export default BicyclesPage
