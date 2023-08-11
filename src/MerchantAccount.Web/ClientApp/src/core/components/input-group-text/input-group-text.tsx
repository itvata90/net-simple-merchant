import classNames from 'classnames';
import { forwardRef } from 'react';
import {
  AsProp,
  CommonProps,
  ParagraphBaseProps,
} from 'src/core/interfaces/components';

export interface InputGroupTextProps
  extends Partial<CommonProps & ParagraphBaseProps & AsProp> {}

/**
 * InputGroupText component
 */
export const InputGroupText = forwardRef(
  (
    { className, as: Component = 'span', ...otherProps }: InputGroupTextProps,
    ref
  ) => {
    let bsPrefix = 'input-group-text';
    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(bsPrefix, className)}
      />
    );
  }
);

export default InputGroupText;
