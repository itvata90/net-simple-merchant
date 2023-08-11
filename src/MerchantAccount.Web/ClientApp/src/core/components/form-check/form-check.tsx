import classNames from 'classnames';
import { forwardRef, ReactNode } from 'react';
import FormCheckInput from 'src/core/components/form-check-input/form-check-input';
import FormCheckLabel from 'src/core/components/form-check-label/form-check-label';
import {
  FeedbackType,
  FormCheckBaseProps,
} from 'src/core/interfaces/components';

interface FormCheckContainerProps
  extends Partial<Omit<FormCheckBaseProps, 'type'>> {
  type?: 'checkbox' | 'radio' | 'switch';
  inline?: boolean;
  reverse?: boolean;
  label?: ReactNode;
  feedbackType?: FeedbackType;
}

/**
 * Check component: radio, checkbox and switch
 * @property {FormCheckInput} Input
 * @property {FormCheckLabel} Label
 */
const FormCheck = forwardRef(
  (
    {
      className,
      type = 'checkbox',
      children,
      inline,
      reverse,
      label,
      feedbackType,
      ...otherProps
    }: FormCheckContainerProps,
    ref
  ) => {
    let bsPrefix = 'form-check';
    let bsPrefixSwitch = 'form-switch';
    return (
      <div
        className={classNames(
          bsPrefix,
          className,
          inline && `${bsPrefix}-inline`,
          reverse && `${bsPrefix}-reverse`,
          type === 'switch' && bsPrefixSwitch
        )}
      >
        {children || (
          <>
            <FormCheckInput
              {...otherProps}
              ref={ref}
              type={type === 'switch' ? 'checkbox' : type}
              feedbackType={feedbackType}
            />
            {label && <FormCheckLabel>{label}</FormCheckLabel>}
          </>
        )}
      </div>
    );
  }
);

export default Object.assign(FormCheck, {
  Label: FormCheckLabel,
  Input: FormCheckInput,
});
