import classNames from 'classnames';
import { forwardRef } from 'react';
import { HeadingBaseProps } from 'src/core/interfaces/components';

export interface CardTitleProps extends Partial<HeadingBaseProps> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * CardTitle component
 *
 */
const CardTitle = forwardRef(({ className, variant: Component = 'h5', ...otherProps }: CardTitleProps, ref) => {
  let bsPrefix = `card-title`;
  return <Component {...otherProps} ref={ref as any} className={classNames(bsPrefix, className)} />;
});

export default CardTitle;
