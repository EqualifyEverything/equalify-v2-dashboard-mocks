import React, { useState, useEffect } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchBlockers } from '../api/api'
import { toggleArrayElement, toKebabCase } from '../utils/utils'
import CheckboxTable from './CheckboxTable'


// Search Options Component
const SearchOptions: React.FC<{
  options: BlockerSearchOptions
  onApply: (options: BlockerSearchOptions) => void
  isLoading: boolean
}> = ({ options, onApply, isLoading }) => {
  const [localOptions, setLocalOptions] = useState<BlockerSearchOptions>(options)
  
  // Reset local options when parent options change
  useEffect(() => {
    setLocalOptions(options)
  }, [options])
  
  const handleChange = (field: keyof BlockerSearchOptions, value: any) => {
    setLocalOptions(prev => ({ ...prev, [field]: value }))
  }

  // For 'includes' fields
  const handleCheckboxChange = (field: keyof BlockerSearchOptions, value: any) => {
    setLocalOptions((prev) => ({
      ...prev,
      [field]: toggleArrayElement(prev[field] as any[], value),
    }))
  }

  // Conditionally show/hide options based on checkbox status
  const showOptionsStorageKey = 'showSearchOptions'
  const [showOptions, setShowOptions] = useState(() => {
    const savedState = localStorage.getItem(showOptionsStorageKey)
    return savedState !== null ? JSON.parse(savedState) : false
  })

  useEffect(() => {
    localStorage.setItem(showOptionsStorageKey, JSON.stringify(showOptions))
  }, [showOptions, showOptionsStorageKey])

  const handleShowOptionsChange = () => {
    setShowOptions(!showOptions)
  }
  
  const sortableColumns:  Labeled<keyof Blocker>[] = [
    { key: 'code', label: 'Blocker Code' },
    { key: 'issue', label: 'Issue Name' },
    { key: 'auditDate', label: 'Audit Date' },
  ]

  const groupOptions: Labeled<keyof Blocker | 'none'>[] = [
    { key: 'issue', label: 'Issue' },
    { key: 'pageTitle', label: 'Page' },
    { key: 'check', label: 'Check' },
    { key: 'none', label: 'None' },
  ]

  const includeIssueTags: Labeled[] = [
    { key: 'wcag-22-a', label: 'WCAG 2.2 A' },
    { key: 'wcag-22-aa', label: 'WCAG 2.2 AA' },
    { key: 'wcag-22-aaa', label: 'WCAG 2.2 AAA' },
    { key: 'heading-elements', label: 'Heading Elements' },
  ]

  const includeBlockerStatuses: Labeled<'active' | 'ignored' | 'equalified'>[]  = [
    { key: 'active', label: 'Active' },
    { key: 'ignored', label: 'Ignored' },
    { key: 'equalified', label: 'Equalified' },
  ]

  const limitOptions = [5, 10, 20]
  const groupLimitOptions = [5, 10, 20]
  
  return (
    <>
      <input 
        type="checkbox" 
        name="toggle" 
        id="toggle_view_options"
        checked={showOptions}
        onChange={handleShowOptionsChange}
      />
      <label htmlFor="toggle_view_options">Show Search Options</label>
      <section id="search_options"
        aria-hidden={!showOptions}
        style={{ display: showOptions ? 'block' : 'none' }}
      >
        <h3>Search Options</h3>
        
        <form action={() => onApply(localOptions)}>
          {/* Filter */}
          <div role="group" aria-labelledby="filter-group">
            <h4 id="filter-group">Filter</h4>
            <label htmlFor="filterSource">Search in: </label>
            <select id="filterSource"  
              onChange={(e) => handleChange('filterField', e.target.options[e.target.selectedIndex].value)}
            >
              <option value="code">Blocker Code</option>
              <option value="pageTitle">Page Title</option>
              <option value="pageUrl">URL</option>
              <option value="issuetags">Tag</option>
              <option value="issue">Issue</option>
            </select>
            <label htmlFor="filter">Keywords: </label>
            <input
              type="text"
              id="filter"
              value={localOptions.filterString}
              onChange={(e) => handleChange('filterString', e.target.value)}
            />
          </div>

          {/* Group By */}
          <div role="group" aria-labelledby="group-blockers-group">
            <h4 id="group-blockers-group">Group Blockers By</h4>
            {groupOptions.map((option) => (
                <React.Fragment key={option.key}>
                  <input
                    type="radio"
                    id={`group-${option.key}`}
                    name="groupBy"
                    checked={localOptions.groupBy === option.key}
                    onChange={() => handleChange('groupBy', option.key)}
                  />
                  <label htmlFor={`group-${option.key}`}>
                    {option.label}
                  </label>
                </React.Fragment>
              ))}
          </div>
          
          {/* Includes */}
          <div role="group" aria-labelledby="include-tags-group">
            <h4 id="include-tags-group">Include Issues with Tag</h4>
            {includeIssueTags.map((option) => (
              <React.Fragment key={option.key}>
                <input
                  type="checkbox"
                  id={`include-tag-${option.key}`}
                  name="include-tags"
                  checked={localOptions.includedTags.includes(option.key)}
                  onChange={() => handleCheckboxChange('includedTags', option.key)}
                />
                <label htmlFor={`include-tag-${option.key}`}>
                  {option.label}
                </label>
              </React.Fragment>
            ))}
          </div>

          <div role="group" aria-labelledby="include-statuses-group">
            <h4 id="include-statuses-group">Include Blockers with Status</h4>
            {includeBlockerStatuses.map((option) => (
              <React.Fragment key={option.key}>
                <input
                  type="checkbox"
                  id={`include-status-${option.key}`}
                  name="include-statuses"
                  checked={localOptions.includedStatuses.includes(option.key)}
                  onChange={() => handleCheckboxChange('includedStatuses', option.key)}
                />
                <label htmlFor={`include-status-${option.key}`}>
                  {option.label}
                </label>
              </React.Fragment>
            ))}
          </div>

          {/* Sort By */}
          <div role="group" aria-labelledby="sort-group">
            <h4 id="sort-group">Sort</h4>
            <div>
              {sortableColumns.map((column) => (
                <React.Fragment key={column.key}>
                  <input
                    type="radio"
                    id={`sort-${column.key}`}
                    name="sortBy"
                    checked={localOptions.sortBy === column.key}
                    onChange={() => handleChange('sortBy', column.key)}
                  />
                  <label htmlFor={`sort-${column.key}`}>
                    {column.label}
                  </label>
                </React.Fragment>
              ))}
            </div>
            
            <div>
              <input
                type="radio"
                id="sort-asc"
                name="sortDirection"
                checked={localOptions.sortDirection === 'asc'}
                onChange={() => handleChange('sortDirection', 'asc')}
              />
              <label htmlFor="sort-asc">
                Ascending
              </label>
              <input
                type="radio"
                id="sort-desc"
                name="sortDirection"
                checked={localOptions.sortDirection === 'desc'}
                onChange={() => handleChange('sortDirection', 'desc')}
              />
              <label htmlFor="sort-desc">
                Descending
              </label>
            </div>
          </div>
          
          {/* Limit */}
          <div role="group" aria-labelledby="blocker-limit-group">
            <h4 id="blocker-limit-group">Limit</h4>
            
            <label htmlFor="limit">Change Number of Blockers Displayed: </label>
            <select
              id="limit"
              value={localOptions.limit}
              onChange={(e) => handleChange('limit', Number(e.target.value))}
            >
              {limitOptions.map((limit) => (
                <option key={limit} value={limit}>
                  Up to {limit}
                </option>
              ))}
            </select>
          </div>

          <div role="group" aria-labelledby="group-limit-group">
            <label htmlFor="groupLimit">Change Number of Groups Displayed: </label>
            <select
              id="groupLimit"
              value={localOptions.groupLimit}
              onChange={(e) => handleChange('groupLimit', Number(e.target.value))}
            >
              {groupLimitOptions.map((groupLimit) => (
                <option key={groupLimit} value={groupLimit}>
                  Up to {groupLimit}
                </option>
              ))}
            </select>
          </div>
          
          {/* Save Options */}
          <button
            type="button"
            onClick={() => onApply(localOptions)}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Save Search Options'}
          </button>
        </form>
      </section>
    </>
  )
}


// Audit Table Component
const BlockersTable: React.FC = () => {
  const [selectedBlockers, setSelectedBlockers] = useState<Set<string>>(new Set())
  const [selectAll, setSelectAll] = useState(false)
  const [searchOptions, setSearchOptions] = useState<BlockerSearchOptions>({
    filterField: 'code',
    filterString: '',
    sortBy: 'code',
    sortDirection: 'asc',
    groupBy: 'none',
    limit: 10,
    groupLimit: 10,
    includedTags: [],
    includedStatuses: []
  })

  const handleApplySearchOptions = (newOptions: BlockerSearchOptions) => {
    setSearchOptions(newOptions)
  }
  
  // Blocker query
  const { 
    data: blockers = [], 
    isLoading, 
    isFetching, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ['blockers', searchOptions],
    queryFn: () => fetchBlockers(searchOptions),
    initialData: [],
    placeholderData: keepPreviousData,
    staleTime: 0,
  })

  // Only reset selections when data source actually changes (not during loading)
  useEffect(() => {
    if (!isFetching) {
      setSelectedBlockers(new Set())
      setSelectAll(false)
    }
  }, [blockers, isFetching])
  
  if (isError) {
    return <div>Error loading Blockers. Please try again.</div>
  }
  
  // Show loading indicator only on initial load, not on refetch
  const showInitialLoading = isLoading && !isFetching

  // These are filtered when grouping
  const allColumns: Labeled<keyof Blocker>[] = [
    {key: 'code', label: 'Blocker Code'},
    {key: 'issue', label: 'Issue'},
    {key: 'screenshotUrl', label: 'Screenshot'},
    {key: 'pageTitle', label: 'Page Title'},
    {key: 'pageUrl', label: 'URL'},
    {key: 'status', label: 'Status'},
    {key: 'check', label: 'Check'},
    {key: 'auditDate', label: 'Audit Date'},
  ]

  // Subtable for a group of blockers, including an accordion button to show/hide
  const BlockerSubTable: React.FC<{
    groupValue: string 
    groupedBy: string
    blockers: Blocker[]
    expanded: boolean
    setExpanded: Function
    onCheckedBoxesChange: Function
    }> = ({
    groupValue, groupedBy, blockers, expanded, setExpanded, onCheckedBoxesChange
  }) => {

    const colsToRemove: Record<string, string[]> = {
      none: [] as string[],
      issue: ['issue'],
      pageUrl: ['pageUrl', 'pageTitle'],
      check: ['check']
    }

    const resultColumns = allColumns.filter(col => {
      return !colsToRemove[groupedBy].includes(col.key)
    })
    
    const buttonText = (
      groupValue + `(${blockers.length} Active Blocker${blockers.length === 1 ? '' : 's'})`
    )

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
          itemName={ 'blocker' } 
          columns={ resultColumns } 
          data={ blockers } 
          onCheckedBoxesChange={ onCheckedBoxesChange } 
          expanded={ expanded } 
        />
      </>
    )
  }

  const groupedByHeaderText = (
    searchOptions.groupBy !== 'none' 
      ? ` - Grouped by ${searchOptions.groupBy}` 
      : ''
  )

  // Map of blockers grouped by searchOptions.groupBy, keyed to that field's value
  let blockerGroups: Map<string, Blocker[]> = new Map()
  if (searchOptions.groupBy !== 'none') {
    blockerGroups = blockers.reduce((groups: Map<string, Blocker[]>, blocker) => {
      const group = blocker[searchOptions.groupBy as BlockerGroupkey]
      if (groups.has(group)) {
        const existing = groups.get(group) 
        // @ts-expect-error - we know there are defined
        existing.push(blocker)
      } else {
        groups.set(group, [blocker])
      }
      return groups
    }, new Map())
  }

  // Array of <BlockerSubTable>'s or a single <BlockerFullTable>
  const blockerTables = (
    blockerGroups.size
      ? Array.from(blockerGroups, ([group, blockers]) => {
          return <BlockerSubTable 
            key={ group }
            groupedBy={ searchOptions.groupBy }
            groupValue={ group }
            blockers={ blockers }
            expanded={ false }
            setExpanded={ () => undefined }
            onCheckedBoxesChange={ undefined }
          />
        })
      : <CheckboxTable 
          htmlId={''} 
          columns={[]} 
          data={[]} 
          expanded={false} 
          onCheckedBoxesChange={undefined} 
        />
  )

  
  return (
    <>
      <h2>Blockers</h2>
      
      <SearchOptions 
        options={searchOptions} 
        onApply={handleApplySearchOptions} 
        isLoading={isFetching}
      />

      <section>
        <h3>All Blockers{ groupedByHeaderText }</h3>
        
        {/* Show loading state indicator during fetch but keep table visible */}
        {isFetching && !isLoading && (
          <div>Refreshing data...</div>
        )}
        
        <div>
          {showInitialLoading ? 
            <div>Loading...</div>
           : <>{ blockerTables }</>
          }
        </div>
        
        {selectedBlockers.size > 0 && (
          <div>
            <p>
              {selectedBlockers.size} {selectedBlockers.size === 1 ? 'blocker' : 'blockers'} selected
            </p>
          </div>
        )}
      </section>
      <section>
        <h3>Manage Selected Audits</h3>
        <nav aria-label="Manage Selected Blockers">
          <button>Ignore Blockers</button> 
          {/* TODO: Generate ticket functionality on the frontend */}
          <button>Generate Ticket</button>  
        </nav>
      </section>
    </>
  )
}

// Main Page Component for Tanstack Router
export const AuditDetailsDashboard2: React.FC = () => {
  return (
    <>
      <BlockersTable />
    </>
  )
}

export default AuditDetailsDashboard2