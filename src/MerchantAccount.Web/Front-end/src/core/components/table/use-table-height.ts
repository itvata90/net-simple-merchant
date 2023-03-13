import { LegacyRef, Ref, RefObject, useEffect, useRef, useState } from 'react';

const useTableHeight = (numberOfRows: number) => {
  const [tableRowHeight, setTableRowHeight] = useState(55);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const tableHeadHeight = tableRef?.current?.children[0].clientHeight ?? 0;
  useEffect(() => {
    const tableHeight = tableRef?.current?.clientHeight;

    if (tableHeight && tableHeadHeight && !tableRowHeight) {
      const tableCellHeight = (tableHeight - tableHeadHeight) / numberOfRows;
      setTableRowHeight(tableCellHeight);
    }
  }, [numberOfRows]);

  return { tableRef, tableRowHeight, tableHeadHeight };
};

export default useTableHeight;
