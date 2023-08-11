import classNames from 'classnames';
import { forwardRef, ReactNode, useEffect, useRef, cloneElement } from 'react';
import {
  AsProp,
  Color,
  CommonProps,
  Placement,
} from 'src/core/interfaces/components';
import { Tooltip as BsTooltip } from 'bootstrap';

export interface TooltipProps extends Partial<CommonProps & AsProp> {
  animation?: boolean;
  color?: Color;
  delay?: number;
  open?: boolean;
  onClose?: Function;
  placement?:
    | 'auto'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | (() => any)
    | undefined;
  children?: ReactNode;
  offset?: string;
  trigger?:
    | 'click'
    | 'hover'
    | 'focus'
    | 'manual'
    | 'click hover'
    | 'click focus'
    | 'hover focus'
    | 'click hover focus'
    | undefined;
  boundary?: any;
  container?: string | false | Element | undefined;
  text?:
    | string
    | Element
    | JQuery
    | ((this: HTMLElement) => string | Element | JQuery)
    | undefined;
}

/**
 * Tooltip component
 *
 */
const Tooltip = forwardRef(
  (
    {
      className = '',
      delay = 0,
      animation = false,
      color,
      open,
      onClose,
      placement = 'top',
      as: Component = 'div',
      offset = '0 0',
      trigger = 'hover focus',
      boundary = 'scrollParent',
      container = false,
      children = '',
      text,
      ...otherProps
    }: TooltipProps,
    ref
  ) => {
    const childRef = useRef(undefined as unknown as Element);
    useEffect(() => {
      let children = childRef.current;

      let bsTooltip = new BsTooltip(children, {
        delay,
        placement,
        offset,
        trigger,
        customClass: className,
        animation,
        boundary,
        container,
        title: text,
      });
      open && bsTooltip.show();
      return () => bsTooltip.dispose();
    }, [
      animation,
      boundary,
      className,
      container,
      delay,
      offset,
      open,
      placement,
      text,
      trigger,
    ]);

    return cloneElement(children as JSX.Element, { ref: childRef });
  }
);

export default Tooltip;
