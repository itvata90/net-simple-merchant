import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import { AsProp, CommonProps } from 'src/core/interfaces/components';

export interface ModalProps
  extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {
  divider?: boolean;
}

const ModalFooter = forwardRef(
  (
    {
      className,
      as: Component = 'div',
      divider = false,
      ...otherProps
    }: ModalProps,
    ref
  ) => {
    let bsPrefix = 'modal-footer';

    return (
      <Component
        {...otherProps}
        className={classNames(bsPrefix, !divider && 'border-top-0', className)}
        ref={ref}
      />
    );
  }
);

export default ModalFooter;
