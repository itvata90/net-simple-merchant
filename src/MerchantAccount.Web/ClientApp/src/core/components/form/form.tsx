import classNames from 'classnames';
import { forwardRef } from 'react';
import Feedback from 'src/core/components/feedback/feedback';
import formCheck from 'src/core/components/form-check/form-check';
import FormControl from 'src/core/components/form-control/form-control';
import FormGroup from 'src/core/components/form-group/form-group';
import FormLabel from 'src/core/components/form-label/form-label';
import FormRange from 'src/core/components/form-range/form-range';
import FormSelect from 'src/core/components/form-select/form-select';
import { FormBaseProps } from 'src/core/interfaces/components';

interface FormProps extends Partial<FormBaseProps> {}

/**
 * Form component
 * @property {FormControl} Control
 * @property {FormGroup} Group
 * @property {FormCheck} Check
 * @property {FormSelect} Select
 * @property {FormRange} Range
 */
const Form = forwardRef(
  (
    {
      className,
      as: Component = 'form',
      validated,
      onSubmit,
      ...otherProps
    }: FormProps,
    ref
  ) => {
    let bsPrefix = 'form';
    return (
      <Component
        {...otherProps}
        onSubmit={onSubmit}
        ref={ref}
        className={classNames(
          bsPrefix,
          validated && `was-validated`,
          className
        )}
      />
    );
  }
);

export default Object.assign(Form, {
  Control: FormControl,
  Check: formCheck,
  Group: FormGroup,
  Label: FormLabel,
  Select: FormSelect,
  Range: FormRange,
  Feedback: Feedback,
});
