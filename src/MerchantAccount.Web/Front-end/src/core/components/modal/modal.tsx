import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { Modal as BsModal } from 'bootstrap';
import { ModalBaseProps } from 'src/core/interfaces/components';
import ModalHeader from 'src/core/components/modal-header/modal-header';
import ModalBody from 'src/core/components/modal-body/modal-body';
import ModalFooter from 'src/core/components/modal-footer/modal-footer';
import Backdrop from 'src/core/components/backdrop/backdrop';

export interface ModalProps extends Partial<ModalBaseProps> {
  size?: 'xl' | 'lg' | 'sm';
  fullscreen?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  animation?: boolean;
  centered?: boolean;
  scrollable?: boolean;
  backdrop?: boolean | 'static';
  contentClassName?: string;
  dialogClassName?: string;
  keyboard?: boolean;
  focus?: boolean;
  animationClassName?: string;
}

/**
 * Modal component
 *
 */
const Modal = ({
  className,
  as: Component = 'div',
  children,
  scrollable,
  animation,
  size,
  centered,
  fullscreen = false,
  backdrop = true,
  onClose,
  open,
  contentClassName,
  dialogClassName,
  keyboard = true,
  focus = false,
  animationClassName = 'fade',
  onClick,
  ...otherProps
}: ModalProps) => {
  let bsPrefix = 'modal';
  let bsPrefixDialog = `${bsPrefix}-dialog`;
  let bsPrefixContent = `${bsPrefix}-content`;

  const modalRef = useRef<any>();

  let modal = modalRef.current;
  let modalHeight = modal?.clientHeight;
  useEffect(() => {
    if (modal) {
      new BsModal(modal, {
        backdrop: false,
        keyboard,
        focus,
      });
    }
  }, [backdrop, modal, keyboard, focus]);

  useEffect(() => {
    let bsModal = BsModal.getInstance(modal);
    open ? bsModal?.show(modal) : bsModal?.hide();
  }, [modal, open]);

  useEffect(() => {
    if (modalHeight) {
      let bsModal = BsModal.getInstance(modal);
      bsModal?.handleUpdate();
    }
  }, [modal, modalHeight]);

  const handleClickOutSide = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    backdrop && backdrop !== 'static' && onClose && onClose();
  };
  return (
    <Backdrop open={open && backdrop === true}>
      <Component
        onClick={handleClickOutSide}
        {...otherProps}
        ref={modalRef}
        className={classNames(bsPrefix, animation && animationClassName, className, open && 'show')}
      >
        <div
          className={classNames(
            bsPrefixDialog,
            scrollable && `${bsPrefixDialog}-scrollable`,
            centered && `${bsPrefixDialog}-centered`,
            size && `${bsPrefix}-${size}`,
            fullscreen &&
              (typeof fullscreen === 'boolean'
                ? `${bsPrefix}-fullscreen`
                : `${bsPrefix}-fullscreen-${fullscreen}-down`),
            dialogClassName,
          )}
        >
          <div onClick={(e) => e.stopPropagation()} className={classNames(bsPrefixContent, contentClassName)}>
            {children}
          </div>
        </div>
      </Component>
    </Backdrop>
  );
};

export default Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
