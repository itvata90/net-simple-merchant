import { AsProp, Color, CommonProps, ListItemBaseProps } from 'src/core/interfaces/components';
import classes from 'src/core/components/list-item/list-item.module.scss';
import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import ListItemIcon from 'src/core/components/list-item-icon/list-item-icon';
import ListItemText from 'src/core/components/list-item-text/list-item-text';

export interface ListItemProps extends Partial<ListItemBaseProps> {
  color?: Color;
  active?: boolean;
  to?: string;
  disabled?: boolean;
  secondaryAction?: ReactNode;
}

export interface ListItemIconProps extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {}

const ListItem = forwardRef(
  ({ as: Component = 'a', active, disabled, className, color, children, ...otherProps }: ListItemProps, ref) => {
    let bsPrefix = 'nav-item';
    let bsPrefixContent = 'nav-link';
    return (
      <Component
        {...otherProps}
        ref={ref as any}
        className={classNames(
          bsPrefix,
          bsPrefixContent,
          active && 'active',
          !active && color && `text-${color}`,
          active && (color ? `text-bg-${color}` : 'active'),
          disabled && 'disabled',
          classes['list-item'],
          className,
        )}
      >
        {children}
      </Component>
    );
  },
);

export default Object.assign(ListItem, { Icon: ListItemIcon, Text: ListItemText });
