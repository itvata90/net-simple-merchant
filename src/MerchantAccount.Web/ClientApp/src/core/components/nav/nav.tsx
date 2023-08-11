import classNames from 'classnames';
import { forwardRef } from 'react';
import {
  AlignOptions,
  Breakpoints,
  JustifyOptions,
  NavBaseProps,
} from 'src/core/interfaces/components';

import classes from './nav.module.scss';
import NavLink from 'src/core/components/nav-link/nav-link';
import NavItem from 'src/core/components/nav-item/nav-item';
import { createBreakpointsClassName } from 'src/core/functions/create-breakpoints-class-name';

export interface NavProps extends Partial<NavBaseProps> {
  justifyContent?: JustifyOptions & Partial<Breakpoints<JustifyOptions>>;
  alignItems?: AlignOptions | Partial<Breakpoints<AlignOptions>>;
  orientation?: 'vertical' | 'horizontal';
  variant?: 'standard' | 'tabs' | 'pills';
  fill?: boolean;
  justified?: boolean;
  scrollable?: boolean;
  navbar?: boolean;
}

/**
 * Nav component
 *
 */
const Nav = forwardRef(
  (
    {
      className,
      justifyContent,
      alignItems,
      as: Component = 'div',
      orientation = 'horizontal',
      variant,
      justified,
      fill,
      scrollable,
      navbar,
      ...otherProps
    }: NavProps,
    ref
  ) => {
    let bsPrefix = 'nav';
    let justifyContentClassName = createBreakpointsClassName(
      'justify-content',
      justifyContent
    );

    let alignItemsClassName = createBreakpointsClassName(
      'align-items',
      alignItems
    );
    const variantClassName = {
      tabs: 'nav-tabs',
      pills: 'nav-pills',
      standard: '',
    };
    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(
          bsPrefix,
          orientation === 'vertical' ? 'flex-column' : 'flex-row',
          variant && variantClassName[variant],
          justifyContent && justifyContentClassName,
          alignItems && alignItemsClassName,
          justified && 'nav-justified',
          fill && 'nav-fill',
          scrollable && `flex-nowrap overflow-auto`,
          navbar && 'navbar-nav',
          className
        )}
      />
    );
  }
);

export default Object.assign(Nav, { Link: NavLink, Item: NavItem });
