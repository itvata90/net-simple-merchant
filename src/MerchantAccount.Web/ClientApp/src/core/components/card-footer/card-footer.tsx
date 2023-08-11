import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import { AsProp, CommonProps } from 'src/core/interfaces/components';

export interface CardFooterProps
  extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {}

const CardFooter = forwardRef(
  (
    { className, as: Component = 'div', ...otherProps }: CardFooterProps,
    ref
  ) => {
    let bsPrefix = `card-footer`;
    return (
      <Component
        {...otherProps}
        ref={ref as any}
        className={classNames(bsPrefix, className)}
      />
    );
  }
);

export default CardFooter;
