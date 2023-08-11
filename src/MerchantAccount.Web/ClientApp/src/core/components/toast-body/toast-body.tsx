import classNames from 'classnames';
import { forwardRef, ReactNode } from 'react';
import { AsProp, CommonProps } from 'src/core/interfaces/components';

export interface ToastBodyProps extends Partial<CommonProps & AsProp> {
  children?: ReactNode;
}

/**
 * ToastBody component
 *
 */
const ToastBody = forwardRef(
  (
    { className, as: Component = 'div', ...otherProps }: ToastBodyProps,
    ref
  ) => {
    let bsPrefix = 'toast-body';

    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(bsPrefix, className)}
      />
    );
  }
);

export default ToastBody;
