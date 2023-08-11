import classNames from 'classnames';
import { forwardRef } from 'react';
import { ButtonBaseProps } from 'src/core/interfaces/components';

export interface CloseButtonProps extends Partial<ButtonBaseProps> {
  dismiss?: 'offcanvas' | 'modal' | 'toast' | string;
}

/**
 * CloseButton component
 *
 */
const CloseButton = forwardRef(
  ({ className, dismiss, ...otherProps }: CloseButtonProps, ref) => {
    let bsPrefix = `btn-close`;

    return (
      <button
        {...otherProps}
        ref={ref as any}
        className={classNames(bsPrefix, className)}
        data-bs-dismiss={dismiss}
      />
    );
  }
);

export default CloseButton;
