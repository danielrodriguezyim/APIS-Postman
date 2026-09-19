import Button from '../../../components/ui/Button'
import type { Bicycle } from '../types/bicycle'

interface BicycleRowProps {
    bicycle: Bicycle
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}

function BicycleRow({
    bicycle,
    onEdit,
    onDelete,
}: BicycleRowProps) {
    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="p-3">{bicycle.brand}</td>
            <td className="p-3">{bicycle.model}</td>
            <td className="p-3">{Number(bicycle.price).toFixed(2)} €</td>
            <td className="p-3">{bicycle.stock}</td>
            {(onEdit || onDelete) && <td className="p-3">
                <div className="flex gap-2">
                    {onEdit && <Button variant="secondary" onClick={() => onEdit(bicycle.id)}>Edit</Button>}
                    {onDelete && <Button variant="danger" onClick={() => onDelete(bicycle.id)}>Delete</Button>}
                </div>
            </td>}
        </tr>
    )
}
export default BicycleRow
