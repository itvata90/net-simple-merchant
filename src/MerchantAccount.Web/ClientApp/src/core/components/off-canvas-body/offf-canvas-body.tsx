import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import { AsProp, CommonProps } from 'src/core/interfaces/components';

export interface OffCanvasBodyProps
  extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {}

const OffCanvasBody = forwardRef(
  (
    { className, as: Component = 'div', ...otherProps }: OffCanvasBodyProps,
    ref
  ) => {
    let bsPrefix = 'offcanvas-body';
    return (
      <Component {...otherProps} className={classNames(bsPrefix, className)} />
    );
  }
);

export default OffCanvasBody;
