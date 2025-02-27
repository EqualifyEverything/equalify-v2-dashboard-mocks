export const getAccountInfo = () => {}

export const getAudits = () => {}
export const getAuditDetails = (id: number) => {}

export const getLogs = () => {}
export const getLogDetails = (id: number) => {}

export const getPages = () => {}
export const getPageDetails = (id: number) => {}


export const fetchAudits = async (options: AuditSearchOptions): Promise<Audit[]> => {
  // TESTING
  let audits = [
    {
      id: '1',
      name: "Lucy's Audit",
      pages: 2,
      checks: 2,
      progress: 0,
      status: 'idle',
      created: '2025-02-25',
      lastRun: '2025-02-25',
    },
    {
      id: '2',
      name: "Lucy's Audit 2",
      pages: 2,
      checks: 2,
      progress: 0,
      status: 'idle',
      created: '2025-02-25',
      lastRun: '2025-02-26',
    },
    {
      id: '3',
      name: "Mega Audit",
      pages: 100,
      checks: 3,
      progress: 0,
      status: 'idle',
      created: '2025-02-25',
      lastRun: '2025-02-25',
    },
    {
      id: '4',
      name: "Five Audit",
      pages: 5,
      checks: 5,
      progress: 5,
      status: 'idle',
      created: '2025-01-15',
      lastRun: '2025-01-25',
    },
    {
      id: '5',
      name: "Chauncey's Audit",
      pages: 4,
      checks: 1,
      progress: 100,
      status: 'idle',
      created: '2023-02-25',
      lastRun: '2024-02-25',
    },
    {
      id: '6',
      name: "Runman's Audit",
      pages: 3,
      checks: 2,
      progress: 0,
      status: 'running',
      created: '2025-02-24',
      lastRun: '2025-02-27',
    }
  ];

  function sortObjects(arr: any[], property: string, order = "asc") {
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

  audits = audits.filter(x => x.name.includes(options.nameFilter))
  audits = sortObjects(audits, options.sortBy, options.sortDirection)
  audits = audits.slice(0, options.limit)
  return Promise.resolve(audits as Audit[])

  const params = new URLSearchParams({
    nameFilter: options.nameFilter,
    sortBy: options.sortBy,
    sortDirection: options.sortDirection,
    limit: options.limit.toString(),
  });

  const response = await fetch(`/audits?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch audits');
  }
  return response.json();
};

export const fetchAllAudits = async (): Promise<Audit[]> => {
  // TESTING
  return Promise.resolve([
    {
      id: '1',
      name: "Lucy's Audit",
      pages: 2,
      checks: 2,
      progress: 0,
      status: 'idle',
      created: '2025-02-25',
      lastRun: '2025-02-25',
    }
  ])
}