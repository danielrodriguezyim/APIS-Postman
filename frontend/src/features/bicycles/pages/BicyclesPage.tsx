import BicycleList from '../components/BicycleList'
import { useBicycles } from '../hooks/useBicycles'

function BicyclesPage() {
    const { bicycles, loading, error } = useBicycles()

    return (
        <main className="mx-auto max-w-6xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Bicicletas</h1>

            {loading ? (
                <p role="status">Cargando bicicletas...</p>
            ) : error ? (
                <p role="alert" className="text-red-600">{error}</p>
            ) : bicycles.length === 0 ? (
                <p>No hay bicicletas disponibles.</p>
            ) : (
                <BicycleList bicycles={bicycles} />
            )}
        </main>
    )
}

export default BicyclesPage
