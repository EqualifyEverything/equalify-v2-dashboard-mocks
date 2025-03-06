type Audit = {
  id: string
  name: string
  pages: number
  checks: number
  progress: number
  status: 'pending' | 'running' | 'completed' | 'failed' | 'idle'
  created: string
  lastRun: string
  schedule: 'daily' | 'monthly' | 'quarterly' | 'manually' | string
} 

type AuditSearchOptions = {
  nameFilter: string
  sortBy: keyof Audit
  sortDirection: 'asc' | 'desc'
  limit: number
}

type Blocker = {
  id: string
  issue: string
  issueTags: string[]
  code: string
  screenshotUrl: string
  pageTitle: string
  pageUrl: string
  status: 'active' | 'ignored' | 'equalified'
  check: string
  auditDate: string
}

type BlockerGroup = {
  groupedBy: 'issue' | 'pageUrl' | 'check' | 'none'
  groupValue: string
  blockers: Blocker[]
}

type BlockerSearchOptions = {
  filterField: 'issue' | 'code' | 'issueTags' | 'pageTitle' | 'pageUrl'
  filterString: string
  sortBy: keyof Blocker
  sortDirection: 'asc' | 'desc'
  groupBy: 'issue' | 'pageUrl' | 'check' | 'none'
  groupLimit: number
  includedTags: string[]
  includedStatuses: ('active' | 'ignored' | 'equalified')[]
  limit: number;
}

type Labeled<U = string> = {
  key: U
  label: string
}