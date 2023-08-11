import classNames from 'classnames';
import { forwardRef } from 'react';
import InputGroupText from 'src/core/components/input-group-text/input-group-text';
import { InputGroupBaseProps } from 'src/core/interfaces/components';

export interface InputGroupProps extends Partial<InputGroupBaseProps> {}

/**
 * InputGroup component
 * @property {InputGroupText} Text
 */
const InputGroup = forwardRef(
  (
    { size, className, as: Component = 'div', ...otherProps }: InputGroupProps,
    ref
  ) => {
    let bsPrefix = 'input-group';
    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(
          bsPrefix,
          className,
          size && `${bsPrefix}-${size}`
        )}
      />
    );
  }
);

export default Object.assign(InputGroup, { Text: InputGroupText });
