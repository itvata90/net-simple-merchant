import { AsProp, CommonProps } from 'src/core/interfaces/components';
import classes from 'src/core/components/list-item-text/list-item-text.module.scss';
import { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

export interface ListItemTextProps
  extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {
  primary?: ReactNode;
  secondary?: ReactNode;
  disableMargin?: boolean;
}

const ListItemText = ({
  as: Component = 'div',
  className,
  primary,
  secondary,
  children,
  disableMargin = false,
  ...otherProps
}: ListItemTextProps) => {
  return (
    <Component
      {...otherProps}
      className={classNames(
        classes['list-item-text'],
        !disableMargin && 'ms-3',
        className
      )}
    >
      <div className={classNames(classes['list-item-primary'])}>
        {primary || children}
      </div>
      {secondary && (
        <div className={classNames(classes['list-item-secondary'])}>
          {secondary}
        </div>
      )}
    </Component>
  );
};

export default ListItemText;
