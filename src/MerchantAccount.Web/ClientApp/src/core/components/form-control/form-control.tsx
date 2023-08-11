import classNames from 'classnames';
import { forwardRef, useEffect, useRef, useState, memo } from 'react';
import {
  FeedbackType,
  FormControlBaseProps,
} from 'src/core/interfaces/components';

interface FormControlProps extends Partial<FormControlBaseProps> {
  feedbackType?: FeedbackType;
}

/**
 * Control component
 *
 */
const FormControl = memo(
  forwardRef(
    (
      {
        type,
        size,
        variant,
        className,
        feedbackType,
        as: Component = 'input',
        onInput,
        defaultValue,
        ...otherProps
      }: FormControlProps,
      ref
    ) => {
      let bsPrefix = 'form-control';

      return (
        <Component
          {...otherProps}
          ref={ref as any}
          className={classNames(
            variant !== 'plaintext' && bsPrefix,
            variant === 'plaintext'
              ? `${bsPrefix}-${'plaintext'}`
              : size && `${bsPrefix}-${size}`,
            feedbackType,
            className
          )}
          defaultValue={defaultValue}
          onInput={onInput}
          type={type}
        />
      );
    }
  )
);
export default FormControl;
