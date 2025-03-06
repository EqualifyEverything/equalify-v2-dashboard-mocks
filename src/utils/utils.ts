export function toggleArrayElement(array: any[], element: any) {
  const index = array.indexOf(element);

  if (index > -1) {
    array.splice(index, 1); // Remove element if it exists
  } else {
    array.push(element); // Add element if it doesn't exist
  }
  return array;
}

export function sortObjects(arr: any[], property: string, order = "asc") {
  return arr.sort((a, b) => {
    const valA = a[property];
    const valB = b[property];

    if (typeof valA === "number" && typeof valB === "number") {
      return order === "asc" ? valA - valB : valB - valA;
    } else {
      const comparison = String(valA).localeCompare(String(valB));
      return order === "asc" ? comparison : -comparison;
    }
  });
}

export function intersects(arr1: any[], arr2: any[]) {
  const set2 = new Set(arr2)
  const intersection = arr1.filter(item => set2.has(item))
  return !!intersection.length
}