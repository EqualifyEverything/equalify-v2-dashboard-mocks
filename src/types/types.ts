interface Audit {
    id: string;
    name: string;
    pages: number;
    checks: number;
    progress: number;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'idle';
    created: string;
    lastRun: string;
  }

  interface AuditSearchOptions {
    nameFilter: string;
    sortBy: keyof Audit;
    sortDirection: 'asc' | 'desc';
    limit: number;
  }