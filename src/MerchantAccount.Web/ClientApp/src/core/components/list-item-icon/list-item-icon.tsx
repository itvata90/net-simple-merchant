import { AsProp, CommonProps } from 'src/core/interfaces/components';
import classes from 'src/core/components/list-item-icon/list-item-icon.module.scss';
import { HTMLAttributes } from 'react';
import classNames from 'classnames';

export interface ListItemIconProps extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {
  disableMargin?: boolean;
}
const ListItemIcon = ({
  as: Component = 'div',
  className,
  disableMargin = false,
  children,
  ...otherProps
}: ListItemIconProps) => {
  return (
    <Component {...otherProps} className={classNames(classes['list-item-icon'], !disableMargin && 'me-3', className)}>
      {children}
    </Component>
  );
};

export default ListItemIcon;
