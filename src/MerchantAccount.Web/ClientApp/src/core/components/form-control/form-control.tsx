import classNames from 'classnames';
import { forwardRef } from 'react';
import { FeedbackType, FormControlBaseProps } from 'src/core/interfaces/components';

interface FormControlProps extends Partial<FormControlBaseProps> {
  feedbackType?: FeedbackType;
}

/**
 * Control component
 *
 */
const FormControl = forwardRef(
  ({ type, size, variant, className, feedbackType, as: Component = 'input', ...otherProps }: FormControlProps, ref) => {
    let bsPrefix = 'form-control';

    return (
      <Component
        {...otherProps}
        ref={ref as any}
        className={classNames(
          variant !== 'plaintext' && bsPrefix,
          variant === 'plaintext' ? `${bsPrefix}-${'plaintext'}` : size && `${bsPrefix}-${size}`,
          feedbackType,
          className,
        )}
        type={type}
      />
    );
  },
);
export default FormControl;
