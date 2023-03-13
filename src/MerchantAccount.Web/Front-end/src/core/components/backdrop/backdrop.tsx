import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { AsProp, CommonProps } from 'src/core/interfaces/components';

export interface BackdropProps extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {
  open?: boolean;
  animationClassName?: string;
  onClose?: Function;
}

const Backdrop = ({
  open,
  className,
  as: Component = 'div',
  children,
  animationClassName = 'fade',
  ...otherProps
}: BackdropProps) => {
  const bsPrefix = 'modal-backdrop';

  return (
    <>
      {open && (
        <Component
          {...otherProps}
          data-testid="backdrop"
          className={classNames(bsPrefix, open && 'show', animationClassName, className)}
        ></Component>
      )}
      {children}
    </>
  );
};

export default Backdrop;
