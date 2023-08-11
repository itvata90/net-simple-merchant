import classNames from 'classnames';
import { forwardRef } from 'react';
import { createBreakpointsClassName } from 'src/core/functions/create-breakpoints-class-name';
import {
  AlignOptions,
  Breakpoints,
  JustifyOptions,
  StackBaseProps,
} from 'src/core/interfaces/components';

export interface StackProps extends Partial<StackBaseProps> {
  spacing?: number | Partial<Breakpoints<number>>;
  justifyContent?: JustifyOptions & Partial<Breakpoints<JustifyOptions>>;
  alignItems?: AlignOptions | Partial<Breakpoints<AlignOptions>>;
}

/**
 * Stack component
 *
 */
const Stack = forwardRef(
  (
    {
      className,
      as: Component = 'div',
      justifyContent,
      alignItems,
      spacing,
      direction = 'column',
      ...otherProps
    }: StackProps,
    ref
  ) => {
    let bsPrefix = direction === 'column' ? 'vstack' : 'hstack';
    let justifyContentClassName = createBreakpointsClassName(
      'justify-content',
      justifyContent
    );

    let alignItemsClassName = createBreakpointsClassName(
      'align-items',
      alignItems
    );

    let spacingClassName = createBreakpointsClassName('gap', spacing);

    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(
          bsPrefix,
          justifyContent && justifyContentClassName,
          alignItems && alignItemsClassName,
          spacing && spacingClassName,
          className
        )}
      />
    );
  }
);

export default Stack;
