import React, { useState, useEffect } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { fetchAudits } from '../api/api';

// Status Badge Component
const StatusBadge: React.FC<{ status: Audit['status'] }> = ({ status }) => {
  return (
    <span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Progress Bar Component
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div>
      <div style={{ width: `${progress}%` }}></div>
    </div>
  );
};

// Search Options Component
const SearchOptions: React.FC<{
  options: AuditSearchOptions;
  onApply: (options: AuditSearchOptions) => void;
  isLoading: boolean;
}> = ({ options, onApply, isLoading }) => {
  const [localOptions, setLocalOptions] = useState<AuditSearchOptions>(options);
  
  // Reset local options when parent options change
  useEffect(() => {
    setLocalOptions(options);
  }, [options]);
  
  const handleChange = (field: keyof AuditSearchOptions, value: any) => {
    setLocalOptions(prev => ({ ...prev, [field]: value }));
  };

  // Conditionally show/hide options based on checkbox status
  const showOptionsStorageKey = 'showSearchOptions';
  const [isChecked, setIsChecked] = useState(() => {
    const savedState = localStorage.getItem(showOptionsStorageKey);
    return savedState !== null ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem(showOptionsStorageKey, JSON.stringify(isChecked));
  }, [isChecked, showOptionsStorageKey]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  
  const sortableColumns: Array<{ key: keyof Audit; label: string }> = [
    { key: 'name', label: 'Audit Name' },
    { key: 'progress', label: 'Progress' },
    { key: 'created', label: 'Created' },
    { key: 'lastRun', label: 'Last Run' },
  ];
  
  const limitOptions = [5, 10, 20];
  
  return (
    <>
      <input 
        type="checkbox" 
        name="toggle" 
        id="toggle_view_options"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="toggle_view_options">Show Search Options</label>
      <section id="search_options"
        aria-hidden={!isChecked}
        style={{ display: isChecked ? 'block' : 'none' }}
      >
        <h3>Search Options</h3>
        
        <form>
          {/* Name Filter */}
          <div role="group" aria-labelledby="filter-group">
            <h4 id="filter-group">Filter</h4>
            <label htmlFor="nameFilter">Audit Name: </label>
            <input
              type="text"
              id="nameFilter"
              value={localOptions.nameFilter}
              onChange={(e) => handleChange('nameFilter', e.target.value)}
              placeholder="Enter audit name..."
            />
          </div>
          
          {/* Sort Options */}
          <div role="group" aria-labelledby="sort-group">
            <h4 id="sort-group">Sort</h4>
            <div>
              {sortableColumns.map((column) => (
                <>
                  <input key={column.key}
                    type="radio"
                    id={`sort-${column.key}`}
                    name="sortBy"
                    checked={localOptions.sortBy === column.key}
                    onChange={() => handleChange('sortBy', column.key)}
                  />
                  <label htmlFor={`sort-${column.key}`}>
                    {column.label}
                  </label>
                </>
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
          
          {/* Limit Options */}
          <div role="group" aria-labelledby="limit-group">
            <h4 id="limit-group">Limit</h4>
            <label htmlFor="limit">Change Number of Audits Displayed: </label>
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
          
          {/* Apply Button */}
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
const AuditTable: React.FC = () => {
  const [selectedAudits, setSelectedAudits] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchOptions, setSearchOptions] = useState<AuditSearchOptions>({
    nameFilter: '',
    sortBy: 'created',
    sortDirection: 'desc',
    limit: 10,
  });
  
  // Using Tanstack Query with better loading state management
  const { 
    data: audits = [], 
    isLoading, 
    isFetching, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ['audits', searchOptions],
    queryFn: () => fetchAudits(searchOptions),
    placeholderData: keepPreviousData, // Keep showing the previous data while loading new data
    staleTime: 30000, // Consider data fresh for 30 seconds
  });
  
  // Only reset selections when data source actually changes (not during loading)
  useEffect(() => {
    if (!isFetching) {
      setSelectedAudits(new Set());
      setSelectAll(false);
    }
  }, [audits, isFetching]);
  
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedAudits(new Set());
    } else {
      setSelectedAudits(new Set(audits.map(audit => audit.id)));
    }
    setSelectAll(!selectAll);
  };
  
  const toggleAuditSelection = (id: string) => {
    const newSelection = new Set(selectedAudits);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedAudits(newSelection);
    setSelectAll(newSelection.size === audits.length);
  };
  
  const handleApplySearchOptions = (newOptions: AuditSearchOptions) => {
    setSearchOptions(newOptions);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  
  if (isError) {
    return <div>Error loading audits. Please try again.</div>;
  }
  
  // Show loading indicator only on initial load, not on refetch
  const showInitialLoading = isLoading && !isFetching;
  
  return (
    <>
      <h2>All Audits</h2>
      
      <SearchOptions 
        options={searchOptions} 
        onApply={handleApplySearchOptions} 
        isLoading={isFetching}
      />

      <section>
        <h3>Audits Table</h3>
        
        {/* Show loading state indicator during fetch but keep table visible */}
        {isFetching && !isLoading && (
          <div>Refreshing data...</div>
        )}
        
        <div>
          {showInitialLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <input
                id='all-audits'
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
              <label htmlFor="all-audits">Select All Audits</label>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Pages</th>
                    <th>Checks</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Last Run</th>
                  </tr>
                </thead>
                <tbody>
                  {audits.map((audit) => (
                    <tr key={audit.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedAudits.has(audit.id)}
                          onChange={() => toggleAuditSelection(audit.id)}
                        />
                      </td>
                      <td>
                        <Link 
                          to="/audits/$auditId" 
                          params={{ auditId: audit.id }}
                        >
                          {audit.name}
                        </Link>
                      </td>
                      <td>{audit.pages}</td>
                      <td>{audit.checks}</td>
                      <td>
                        <div>
                          <ProgressBar progress={audit.progress} />
                          <span>{audit.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <StatusBadge status={audit.status} />
                      </td>
                      <td>{formatDate(audit.created)}</td>
                      <td>{formatDate(audit.lastRun)}</td>
                    </tr>
                  ))}
                  {audits.length === 0 && (
                    <tr>
                      <td colSpan={8}>
                        No audits found. Try adjusting your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
        
        {selectedAudits.size > 0 && (
          <div>
            <p>
              {selectedAudits.size} {selectedAudits.size === 1 ? 'audit' : 'audits'} selected
            </p>
          </div>
        )}
      </section>
    </>
  );
};

// Main Page Component for Tanstack Router
export const AuditDashboard: React.FC = () => {
  return (
    <>
      <AuditTable />
    </>
  );
};

export default AuditDashboard;