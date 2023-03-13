import classNames from 'classnames';
import { forwardRef, ReactNode, useEffect, useRef } from 'react';
import { AsProp, Color, CommonProps, Placement } from 'src/core/interfaces/components';
import { Toast as BsToast } from 'bootstrap';
import ToastBody from 'src/core/components/toast-body/toast-body';
import ToastHeader from 'src/core/components/toast-header/toast-header';

export interface ToastProps extends Partial<CommonProps & AsProp> {
  animation?: boolean;
  color?: Color;
  delay?: number;
  open?: boolean;
  autoHide?: boolean;
  onClose?: Function;
  placement?: Placement;
  containerClassName?: string;
  children?: ReactNode;
}

/**
 * Toast component
 *
 */
const Toast = forwardRef(
  (
    {
      className,
      containerClassName,
      delay = 5000,
      animation = false,
      color,
      open,
      autoHide = false,
      onClose,
      placement,
      as: Component = 'div',
      ...otherProps
    }: ToastProps,
    ref,
  ) => {
    let bsPrefix = 'toast';
    let bsPrefixContainer = 'toast-container';
    const toastRef = useRef<Element>(undefined as unknown as any);

    useEffect(() => {
      let toast = toastRef.current;
      if (toast) {
        let bsToast = new BsToast(toast, {
          animation: animation,
          autohide: autoHide,
          delay: delay,
        });
        open && bsToast.show();
        toast.addEventListener('hidden.bs.toast', () => {
          onClose && onClose();
        });
      }
    }, [open, delay, animation, autoHide, onClose]);

    const placementCases = {
      center: 'start-50 translate-middle-x',
      left: 'start-0',
      right: 'end-0',
      middle: 'top-50 translate-middle-y',
      top: 'top-0',
      bottom: 'bottom-0',
    };

    return (
      <Component
        className={classNames(
          bsPrefixContainer,
          placement && placementCases[placement.vertical] + ' ' + placementCases[placement.horizontal],
          containerClassName,
        )}
        ref={ref}
      >
        <Component
          {...otherProps}
          ref={toastRef}
          className={classNames(bsPrefix, color && `text-bg-${color}`, className)}
        />
      </Component>
    );
  },
);

export default Object.assign(Toast, { Body: ToastBody, Header: ToastHeader });
