import { useEffect, useRef, useState } from 'react';

const useTableHeight = (numberOfRows: number) => {
  const [tableRowHeight, setTableRowHeight] = useState(0);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const tableHeadHeight = tableRef?.current?.children[0].clientHeight ?? 0;
  useEffect(() => {
    let observer: ResizeObserver;
    if (tableRef.current) {
      observer = new ResizeObserver((entries) => {
        // Update the state with the new size data
        const tableHeight = tableRef?.current?.clientHeight;

        if (tableHeight && tableHeadHeight && !tableRowHeight) {
          const tableCellHeight =
            (tableHeight - tableHeadHeight) / numberOfRows;
          tableRowHeight === 0 && setTableRowHeight(tableCellHeight);
          observer.disconnect();
        }
      });

      observer.observe(tableRef.current!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfRows]);

  return { tableRef, tableRowHeight, tableHeadHeight };
};

export default useTableHeight;
