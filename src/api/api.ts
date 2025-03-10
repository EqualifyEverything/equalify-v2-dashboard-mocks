import { groupAndSort, sortObjects } from "../utils/utils";

// test data
const audits: Audit[] = [
  {
    id: '1',
    name: "Lucy's Audit",
    pages: 2,
    checks: 2,
    progress: 0,
    status: 'idle',
    created: '2025-02-25',
    lastRun: '2025-02-25',
    schedule: 'monthly'
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
    schedule: 'monthly'
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
    schedule: 'yearly'
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
    schedule: 'monthly'
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
    schedule: 'weekly'
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
    schedule: 'daily'
  }
];

const blockers: Blocker[] = [
  {
    id: '1',
    issue: 'Empty Heading', 
    issueTags: ['WCAG 2.2 AA', 'Headings'],
    code: '<h1></h1>',
    screenshotUrl: '/screenshot.jpeg',
    pageTitle: 'Berkeley Library (Staging)',
    pageUrl: 'https://update.lib.berkeley.edu/',
    status: 'active',
    check: 'empty-headings',
    auditDate: '12-1-2024',
  },
  {
    id: '2',
    issue: 'Empty Alt Text', 
    issueTags: ['WCAG 2.2 AA', 'Images'],
    code: '<img class="some_image_class" alt="">',
    screenshotUrl: '/screenshot.jpeg',
    pageTitle: 'Berkeley Library (Staging)',
    pageUrl: 'https://update.lib.berkeley.edu/',
    status: 'active',
    check: 'empty-alt-text',
    auditDate: '12-1-2024',
  },
  {
    id: '3',
    issue: 'Empty Alt Text', 
    issueTags: ['WCAG 2.2 AA', 'Images'],
    code: '<img alt="">',
    screenshotUrl: '/screenshot.jpeg',
    pageTitle: 'Berkeley Homepage (Staging)',
    pageUrl: 'https://www-stg.berkeley.edu/',
    status: 'active',
    check: 'empty-alt-text',
    auditDate: '12-1-2024',
  },
  {
    id: '4',
    issue: 'Repeat Link Text', 
    issueTags: ['Benefits Screen Readers', 'Links'],
    code: '<a class="hello this is a test">Hello World</a><a href="#">Hello World</a>',
    screenshotUrl: '/screenshot.jpeg',
    pageTitle: 'Berkeley Library (Staging)',
    pageUrl: 'https://update.lib.berkeley.edu/',
    status: 'active',
    check: 'repeat-link-text',
    auditDate: '12-1-2024',
  },
]

export const fetchAudits = async (options: AuditSearchOptions): Promise<Audit[]> => {
  let results = audits.filter(audit => audit.name.includes(options.nameFilter))
  results = sortObjects(results, options.sortBy, options.sortDirection)
  results = results.slice(0, options.limit)
  return Promise.resolve(results)
}

export const fetchAuditById = async (id: string): Promise<Audit> => {
  const audit = audits.find(x => x.id = id)
  if (audit) { return Promise.resolve(audit) }
  return Promise.reject('Audit not found')
}

export const fetchAllAudits = async (): Promise<Audit[]> => {
  return Promise.resolve(audits)
}

export const fetchBlockers = async (options: BlockerSearchOptions): Promise<Blocker[]> => {
  let results: Blocker[] = blockers.filter(blocker =>
    blocker[options.filterField].includes(options.filterString)
  )
  if (options.groupBy !== 'none') {
    results = groupAndSort(results, options.groupBy, options.sortBy, options.sortDirection)
    // @ts-expect-error - we know the fields exist
    let grouped:Blocker[][] = Object.values(
      Object.groupBy(results, blocker => blocker[options.groupBy as BlockerGroupkey])
    )
    grouped = grouped.map(group => group.slice(0, options.limit))
    results = grouped.slice(0, options.groupLimit).flat()
  } else {
    results = sortObjects(results, options.sortBy, options.sortDirection)
    results = results.slice(0, options.limit)
  }
  return Promise.resolve(results)
}

export const fetchAuditLogs = async (auditId: number, limit: number = 5): Promise<any> => {
  return Promise.resolve({
    // TODO:
  })
}