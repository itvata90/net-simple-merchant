import classNames from 'classnames';
import { forwardRef } from 'react';
import { HeadingBaseProps } from 'src/core/interfaces/components';
export interface AlertHeadingProps extends Partial<HeadingBaseProps> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const AlertHeading = forwardRef(({ className, variant: Component = 'h4', ...otherProps }: AlertHeadingProps, ref) => {
  let bsPrefix = 'alert-heading';
  return <Component {...otherProps} ref={ref as any} className={classNames(bsPrefix, className)} />;
});

export default AlertHeading;
