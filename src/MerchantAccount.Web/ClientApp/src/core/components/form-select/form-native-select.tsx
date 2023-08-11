import classNames from 'classnames';
import {
  forwardRef,
  useCallback,
  useMemo,
  cloneElement,
  isValidElement,
  useRef,
  Children,
} from 'react';
import FormOption from 'src/core/components/form-option/form-option';
import {
  SelectBaseProps,
  SelectChangeEvent,
} from 'src/core/interfaces/components';

interface FormSelectProps extends Partial<SelectBaseProps> {
  feedbackType?: 'is-valid' | 'is-invalid';
}

/**
 * FormNativeSelect component
 *
 */
const FormNativeSelect = forwardRef(
  (
    {
      className,
      htmlSize,
      children,
      size,
      feedbackType,
      onChange,
      value,
      defaultValue,
      ...otherProps
    }: FormSelectProps,
    ref: any
  ) => {
    let bsPrefix = 'form-select';

    const childrenMapping = useRef<any[]>([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const childrenCustomProps = useMemo(
      () =>
        Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            const { value, ...others } = child?.props;
            childrenMapping.current = [...childrenMapping?.current, value];
            return cloneElement(child, {
              ...others,
              value: index,
            });
          }
          return child;
        }),
      [children]
    );

    const handleChange = useCallback(
      (event: SelectChangeEvent) => {
        let indexValue: number = Number(event?.target?.value) || 0;

        let mapArray = childrenMapping?.current;
        let newValue = '';
        if (mapArray) {
          newValue = mapArray[indexValue];
        }
        let cloneEvent = {
          ...event,
          target: { ...event.target, value: newValue },
        };
        return onChange && onChange(cloneEvent);
      },
      [onChange]
    );

    const parseValue = (value: any) => {
      const index = childrenMapping?.current.indexOf(value);
      return index === -1 ? undefined : index;
    };
    return (
      <select
        {...otherProps}
        onChange={handleChange}
        value={value && parseValue(value)}
        defaultValue={defaultValue && parseValue(defaultValue)}
        ref={ref}
        className={classNames(
          bsPrefix,
          className,
          size && `${bsPrefix}-${size}`,
          feedbackType
        )}
        size={htmlSize}
      >
        {childrenCustomProps}
      </select>
    );
  }
);

export default Object.assign(FormNativeSelect, { Option: FormOption });
