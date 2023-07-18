import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import { AsProp, CommonProps } from 'src/core/interfaces/components';

export interface CardBodyProps extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {}

/**
 * CardBody component
 *
 */
const CardBody = forwardRef(({ className, as: Component = 'div', ...otherProps }: CardBodyProps, ref) => {
  let bsPrefix = `card-body`;

  return <Component {...otherProps} ref={ref as any} className={classNames(bsPrefix, className)} />;
});

export default CardBody;
