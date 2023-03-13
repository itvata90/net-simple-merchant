import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import { AsProp, CommonProps } from 'src/core/interfaces/components';

export interface CardHeaderProps extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {}

/**
 * CardHeader component
 *
 */
const CardHeader = forwardRef(({ className, as: Component = 'div', ...otherProps }: CardHeaderProps, ref) => {
  let bsPrefix = `card-header`;
  return <Component {...otherProps} ref={ref as any} className={classNames(bsPrefix, className)} />;
});

export default CardHeader;
