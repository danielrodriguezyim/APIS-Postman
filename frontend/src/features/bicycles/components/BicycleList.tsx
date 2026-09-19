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
                        <th className="p-3 text-left">Brand</th>
                        <th className="p-3 text-left">Model</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Stock</th>
                        {(onEdit || onDelete) && <th className="p-3 text-left">Actions</th>}
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
