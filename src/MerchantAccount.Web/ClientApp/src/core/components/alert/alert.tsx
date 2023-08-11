import classNames from 'classnames';
import { forwardRef } from 'react';
import AlertHeading from 'src/core/components/alert-heading/alert-heading';
import AlertLink from 'src/core/components/alert-link/alert-link';
import { AlertBaseProps } from 'src/core/interfaces/components';

export interface AlertProps extends Partial<AlertBaseProps> {}

const Alert = forwardRef(
  (
    { className, as: Component = 'div', color, ...otherProps }: AlertProps,
    ref
  ) => {
    let bsPrefix = `alert`;
    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(
          bsPrefix,
          color && `${bsPrefix}-${color}`,
          className
        )}
      />
    );
  }
);

export default Object.assign(Alert, {
  Link: AlertLink,
  Heading: AlertHeading,
});
