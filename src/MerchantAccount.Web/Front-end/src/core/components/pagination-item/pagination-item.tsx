import classNames from 'classnames';
import { forwardRef, ReactNode } from 'react';
import { AsProp, ListItemBaseProps } from 'src/core/interfaces/components';

export interface PaginationItemProps extends Partial<ListItemBaseProps & AsProp> {
  children?: ReactNode;
  disabled?: boolean;
  active?: boolean;
}

/**
 * PaginationItem component
 *
 */
const PaginationItem = forwardRef(
  (
    { className, as: Component = 'li', disabled, active, children, color, onClick, ...otherProps }: PaginationItemProps,
    ref,
  ) => {
    let bsPrefix = 'page-item';
    let bsLinkPrefix = 'page-link';
    return (
      <Component {...otherProps} className={classNames(bsPrefix, className)} ref={ref}>
        <button
          className={classNames(
            bsLinkPrefix,
            !active && color && `text-${color}`,
            active && (color ? `text-bg-${color}` : 'active'),
            disabled && 'disabled',
          )}
          onClick={(e: any) => onClick && onClick(e)}
          disabled={disabled}
        >
          {children}
        </button>
      </Component>
    );
  },
);

export default PaginationItem;
