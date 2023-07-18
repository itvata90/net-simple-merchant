import classNames from 'classnames';
import { forwardRef } from 'react';
import { FormLabelBaseProps } from 'src/core/interfaces/components';

interface FormLabelProps extends Partial<FormLabelBaseProps> {}

/**
 * FormLabel component
 *
 */
const FormLabel = forwardRef(({ className, ...otherProps }: FormLabelProps, ref) => {
  let bsPrefix = 'form-label';
  return <label {...otherProps} ref={ref as any} className={classNames(bsPrefix, className)} />;
});

export default FormLabel;
