import classNames from 'classnames';
import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { createBreakpointsClassName } from 'src/core/functions/create_breakpoints_class_name';
import { AlignOptions, Breakpoints, Either, GridBaseProps, JustifyOptions } from 'src/core/interfaces/components';

interface RowProps {
  row: boolean;
  // column?: boolean;
}

interface ColumnProps {
  column: boolean;
  // row?: boolean;
}

export type GridProps = Either<RowProps, ColumnProps> &
  Partial<GridBaseProps> & {
    justifyContent: JustifyOptions & Partial<Breakpoints<JustifyOptions>>;
    alignSelf: AlignOptions | Partial<Breakpoints<AlignOptions>>;
    alignItems: AlignOptions | Partial<Breakpoints<AlignOptions>>;
    order: number | Partial<Breakpoints<number>>;
    offset: number | Partial<Breakpoints<number>>;
    spacing: number | Partial<Breakpoints<number>>;
    rowSpacing: number | Partial<Breakpoints<number>>;
    columnSpacing: number | Partial<Breakpoints<number>>;
  };

/**
 * Grid component
 *
 */
const Grid = forwardRef(
  (
    {
      className,
      as: Component = 'div',
      direction = 'row',
      container,
      item,
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      children,
      column,
      row,
      justifyContent,
      alignItems,
      alignSelf,
      order,
      offset,
      spacing,
      rowSpacing,
      columnSpacing,
      ...otherProps
    }: Partial<GridProps>,
    ref,
  ) => {
    let bsPrefix = column ? 'col' : 'row';
    const childrenWithCustomProps = Children.map(children, (child) => {
      // Checking isValidElement is the safe way and avoids a typescript
      if (isValidElement(child) && child.type === Grid) {
        const { childRow, childColumn, ...others } = child?.props;
        if (childRow || childColumn) {
          return child;
        }

        let itemProps = row ? { column: true } : { row: true };
        // Set handler props for child component

        return cloneElement(child, {
          ...others,
          ...itemProps,
        });
      }
      return child;
    });
    let widthClassName = createBreakpointsClassName(bsPrefix, {
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
    });
    let justifyContentClassName = createBreakpointsClassName('justify-content', justifyContent);

    let alignItemsClassName = createBreakpointsClassName('align-items', alignItems);

    let alignSelfClassName = createBreakpointsClassName('align-self', alignSelf);

    let orderClassName = createBreakpointsClassName('order', order);
    let offsetClassName = createBreakpointsClassName('offset', offset);
    let spacingClassName = createBreakpointsClassName('g', spacing);
    let rowSpacingClassName = createBreakpointsClassName('gx', rowSpacing);
    let columnSpacingClassName = createBreakpointsClassName('gy', columnSpacing);

    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(
          bsPrefix,
          widthClassName,
          justifyContent && justifyContentClassName,
          alignItems && alignItemsClassName,
          alignSelf && alignSelfClassName,
          order && orderClassName,
          offset && offsetClassName,
          spacing && spacingClassName,
          rowSpacing && rowSpacingClassName,
          columnSpacing && columnSpacingClassName,
          className,
        )}
        children={childrenWithCustomProps}
      />
    );
  },
);

export default Grid;
