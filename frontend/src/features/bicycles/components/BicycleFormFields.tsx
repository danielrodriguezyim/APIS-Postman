export interface BicycleFormValues {
    brand: string
    model: string
    description: string
    price: string
    stock: string
}

interface BicycleFormFieldsProps {
    values: BicycleFormValues
    onChange: (field: keyof BicycleFormValues, value: string) => void
    disabled?: boolean
}

function BicycleFormFields({ values, onChange, disabled }: BicycleFormFieldsProps) {
    const inputClass = 'mt-1 w-full rounded border border-gray-300 p-2'

    return (
        <fieldset disabled={disabled} className="space-y-4 disabled:opacity-60">
            <label className="block">
                Marca
                <input autoFocus name="brand" required maxLength={150} pattern=".*\S.*"
                    className={inputClass} value={values.brand}
                    onChange={(event) => onChange('brand', event.target.value)} />
            </label>
            <label className="block">
                Modelo
                <input name="model" required maxLength={150} pattern=".*\S.*"
                    className={inputClass} value={values.model}
                    onChange={(event) => onChange('model', event.target.value)} />
            </label>
            <label className="block">
                Descripción (opcional)
                <textarea name="description" rows={3} className={inputClass}
                    value={values.description}
                    onChange={(event) => onChange('description', event.target.value)} />
            </label>
            <label className="block">
                Precio (€)
                <input name="price" type="number" required min="0" max="99999999.99" step="0.01"
                    className={inputClass} value={values.price}
                    onChange={(event) => onChange('price', event.target.value)} />
            </label>
            <label className="block">
                Existencias
                <input name="stock" type="number" required min="0" max="4294967295" step="1"
                    className={inputClass} value={values.stock}
                    onChange={(event) => onChange('stock', event.target.value)} />
            </label>
        </fieldset>
    )
}

export default BicycleFormFields
