import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import { AsProp, CommonProps } from 'src/core/interfaces/components';

export interface OffCanvasHeaderProps
  extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {}

const OffCanvasHeader = forwardRef(
  (
    { className, as: Component = 'div', ...otherProps }: OffCanvasHeaderProps,
    ref
  ) => {
    let bsPrefix = 'offcanvas-header';
    return (
      <Component {...otherProps} className={classNames(bsPrefix, className)} />
    );
  }
);

export default OffCanvasHeader;
