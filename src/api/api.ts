import { intersects, sortObjects } from "../utils/utils";

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
  let results = audits.filter(x => x.name.includes(options.nameFilter))
  results = sortObjects(results, options.sortBy, options.sortDirection)
  results = results.slice(0, options.limit)
  return Promise.resolve(audits)
};

export const fetchAuditById = async (id: string): Promise<Audit> => {
  const audit = audits.find(x => x.id = id)
  if (audit) { return Promise.resolve(audit) }
  return Promise.reject('Audit not found')
}

export const fetchAllAudits = async (): Promise<Audit[]> => {
  return Promise.resolve(audits)
}

// TODO: Fix all this garbage
export const fetchBlockers = async (options: BlockerSearchOptions): Promise<Blocker[] | BlockerGroup[]> => {
  // test Blocker[] return value
  let results: Blocker[] | BlockerGroup[] = blockers
  return Promise.resolve(results)

  // test BlockerGroup[] return value
  // let results: BlockerGroup[] = [
  //   {
  //     groupedBy: 'issue',
  //     groupValue: 'TACO TIME',
  //     blockers: blockers.slice(0,1)
  //   },
  //   {
  //     groupedBy: 'issue',
  //     groupValue: 'BURRITO O CLOCK',
  //     blockers: blockers.slice(1,3)
  //   }
  // ]
  // return Promise.resolve(results)

  // string filter
  // const { filterField, filterString } = options
  // if (filterField === 'issueTags') {
  //   results = results.filter(blocker => blocker.issueTags.some(tag => tag.includes(filterString)))
  // } else {
  //   results = results.filter(blocker => blocker[filterField].includes(filterString))
  // }
  
  // // tags/status filter
  // const { includedTags, includedStatuses } = options
  // results = results.filter(blocker => intersects(blocker.issueTags, includedTags))
  // results = results.filter(blocker => intersects([blocker.status], includedStatuses))

  // // group
  // const { groupBy } = options
  // if (groupBy !== 'none') {
  //   results = results.reduce((groups: BlockerGroup[], blocker) => {
  //     const group = (
  //       groups.find(group => group.groupValue === blocker[groupBy])
  //       ?? { 
  //         groupedBy: groupBy, 
  //         groupValue: blocker[groupBy], 
  //         blockers: []}
  //     )
  //     group.blockers.push(blocker)
  //     return groups
  //   }, [])
  // }

  // // sort and limit
  // const { sortBy, sortDirection, limit, groupLimit } = options
  // if (groupBy) {
  //   results = (results as BlockerGroup[]).map(group => {
  //     group.blockers = sortObjects(group.blockers, sortBy, sortDirection)
  //     group.blockers = group.blockers.slice(0, limit)
  //     return group
  //   })
  //   results = results.slice(0, groupLimit)
  // } else {
  //   results = sortObjects(results, sortBy, sortDirection)
  //   results = results.slice(0, limit)
  // }
  
  // return Promise.resolve(results)
}

export const fetchAuditLogs = async (auditId: number, limit: number = 5): Promise<any> => {
  return Promise.resolve({
    // TODO:
  })
}