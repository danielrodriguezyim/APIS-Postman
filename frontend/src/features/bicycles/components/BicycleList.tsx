import type { Bicycle } from '../types/bicycle'
import BicycleRow from './BicycleRow'

interface BicycleListProps {
    bicycles: Bicycle[]
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}

function BicycleList({ bicycles, onEdit, onDelete}: BicycleListProps) {
    return (
        <div className="overflow-x-auto rounded-lg bg-white shadow">
            <table className="w-full border-collapse">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">Marca</th>
                        <th className="p-3 text-left">Modelo</th>
                        <th className="p-3 text-left">Precio</th>
                        <th className="p-3 text-left">Existencias</th>
                        {(onEdit || onDelete) && <th className="p-3 text-left">Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {bicycles.map((bicycle) => (
                        <BicycleRow key={bicycle.id} bicycle={bicycle} 
                                    onEdit={onEdit} onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default BicycleList
