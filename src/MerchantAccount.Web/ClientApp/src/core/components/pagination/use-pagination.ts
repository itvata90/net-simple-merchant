import { useState, ReactNode, useEffect } from 'react';

interface UsePaginationParameter {
  count?: number;
  siblingCount?: number;
  boundaryCount?: number;
  page?: number;
  onChange?: (page: number) => void;
  hidePrevious?: boolean;
  hideNext?: boolean;
  showFirst?: boolean;
  showLast?: boolean;
  renderEllipse?: ReactNode;
  renderNext?: ReactNode;
  renderPrevious?: ReactNode;
  renderLast?: ReactNode;
  renderFirst?: ReactNode;
}

const usePagination = ({
  count = 1,
  page = 1,
  onChange,
  boundaryCount = 1,
  siblingCount = 1,
  hidePrevious,
  hideNext,
  showFirst,
  showLast,
  renderEllipse = '...',
  renderNext = 'next',
  renderPrevious = 'previous',
  renderLast = 'last',
  renderFirst = 'first',
}: UsePaginationParameter) => {
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  useEffect(() => {
    page !== currentPage && setCurrentPage(page);
  }, [page]);

  const handleChangePage = (newValue: number) => () => {
    setCurrentPage(newValue);
    onChange && onChange(newValue);
  };

  const startBoundaryIndex = Math.min(boundaryCount, count);
  const endBoundaryIndex = Math.max(
    count - boundaryCount + 1,
    boundaryCount + 1
  );
  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      currentPage - siblingCount, // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1
    ), // Greater than startPages
    boundaryCount + 2
  );
  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      currentPage + siblingCount, // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ), // Less than endPages
    count - endBoundaryIndex + 1 > 0 ? endBoundaryIndex - 2 : count - 1
  );

  const items = [];
  // First
  showFirst && items.push('first');
  // Previous
  !hidePrevious && items.push('previous');
  // Boundary
  for (let i = 1; i <= startBoundaryIndex; i++) {
    items.push(i);
  }
  // Ellipse
  siblingsStart > boundaryCount + 2
    ? items.push('ellipse')
    : boundaryCount * 2 < count - 1 && items.push(boundaryCount + 1);

  // Siblings
  for (let i = siblingsStart; i <= siblingsEnd; i++) {
    items.push(i);
  }
  // Ellipse
  siblingsEnd < count - boundaryCount - 1
    ? items.push('ellipse')
    : count - boundaryCount > boundaryCount &&
      items.push(count - boundaryCount);
  // Boundary
  for (let i = endBoundaryIndex; i <= count; i++) {
    items.push(i);
  }
  // Next
  !hideNext && items.push('next');
  // Last
  showLast && items.push('last');

  const getPageChange = (value: number | string) => {
    const pageChange: { [key: string]: number } = {
      previous: currentPage > 1 ? currentPage - 1 : currentPage,
      next: currentPage < count ? currentPage + 1 : currentPage,
      first: 1,
      last: count,
    };
    return typeof value === 'string' ? pageChange[value] : value;
  };
  const getRenderValue = (value: string | number): any => {
    const components: { [key: string]: ReactNode } = {
      next: renderNext,
      previous: renderPrevious,
      ellipse: renderEllipse,
      last: renderLast,
      first: renderFirst,
    };

    return components[value] ?? value;
  };

  return {
    items,
    currentPage,
    getPageChange,
    handleChangePage,
    getRenderValue,
  };
};

export default usePagination;
