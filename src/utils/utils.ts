// if it's in, it goes out; if it's out, it goes in
export function toggleArrayElement(array: any[], element: any) {
  const index = array.indexOf(element)
  if (index > -1) { array.splice(index, 1) } 
  else { array.push(element) }
  return array
}

// sorts numbers numerically and other stuff alphabetically
export function compare(a: any, b: any, order: SortOrder = 'asc') {
  if (typeof a === "number" && typeof b === "number") {
    return order === "asc" ? a - b : b - a
  } else {
    const comparison = String(a).localeCompare(String(b))
    return order === "asc" ? comparison : -comparison
  }
}

export function sortObjects(arr: any[], property: string, order: SortOrder = "asc") {
  return arr.sort((a, b) => compare(a[property], b[property], order))
}

export function groupAndSort(arr: any[], groupKey: string, sortKey: string, sortOrder: SortOrder = 'asc') {
  return arr.sort((a, b) => {
    let comparison = compare(a[groupKey], b[groupKey])
    if (comparison === 0) {
      comparison = compare(a[sortKey], b[sortKey], sortOrder)
    }
    return comparison
  })
}
 

export function intersects(arr1: any[], arr2: any[]) {
  const set2 = new Set(arr2)
  const intersection = arr1.filter(item => set2.has(item))
  return !!intersection.length
}

export function toKebabCase(str: string) {
  return str
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase()
}

export function capitalize(str: string) {
  if (!str) { return '' }
  return str.charAt(0).toUpperCase() + str.slice(1)
}