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
const CardSubtitle = forwardRef(({ className, variant: Component = 'h6', ...otherProps }: CardTitleProps, ref) => {
  let bsPrefix = `card-subtitle`;
  return <Component {...otherProps} ref={ref as any} className={classNames(bsPrefix, className)} />;
});
export default CardSubtitle;
