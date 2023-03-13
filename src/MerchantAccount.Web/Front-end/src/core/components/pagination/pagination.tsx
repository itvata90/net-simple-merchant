import classNames from 'classnames';
import { ElementType, ReactNode } from 'react';
import PaginationItem, { PaginationItemProps } from 'src/core/components/pagination-item/pagination-item';
import usePagination from 'src/core/components/pagination/use-pagination';
import { AsProp, Color, CommonProps, Size } from 'src/core/interfaces/components';

export interface PaginationProps extends Partial<CommonProps & AsProp> {
  children?: ReactNode;
  count?: number;
  color?: Color;
  defaultPage?: number;
  disabled?: boolean;
  size?: Size;
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
  pageItemComponent?: ElementType<PaginationItemProps>;
}

/**
 * Pagination component
 *
 */

const Pagination = ({
  className,
  as: Component = 'ul',
  count = 1,
  defaultPage = 1,
  disabled,
  color,
  siblingCount = 1,
  boundaryCount = 1,
  size,
  page,
  onChange,
  children,
  hideNext = false,
  hidePrevious = false,
  showFirst = false,
  showLast = false,
  renderEllipse = '...',
  renderNext = 'next',
  renderPrevious = 'previous',
  renderLast = 'last',
  renderFirst = 'first',
  pageItemComponent: PageItemComponent = PaginationItem,
  ...otherProps
}: PaginationProps) => {
  let bsPrefix = 'pagination';
  const { items, currentPage, handleChangePage, getPageChange, getRenderValue } = usePagination({
    count,
    page,
    onChange,
    boundaryCount,
    siblingCount,
    hidePrevious,
    hideNext,
    showFirst,
    showLast,
    renderEllipse,
    renderNext,
    renderPrevious,
    renderLast,
    renderFirst,
  });

  return (
    <Component {...otherProps} className={classNames(bsPrefix, className)}>
      {children}
      {!children && (
        <>
          {items.map((value) => (
            <PageItemComponent
              key={value}
              color={color}
              disabled={disabled || value === '...'}
              onClick={handleChangePage(getPageChange(value))}
              active={currentPage === value}
            >
              {getRenderValue(value)}
            </PageItemComponent>
          ))}
        </>
      )}
    </Component>
  );
};

export default Object.assign(Pagination, { Item: PaginationItem });
