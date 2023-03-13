import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import { AsProp, CommonProps } from 'src/core/interfaces/components';

export interface ModalProps extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {}

const ModalBody = forwardRef(({ className, as: Component = 'div', ...otherProps }: ModalProps, ref) => {
  let bsPrefix = 'modal-body';

  return <Component {...otherProps} className={classNames(bsPrefix, className)} ref={ref} />;
});

export default ModalBody;
