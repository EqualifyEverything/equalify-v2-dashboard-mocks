import { useId, useState } from "react"
import { capitalize, toKebabCase } from "../utils/utils"

const CheckboxTable: React.FC<{
  itemName: string
  columns: Labeled[]
  data: any[]
  onCheckedBoxesChange: Function
  expanded: boolean
}> = ({
  itemName, 
  columns, 
  data, 
  onCheckedBoxesChange, // send IDs of all checked boxes back to parent
  expanded = true
}) => {
  // Guard clauses TODO:
  // data key count !== column count
  // a data key not in column keys
  // no id data key

  const [areAllSelected, setAreAllSelected] = useState(false)
  const toggleSelectAll = () => {
    const newCheckedBoxes = areAllSelected 
      ? new Set()
      : new Set(data.map(el => el.id))
    
    setCheckedBoxes(newCheckedBoxes)
    onCheckedBoxesChange(newCheckedBoxes)
    setAreAllSelected(!areAllSelected)
  }
  
  const [checkedBoxes, setCheckedBoxes] = useState(new Set())
  const toggleCheckbox = (id: string) => {
    const newBoxes = new Set(checkedBoxes)
    newBoxes.has(id)
      ? newBoxes.delete(id)
      : newBoxes.add(id)

    setCheckedBoxes(newBoxes)
    onCheckedBoxesChange(newBoxes)
    setAreAllSelected(newBoxes.size === data.length)
  }

  const selectAllId = 'selectall-' + itemName.toLocaleLowerCase + useId()
  const itemPlural = itemName + 's'
  

  
  return (
    <div role="region" style={{ display: expanded ? 'block' : 'none' }}>
      <input
        id={ selectAllId }
        type="checkbox"
        checked={ areAllSelected }
        onChange={ toggleSelectAll }
      />
      <label htmlFor={ selectAllId }>Select All { capitalize(itemPlural) }</label>
      <table>
        <thead>
          <tr>
            {columns.map(col =><th key={col.key}>{col.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col, index) => {
                const checkbox = index === 0 ? (
                  <input
                    type="checkbox"
                    checked={checkedBoxes.has(item.id)}
                    onChange={ () => { toggleCheckbox(item.id) } }
                  /> 
                ) : <></>
                return <td key={col.key}>{checkbox}{(item as any)[col.key]}</td>
              }
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td role="rowheader" colSpan={columns.length + 1}>
                No { itemPlural } found. Try adjusting your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CheckboxTable