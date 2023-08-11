import classNames from 'classnames';
import { forwardRef } from 'react';
import { FormGroupBaseProps } from 'src/core/interfaces/components';

export interface FormGroupProps extends Partial<FormGroupBaseProps> {}

/**
 * FormGroup component
 *
 */
const FormGroup = forwardRef(
  (
    { size, className, as: Component = 'div', ...otherProps }: FormGroupProps,
    ref
  ) => {
    let bsPrefix = 'form-group';
    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(
          bsPrefix,
          size && `${bsPrefix}-${size}`,
          className
        )}
      />
    );
  }
);

export default FormGroup;
