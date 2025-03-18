import { capitalize } from "../utils/utils"
import CheckboxTable from "./CheckboxTable"

// Subtable for a group of blockers, including an accordion button to show/hide
// (itemName, groupValue) should be a unique pair, since we use that for the ID
const CheckboxTableGroup: React.FC<{
  groupValue: string
  itemName: string
  columns: Labeled[]
  data: any[]
  expanded: boolean
  setExpanded: Function
  onCheckedBoxesChange: Function
  }> = ({
  groupValue, itemName, columns, data, expanded, setExpanded, onCheckedBoxesChange
}) => {
  
  const buttonItemName = capitalize(`${itemName}${data.length === 1 ? '' : 's'}`)
  const buttonText = `${groupValue} (${buttonItemName})`

  return (
    <>
      <h4>
        <button
          type="button" 
          className="accordion-trigger"
          aria-expanded={expanded}
          onClick={(e) => setExpanded(!expanded)}
        >
          { buttonText }
        </button>
      </h4>
      <CheckboxTable 
        itemName={ itemName } 
        columns={ columns } 
        data={ data } 
        onCheckedBoxesChange={ onCheckedBoxesChange } 
        expanded={ expanded } 
      />
    </>
  )
}

export default CheckboxTableGroup