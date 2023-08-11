import classNames from 'classnames';
import { forwardRef } from 'react';
import {
  FeedbackType,
  FormRangeBaseProps,
} from 'src/core/interfaces/components';

interface FormRangeProps extends Partial<FormRangeBaseProps> {
  feedbackType?: FeedbackType;
}

/**
 * FormRange component
 *
 */
const FormRange = forwardRef(
  (
    { className, size, feedbackType, ...otherProps }: FormRangeProps,
    ref: any
  ) => {
    let bsPrefix = 'form-range';
    return (
      <input
        {...otherProps}
        ref={ref}
        type="range"
        className={classNames(
          bsPrefix,
          className,
          size && `${bsPrefix}-${size}`,
          feedbackType
        )}
      />
    );
  }
);

export default FormRange;
