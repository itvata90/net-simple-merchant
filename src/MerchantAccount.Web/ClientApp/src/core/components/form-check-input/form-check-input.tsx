import classNames from 'classnames';
import { forwardRef } from 'react';
import {
  FeedbackType,
  FormCheckBaseProps,
} from 'src/core/interfaces/components';

interface FormCheckProps extends Partial<FormCheckBaseProps> {
  feedbackType?: FeedbackType;
}

/**
 * CheckInput component
 *
 */
const FormCheckInput = forwardRef(
  (
    {
      className,
      size,
      feedbackType,
      type = 'checkbox',
      ...otherProps
    }: FormCheckProps,
    ref
  ) => {
    let bsPrefix = 'form-check-input';
    return (
      <input
        {...otherProps}
        ref={ref as any}
        className={classNames(bsPrefix, feedbackType, className)}
        type={type}
      />
    );
  }
);

export default FormCheckInput;
