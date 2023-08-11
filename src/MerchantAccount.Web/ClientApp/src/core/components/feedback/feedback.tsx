import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import {
  AsProp,
  CommonProps,
  FeedbackType,
} from 'src/core/interfaces/components';

export interface FeedbackProps
  extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {
  tooltip?: boolean;
  type?: FeedbackType;
}

/**
 * Feedback component
 *
 */
const Feedback = forwardRef(
  (
    {
      className,
      as: Component = 'span',
      type = 'is-invalid',
      tooltip,
      ...otherProps
    }: FeedbackProps,
    ref
  ) => {
    let bsPrefix = tooltip ? 'tooltip' : 'feedback';

    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(
          type === 'is-invalid' ? `invalid-${bsPrefix}` : `valid-${bsPrefix}`,
          className
        )}
      />
    );
  }
);

export default Feedback;
