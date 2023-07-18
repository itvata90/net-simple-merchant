import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import { AsProp, CommonProps } from 'src/core/interfaces/components';

export interface OffCanvasTitleProps extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {}

const OffCanvasTitle = forwardRef(({ className, as: Component = 'h5', ...otherProps }: OffCanvasTitleProps, ref) => {
  let bsPrefix = 'offcanvas-title';
  return <Component {...otherProps} className={classNames(bsPrefix, className)} ref={ref} />;
});

export default OffCanvasTitle;
