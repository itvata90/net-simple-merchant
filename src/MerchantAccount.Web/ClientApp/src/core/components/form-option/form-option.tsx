import classNames from 'classnames';
import { forwardRef } from 'react';
import { OptionBaseProps } from 'src/core/interfaces/components';

interface FormOptionProps extends Partial<OptionBaseProps> {}

/**
 * FormOption component
 *
 */
const FormOption = forwardRef(
  ({ className, children, ...otherProps }: FormOptionProps, ref: any) => {
    let bsPrefix = 'form-option';

    return (
      <option
        {...otherProps}
        ref={ref}
        className={classNames(bsPrefix, className)}
      >
        {children}
      </option>
    );
  }
);

export default FormOption;
