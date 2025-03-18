import { createFileRoute } from '@tanstack/react-router'
import CheckboxTable from '../../components/CheckboxTable'
import { fetchAllAudits } from '../../api/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const Route = createFileRoute('/audits/test')({
  component: RouteComponent,
})

function RouteComponent() {

  const { 
    data: audits = [],
    isLoading, 
    isFetching, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ['audits'],
    queryFn: () => fetchAllAudits(),
    placeholderData: keepPreviousData,
    staleTime: 30000,
  });

  const [checkedBoxes, setCheckedBoxes] = useState(new Set())


  return (
    <>
      <CheckboxTable 
        itemName={ 'schnarf' } 
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'pages', label: 'Pages' },
          { key: 'checks', label: 'Checks' },
          { key: 'progress', label: 'Progress' },
          { key: 'status', label: 'Status' },
          { key: 'created', label: 'Created' },
          { key: 'lastRun', label: 'Last Run' },
        ]} 
        data={ audits } 
        onCheckedBoxesChange={ setCheckedBoxes } 
        expanded={ true } 
      />
      <div>Items selected: { checkedBoxes.size }</div>
    </>
  )
}
