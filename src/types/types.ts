type SortOrder = 'asc' | 'desc'
type BlockerStatus = 'active' | 'ignored' | 'equalified'

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
  sortDirection: SortOrder
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
  status: BlockerStatus
  check: string
  auditDate: string
}

type BlockerGroupkey = 'issue' | 'pageUrl' | 'check'
type BlockerSortKey = 'issue' | 'code' | 'auditDate'
type BlockerFilterKey = 'issue' | 'code' | 'issueTags' | 'pageTitle' | 'pageUrl'

type BlockerSearchOptions = {
  filterField: BlockerFilterKey
  filterString: string
  sortBy: BlockerSortKey
  sortDirection: SortOrder
  groupBy: BlockerGroupkey | 'none'
  groupLimit: number
  includedTags: string[]
  includedStatuses: (BlockerStatus)[]
  limit: number;
}

type Labeled<U = string> = {
  key: U
  label: string
}

interface HasID {
  id: string
}