import classNames from 'classnames';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { AsProp, Breakpoints, CommonProps } from 'src/core/interfaces/components';
import { Offcanvas as BsOffCanvas } from 'bootstrap';
import OffCanvasHeader from 'src/core/components/off-canvas-header/offf-canvas-header';
import OffCanvasBody from 'src/core/components/off-canvas-body/offf-canvas-body';
import OffCanvasTitle from 'src/core/components/off-canvas-title/offf-canvas-title';

export interface OffCanvasProps extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {
  show?: boolean;
  bodyScroll?: boolean;
  backdrop?: boolean | 'static';
  onClose?: () => void;
  keyboard?: boolean;
  placement?: 'top' | 'bottom' | 'start' | 'end';
  responsive?: keyof Breakpoints<string>;
}

/**
 * Offcanvas component
 *
 */
const OffCanvas = ({
  className,
  as: Component = 'div',
  show,
  onClose,
  bodyScroll = false,
  keyboard = true,
  backdrop = true,
  tabIndex = -1,
  placement = 'start',
  responsive,
  ...otherProps
}: OffCanvasProps) => {
  let bsPrefix = 'offcanvas';

  const offCanvasRef = useRef<any>();

  let offCanvas = offCanvasRef.current;

  useEffect(() => {
    if (offCanvas) {
      if (show) {
        let bsOffCanvas = new BsOffCanvas(offCanvas, {
          keyboard: keyboard,
          scroll: bodyScroll,
        });
        bsOffCanvas.show(offCanvas);
      }
      if (!show) {
        let bsOffCanvas = BsOffCanvas.getInstance(offCanvas);
        bsOffCanvas?.hide();
      }
      offCanvas.addEventListener('hidden.bs.offcanvas', () => {
        onClose && onClose();
      });
      return () => {
        let bsOffCanvas = BsOffCanvas.getInstance(offCanvas);
        bsOffCanvas?.hide();
        offCanvas.removeEventListener('hidden.bs.offcanvas', () => {
          onClose && onClose();
        });
      };
    }
  }, [show, onClose, backdrop, offCanvas, keyboard, bodyScroll]);

  return (
    <Component
      {...otherProps}
      ref={offCanvasRef}
      tabIndex={tabIndex}
      className={classNames(bsPrefix, `${bsPrefix}-${placement}`, responsive && `${bsPrefix}-${responsive}`, className)}
      data-bs-backdrop={backdrop}
      data-bs-toggle={show}
    />
  );
};

export default Object.assign(OffCanvas, { Header: OffCanvasHeader, Body: OffCanvasBody, Title: OffCanvasTitle });
