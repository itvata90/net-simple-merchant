import classNames from 'classnames';
import {
  forwardRef,
  useRef,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from 'react';
import FormOption from 'src/core/components/form-option/form-option';
import { SelectBaseProps } from 'src/core/interfaces/components';
import classes from 'src/core/components/form-select/form-select.module.scss';
import formNativeSelect from 'src/core/components/form-select/form-native-select';
import Dropdown from 'src/core/components/dropdown/dropdown';
import 'src/core/styles/select.scss';
import { useOutsideClick } from 'src/core/hooks/use-outside-click';
import useEffectOnce from 'src/core/hooks/use-effect-one';
import { deepEquals } from 'src/core/functions/deep-equals';
export interface OptionProperties extends Partial<{ [key: string]: any }> {
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
  autoClose?: boolean | 'inside' | 'outside';
  hideClearButton?: boolean;
  menuMaxHeight?: number | string;
  onSearch?: (keyword: string) => void;
}

/**
 * FormSelect component
 *
 */
const FormSelect = memo(
  forwardRef(
    <T extends OptionProperties>(
      {
        className,
        htmlSize,
        children,
        size,
        feedbackType,
        onChange,
        onInput,
        value,
        multiple,
        style,
        disabled,
        options = [],
        defaultValue,
        renderLabel = (option: { [key: string]: any }) =>
          option?.label ?? option,
        renderOption = (option: { [key: string]: any }) =>
          option?.label ?? option,
        renderValues = (value: Array<T>) =>
          value.map((x) => x?.label ?? x).join(', '),
        defaultOpen,
        isOptionEqualToValue = (option: { [key: string]: any }, value: T) =>
          option?.value === value?.value,
        native,
        placeholder = 'Choose ...',
        autoClose,
        hideClearButton,
        menuMaxHeight,
        onSearch,
        ...otherProps
      }: FormSelectProps<T>,
      ref: any
    ) => {
      let bsPrefix = 'form-select';
      const [show, setShow] = useState<boolean>(defaultOpen ?? false);
      const [keyword, setKeyword] = useState<string>('');
      const flatValue = useMemo(
        () => [(value || defaultValue) ?? []].flat(),
        [value, defaultValue]
      );
      const flatDefaultValue = useMemo(
        () => [defaultValue ?? []].flat(),
        [defaultValue]
      );
      const [currentValue, setCurrentValue] = useState<Array<T>>(flatValue);

      const isSelectedOption = (option: T) => {
        let newValue = value ? value : currentValue;
        return (
          newValue.findIndex((item: T) => isOptionEqualToValue(option, item)) >
          -1
        );
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
            ? [
                ...newValue.filter(
                  (item: T) => !isOptionEqualToValue(option, item)
                ),
              ]
            : [...newValue, option]
          : [option];

        !value && setCurrentValue(newValue);

        let cloneEvent = {
          ...event,
          target: { ...event.target, value: newValue },
        };
        (autoClose === true || autoClose === 'inside') && setShow(false);
        onChange && onChange(cloneEvent);
        onInput && onInput(cloneEvent);
      };

      const handleClear = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        setCurrentValue([]);

        let cloneEvent = {
          ...event,
          target: { ...event.target, value: [] },
        };
        onChange && onChange(cloneEvent);
        onInput && onInput(cloneEvent);
      };

      // Adjust padding dropdown base on wrapper
      const wrapperRef = useRef<any>();
      const dropdownRef = useRef<any>();
      const inputRef = useRef<any>();
      ref = wrapperRef;

      useEffect(() => {
        if (wrapperRef && dropdownRef) {
          const computed = window
            .getComputedStyle(wrapperRef.current)
            .getPropertyValue('padding');
          const children = dropdownRef.current.children;
          for (let element of children) {
            element.firstChild.style.padding = computed;
          }
        }
      }, []);

      useOutsideClick(wrapperRef, () => {
        setShow(false);
      });

      const filterOptions = onSearch
        ? options
        : options.filter(
            (option) =>
              option.label
                ?.toString()
                .toLowerCase()
                .includes(keyword.toLowerCase()) ||
              JSON.stringify(option.value)
                .toLowerCase()
                .includes(keyword.toLowerCase())
          );

      const reset = () => {
        setCurrentValue(flatDefaultValue);
      };

      useEffect(() => {
        const formRef = inputRef.current?.closest('form');
        formRef?.addEventListener('reset', reset);

        return () => {
          formRef?.removeEventListener('reset', reset);
        };
      }, []);

      return (
        <fieldset
          style={style}
          className={classNames(
            bsPrefix,
            'bs-select',
            classes['select-wrapper'],
            size && `${bsPrefix}-${size}`,
            feedbackType,
            className
          )}
          tabIndex={0}
          onClick={() => {
            inputRef.current?.focus();
            setShow((prev) => !prev);
          }}
          disabled={disabled}
          ref={wrapperRef}
        >
          <select
            {...otherProps}
            className={classNames('d-none', classes['select-toggle'])}
            id="toggle"
          />
          <div
            className={classNames(classes['select-input-values'])}
            onClick={(e) => disabled && e.stopPropagation()}
          >
            {getSelected().length > 0 ? (
              renderValues(getSelected())
            ) : show || !!inputRef?.current?.value ? (
              ''
            ) : (
              <span className="text-muted">{placeholder}</span>
            )}
          </div>
          <input
            className={classes['search']}
            aria-label="Select search"
            ref={inputRef}
            value={keyword}
            onChange={(e) => {
              !show && setShow(true);
              setKeyword(e?.target.value);
              onSearch?.(e?.target.value);
            }}
          ></input>

          <Dropdown.Menu
            ref={dropdownRef}
            className={classNames(classes['select-dropdown'], show && 'show')}
            style={{
              maxHeight: menuMaxHeight,
            }}
          >
            {filterOptions.length > 0 ? (
              filterOptions?.map((option, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={handleSelect(option)}
                  containerClassName={classNames(
                    classes['select-dropdown-item']
                  )}
                  active={isSelectedOption(option)}
                >
                  {renderLabel(option)}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item>No item match</Dropdown.Item>
            )}
          </Dropdown.Menu>
          {!hideClearButton && (
            <button
              className={classNames(classes['select-clear-button'])}
              onClick={handleClear}
            >
              <span>&times;</span>
            </button>
          )}
        </fieldset>
      );
    }
  )
);

export default Object.assign(FormSelect, {
  Native: formNativeSelect,
  Option: FormOption,
});
