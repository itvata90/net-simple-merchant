import classNames from 'classnames';
import {
  forwardRef,
  useCallback,
  useMemo,
  cloneElement,
  isValidElement,
  useRef,
  Children,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import FormOption from 'src/core/components/form-option/form-option';
import { SelectBaseProps, SelectChangeEvent } from 'src/core/interfaces/components';
import classes from 'src/core/components/form-select/form-select.module.scss';
import formNativeSelect from 'src/core/components/form-select/form-native-select';
import Dropdown from 'src/core/components/dropdown/dropdown';

interface OptionProperties extends Partial<{ [key: string]: any }> {
  label: ReactNode;
  value: any;
}
interface FormSelectProps<T> extends Partial<SelectBaseProps> {
  feedbackType?: 'is-valid' | 'is-invalid';
  options?: Array<T>;
  renderLabel?: (option: { [key: string]: any }) => ReactNode;
  renderOption?: (option: { [key: string]: any }) => ReactNode;
  renderValues?: (value: Array<T>) => ReactNode;
  renderInput?: (params: object) => ReactNode;
  defaultOpen?: true;
  isOptionEqualToValue?: (option: { [key: string]: any }, value: T) => boolean;
  native?: true;
}

/**
 * FormSelect component
 *
 */
const FormSelect = forwardRef(
  <T extends OptionProperties>(
    {
      className,
      htmlSize,
      children,
      size,
      feedbackType,
      onChange,
      value,
      multiple,
      style,
      disabled,
      options = [],
      defaultValue,
      renderLabel = (option: { [key: string]: any }) => option?.label ?? option,
      renderOption = (option: { [key: string]: any }) => option?.label ?? option,
      renderValues = (value: Array<T>) => value.map((x) => x?.label ?? x).join(', '),
      defaultOpen,
      isOptionEqualToValue = (option: { [key: string]: any }, value: T) => option?.value === value?.value,
      native,
      placeholder = 'Choose ...',
      ...otherProps
    }: FormSelectProps<T>,
    ref: any,
  ) => {
    let bsPrefix = 'form-select';
    const [show, setShow] = useState<boolean>(defaultOpen ?? false);
    const [currentValue, setCurrentValue] = useState<Array<T>>([]);
    useEffect(() => {
      setCurrentValue([(value || defaultValue) ?? []].flat());
    }, [value, defaultValue]);

    const isSelectedOption = (option: T) => {
      let newValue = value ? value : currentValue;
      return newValue.findIndex((item: T) => isOptionEqualToValue(option, item)) > -1;
    };

    const getSelected = () => {
      return options.filter((option: T) => isSelectedOption(option));
    };

    const handleSelect = (option: T) => (event: any) => {
      event.preventDefault();
      event.stopPropagation();

      let newValue = value ? value : currentValue;

      newValue = multiple
        ? isSelectedOption(option)
          ? [...newValue.filter((item: T) => !isOptionEqualToValue(option, item))]
          : [...newValue, option]
        : [option];

      !value && setCurrentValue(newValue);

      let cloneEvent = {
        ...event,
        target: { ...event.target, value: newValue },
      };
      onChange && onChange(cloneEvent);
    };

    const handleClear = (event: any) => {
      event.stopPropagation();
      setCurrentValue([]);

      let cloneEvent = {
        ...event,
        target: { ...event.target, value: [] },
      };
      onChange && onChange(cloneEvent);
    };

    // Adjust padding dropdown base on wrapper
    const wrapperRef = useRef<any>();
    const dropdownRef = useRef<any>();
    ref = wrapperRef;

    useEffect(() => {
      if (wrapperRef && dropdownRef) {
        const computed = window.getComputedStyle(wrapperRef.current).getPropertyValue('padding');
        const children = dropdownRef.current.children;
        for (let element of children) {
          element.firstChild.style.padding = computed;
        }
      }
    }, []);

    return (
      <fieldset
        style={style}
        className={classNames(
          bsPrefix,
          classes['select-wrapper'],
          size && `${bsPrefix}-${size}`,
          feedbackType,
          className,
        )}
        tabIndex={0}
        onClick={() => setShow((prev) => !prev)}
        onBlur={() => setShow(false)}
        disabled={disabled}
        ref={wrapperRef}
      >
        <select {...otherProps} className={classNames('d-none', classes['select-toggle'])} id="toggle" />
        <div className={classNames(classes['select-input-values'])} onClick={(e) => disabled && e.stopPropagation()}>
          {getSelected().length > 0 ? renderValues(getSelected()) : placeholder}
        </div>

        <Dropdown.Menu ref={dropdownRef} className={classNames(classes['select-dropdown'], show && 'show')}>
          {options?.map((option, index) => (
            <Dropdown.Item
              key={index}
              onClick={handleSelect(option)}
              containerClassName={classNames(classes['select-dropdown-item'])}
              active={isSelectedOption(option)}
            >
              {renderLabel(option)}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
        <button className={classNames(classes['select-clear-button'])} onClick={handleClear}>
          <span>&times;</span>
        </button>
      </fieldset>
    );
  },
);

export default Object.assign(FormSelect, { Native: formNativeSelect, Option: FormOption });
