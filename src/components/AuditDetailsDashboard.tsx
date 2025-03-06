import React, { useState, useEffect } from 'react';
import { hashKey, keepPreviousData, useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { fetchBlockers } from '../api/api';
import { toggleArrayElement } from '../utils/utils';

function getAllBlockerIds(blockers: Blocker[] | BlockerGroup[]) {
  return blockers.flatMap(el => {
    // For Blockers we get IDs directly
    if ('id' in el) { return el.id }

    // For BlockerGroups we go one level deeper
    return (el as BlockerGroup).blockers.map(blocker => blocker.id)
  })
}

// Search Options Component
const SearchOptions: React.FC<{
  options: BlockerSearchOptions
  onApply: (options: BlockerSearchOptions) => void
  isLoading: boolean
}> = ({ options, onApply, isLoading }) => {
  const [localOptions, setLocalOptions] = useState<BlockerSearchOptions>(options)
  
  // Reset local options when parent options change
  useEffect(() => {
    setLocalOptions(options);
  }, [options])
  
  const handleChange = (field: keyof BlockerSearchOptions, value: any) => {
    setLocalOptions(prev => ({ ...prev, [field]: value }))
  };

  // For 'includes' fields
  const handleCheckboxChange = (field: keyof BlockerSearchOptions, value: any) => {
    setLocalOptions((prev) => ({
      ...prev,
      [field]: toggleArrayElement(prev[field] as any[], value),
    }));
  };

  // Conditionally show/hide options based on checkbox status
  const showOptionsStorageKey = 'showSearchOptions'
  const [showOptions, setShowOptions] = useState(() => {
    const savedState = localStorage.getItem(showOptionsStorageKey);
    return savedState !== null ? JSON.parse(savedState) : false;
  })

  useEffect(() => {
    localStorage.setItem(showOptionsStorageKey, JSON.stringify(showOptions))
  }, [showOptions, showOptionsStorageKey])

  const handleShowOptionsChange = () => {
    setShowOptions(!showOptions)
  };
  
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
            <select id="sfilterSource"  
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
              placeholder=""
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
  );
};

// Audit Table Component
const BlockersTable: React.FC = () => {
  const [selectedBlockers, setSelectedBlockers] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchOptions, setSearchOptions] = useState<BlockerSearchOptions>({
    filterField: 'issue',
    filterString: '',
    sortBy: 'status',
    sortDirection: 'desc',
    groupBy: 'none',
    limit: 10,
    groupLimit: 10,
    includedTags: [],
    includedStatuses: []
  });
  
  // Tanstack Query state management
  const { 
    data: blockers = [] as Blocker[], 
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
  });

  // Only reset selections when data source actually changes (not during loading)
  useEffect(() => {
    if (!isFetching) {
      setSelectedBlockers(new Set());
      setSelectAll(false);
    }
  }, [blockers, isFetching]);
  
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedBlockers(new Set());
    } else {
      setSelectedBlockers(new Set(getAllBlockerIds(blockers)))
    }
    setSelectAll(!selectAll);
  };
  
  const toggleBlockerSelection = (id: string) => {
    const newSelection = new Set(selectedBlockers);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedBlockers(newSelection);
    setSelectAll(newSelection.size === blockers.length);
  };
  
  const handleApplySearchOptions = (newOptions: BlockerSearchOptions) => {
    setSearchOptions(newOptions);
  };
  
  if (isError) {
    return <div>Error loading Blockers. Please try again.</div>;
  }
  
  // Show loading indicator only on initial load, not on refetch
  const showInitialLoading = isLoading && !isFetching;

  // Show a single table if ungrouped, and groups with some columns removed if grouped
  const BlockerSubTable: React.FC<BlockerGroup> = ({groupValue, groupedBy, blockers}) => {
    const isGrouped = !(groupedBy === 'none')

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

    const colsToRemove = {
      none: [] as string[],
      issue: ['issue'],
      pageUrl: ['pageUrl', 'pageTitle'],
      check: ['check']
    }

    const resultColumns = allColumns.filter(col => {
      return !colsToRemove[groupedBy].includes(col.key)
    })
    // console.log(allColumns, colsToRemove, resultColumns)

    return (
      <>
        {isGrouped ? 
          <button type="button" aria-expanded="true" className="accordion-trigger">{groupValue}</button>
          : <></>
        }
        <input
          id='all-blockers'
          type="checkbox"
          checked={selectAll}
          onChange={toggleSelectAll}
        />
        <label htmlFor="all-blockers">Select All Blockers</label>
        <table>
          <thead>
            <tr>
              <th></th>
              {resultColumns.map(col =><th key={col.key}>{col.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {blockers.map((blocker) => (
              <tr key={blocker.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedBlockers.has(blocker.id)}
                    onChange={() => toggleBlockerSelection(blocker.id)}
                  />
                </td>
                {resultColumns.map(col =><td key={col.key}>{blocker[col.key]}</td>)}
              </tr>
            ))}
            {blockers.length === 0 && (
              <tr>
                <td colSpan={resultColumns.length + 1}>
                  No blockers found. Try adjusting your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    )
  }
  
  return (
    <>
      <h2>Blockers</h2>
      
      <SearchOptions 
        options={searchOptions} 
        onApply={handleApplySearchOptions} 
        isLoading={isFetching}
      />

      <section>
        <h3>All Blockers{'groupedBy' in blockers ? ` - Grouped by ${blockers.groupedBy}` : ''}</h3>
        
        {/* Show loading state indicator during fetch but keep table visible */}
        {isFetching && !isLoading && (
          <div>Refreshing data...</div>
        )}
        
        <div>
          {showInitialLoading ? (
            <div>Loading...</div>
          ) : (
            'blockers' in blockers ? (
              (blockers as BlockerGroup[]).map(group => {
                return <BlockerSubTable {...group}/>
              })
            ) : (
              <BlockerSubTable groupValue='' groupedBy='none' blockers={blockers as Blocker[]} />
            )
          )}
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
  );
};

// Main Page Component for Tanstack Router
export const AuditDetailsDashboard: React.FC = () => {
  return (
    <>
      <BlockersTable />
    </>
  );
};

export default AuditDetailsDashboard;