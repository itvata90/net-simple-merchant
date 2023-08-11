import classNames from 'classnames';
import { forwardRef } from 'react';
import { FormLabelBaseProps } from 'src/core/interfaces/components';

interface FormCheckLabelProps extends Partial<FormLabelBaseProps> {}

/**
 * CheckLabel component
 *
 */
const FormCheckLabel = forwardRef(
  ({ className, ...otherProps }: FormCheckLabelProps, ref) => {
    let bsPrefix = 'form-check-label';
    return (
      <label
        {...otherProps}
        ref={ref as any}
        className={classNames(bsPrefix, className)}
      />
    );
  }
);

export default FormCheckLabel;
