import { useState, useEffect, useRef, useCallback, useId } from 'react';
import { debounce } from 'src/core/functions/debounce';
import { deepEquals } from 'src/core/functions/deep-equals';
import { defaultValidator } from 'src/core/hooks/default-validator';
import { useFormContext } from './form-context';

export interface UseFormReturnType<DataType> {
  handleChange: (name: string) => (event: any) => void;
  values: DataType;
  setValues: (newData: DataType) => void;
  errors: { [key: string]: ValidationError };
  setErrors: (newData: { [x: string]: ValidationError }) => void;
  resetForm: () => void;
  handleSubmit: (
    submitCallback: SubmitCallback<DataType>
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  fieldProps: (fieldName: string, _validation?: Validation) => FieldProps;
  watch: () => DataType;
  isDirty: () => boolean;
}

export type ValidationError = string | false;

export interface Validation {
  required?: boolean;
  pattern?: RegExp;
  maxLength?: number;
  min?: number;
  max?: number;
  isEmail?: boolean;
  isPhone?: boolean;
}

interface FieldProps {
  onChange?: (event: any) => void;
  onInput?: (event: any) => void;
  value?: any;
  required?: boolean;
  key?: any;
  ref?: any;
  defaultValue?: any;
  defaultChecked?: boolean;
  onKeyUpCapture?: any;
}

interface UseFormParameter<DataType> {
  initialValues: DataType;

  validator?: (
    values: { [x: string]: any },
    validation?: { [x: string]: any }
  ) => {
    [x: string]: string;
  };
  validateOnChange?: boolean;
  validateFields?: Array<string>;
  validationDebounceTime?: number;
}

type SubmitCallback<DataType> = (
  values?: DataType,
  errors?: { [key: string]: ValidationError },
  setErrors?: (newData: { [x: string]: ValidationError }) => void
) => void;

/**
 * This is a hook which help getting and setting input value, validating form values, and submitting form.
 * @param initialValues This is initial values of form
 * @param validateOnChange If true values will be validated on changing, otherwise it's not
 * @param validator This is a callback with values as argument for validating these values
 * @param validateFields This is a array including field's name which will be validated
 * @returns returns set of value and callback
 */
const useForm = <DataType extends { [x: string]: any }>({
  initialValues = {} as DataType,
  validator = defaultValidator,
  validateOnChange = true,
  validateFields,
  validationDebounceTime = 200,
}: UseFormParameter<DataType>): UseFormReturnType<DataType> => {
  // Context:
  const {
    errors: contextErrors,
    setErrors: setErrorsContext,
    values: contextValues,
    setValues: setValuesContext,
    validation: contextValidation,
    setValidation: setValidationContext,
    initValues: contextInitValues,
    setInitValues: setInitValuesContext,
    refs,
    setRefs,
  } = useFormContext();
  const isContextEnabled = !!setInitValuesContext;

  // Hook state
  const submitCallback = useRef<SubmitCallback<DataType>>();
  const [errors, setErrors] = useState<{ [x: string]: ValidationError }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  // Set key for each form control, key change can trigger rerender
  // const [key, setKey] = useState<number>(1);
  const validation = useRef<{ [key: string]: Validation }>({});
  const formRef = useRef<any>();
  // Values store value in ref
  const values = useRef(initialValues);

  // Set values to ref, not trigger rerender
  const setValues = (newValues: DataType) => {
    values.current = newValues;
  };

  // Set values to context and ref, combine current, context, and new data
  const handleSetValues = (newData: DataType) => {
    setValues({ ...contextValues, ...values.current, ...newData });
  };

  // Get values from context or internal
  const handleGetValues = (): DataType => {
    return (isContextEnabled ? contextValues : values.current) as DataType;
  };

  // Get validation from context or internal
  const handleGetValidation = () => {
    return isContextEnabled ? contextValidation : validation.current;
  };

  // Get initial values from context or internal
  const handleGetInitialValues = (): DataType => {
    return (isContextEnabled ? contextInitValues : initialValues) as DataType;
  };

  // Set error to context or internal
  const handleSetErrors = (newData: { [key: string]: ValidationError }) => {
    isContextEnabled
      ? setErrorsContext?.(newData)
      : setErrors((prev) => ({ ...prev, ...newData }));
  };

  // Get error, combine context and internal
  const handleGetErrors = () => {
    return { ...contextErrors, ...errors };
  };

  const watch = () => {
    return handleGetValues();
    // return {} as DataType;
  };

  useEffect(() => {
    setValues(initialValues);
    isContextEnabled && setInitValuesContext(values);
  }, [initialValues]);

  const totalErrors = handleGetErrors();
  // Only perform onSubmit when submit button has clicked and all values's field is not error
  useEffect(() => {
    if (
      submitted &&
      Object.values(totalErrors).every((error) => error === false)
    ) {
      validateForSubmitting() &&
        submitCallback.current &&
        submitCallback.current(
          handleGetValues(),
          handleGetErrors(),
          handleSetErrors
        );
    }
    submitted && setSubmitted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalErrors]);

  const handleChange = (name: string) => (event: any, optional?: any) => {
    const newValue = event.target.checked || event.target.value || optional;
    // Set values
    handleSetValues({ [name]: newValue } as DataType);
    // Check whether perform validation on change or not
    validateHandler({ [name]: newValue });
    watchHandler({ [name]: newValue });
  };

  const validateHandler = useCallback(
    debounce((values: DataType) => {
      if (validateOnChange) {
        const result = validator(values, validation.current);
        handleSetErrors(result);
      }
    }, validationDebounceTime),
    []
  );

  const watchHandler = useCallback(
    debounce((newValue: DataType) => {
      setValuesContext && setValuesContext(newValue);
    }, validationDebounceTime),
    []
  );

  const validateForSubmitting = (): boolean => {
    const submitValues = handleGetValues();
    let filtered: { [x: string]: any } = submitValues;
    if (
      validateFields &&
      validateFields !== undefined &&
      validateFields.length > 0
    ) {
      filtered = Object.keys(submitValues)
        .filter((key: string) => validateFields.includes(key))
        .reduce((obj: { [x: string]: any }, key: string) => {
          obj[key] = submitValues[key];
          return obj;
        }, {});
    }
    // Validate values
    const _validation = handleGetValidation();
    const result = validator({ ...filtered }, _validation);
    handleSetErrors({ ...contextErrors, ...errors, ...result });
    return Object.values(result).every((error) => !!error === false);
  };

  const handleSubmit =
    (_submitCallback: SubmitCallback<DataType>) =>
    (event: React.FormEvent<HTMLFormElement> | React.TouchEvent<any>) => {
      event?.preventDefault?.();
      setSubmitted(true);
      submitCallback.current = _submitCallback;
    };

  // Reset form
  const resetForm = (event?: React.FormEvent<HTMLFormElement>) => {
    // Reset when using un-controlled
    formRef.current?.reset?.();
    isContextEnabled && refs.length > 0 && refs[0]?.current?.reset?.();
    // Reset when using controlled
    const initErrors = Object.keys(handleGetValues()).reduce(
      (acc, cur) => ({ ...acc, [cur]: false }),
      {}
    );
    handleSetErrors(initErrors);
    handleSetValues(handleGetInitialValues());
  };

  // Create field
  const fieldProps = useRef<{ [key: string]: any }>({});
  const useFieldProps = useCallback(
    (fieldName: string, _validation: Validation = {}): FieldProps => {
      // Check existed
      let hasStored: boolean = false;

      if (
        fieldProps.current?.[fieldName] &&
        fieldProps.current?.[fieldName]?.defaultValue ===
          initialValues[fieldName]
      ) {
        hasStored = true;
      }

      useEffect(() => {
        if (!hasStored) {
          validation.current = {
            ...validation.current,
            [fieldName]: _validation,
          };
          setValidationContext && setValidationContext(validation);
          isContextEnabled && setRefs?.({ [fieldName]: ref });
        }
      }, [fieldName]);

      const ref = useRef<any>();

      useEffect(() => {
        if (ref.current && !hasStored) {
          const control = ref.current;
          const controlType = control.type;
          switch (controlType) {
            case 'checkbox':
              control.defaultChecked = initialValues[fieldName];
              break;
            case 'select-one':
              control.defaultValue = initialValues[fieldName];
              break;
            default:
              control.defaultValue = initialValues[fieldName];
              break;
          }

          // Get form ref
          if (!formRef.current) {
            formRef.current = ref.current.closest?.('form');
          }
        }
      }, [fieldName, ref]);

      if (hasStored) {
        return fieldProps.current[fieldName];
      }

      const key = JSON.stringify(initialValues[fieldName]);

      const props = {
        ref,
        key: `${fieldName}-${key}`,
        onInput: handleChange(fieldName) as any,
        defaultValue: initialValues[fieldName],
        required: _validation.required || false,
      };

      // Store in ref
      fieldProps.current = { ...fieldProps.current, [fieldName]: props };
      return props;
    },
    [initialValues]
  );

  const isDirty = () => !deepEquals(initialValues, handleGetValues());

  return {
    handleChange,
    values: handleGetValues(),
    watch,
    setValues: setValues,
    errors: handleGetErrors(),
    setErrors: handleSetErrors,
    resetForm,
    handleSubmit,
    fieldProps: useFieldProps,
    isDirty: isDirty,
  };
};

export default useForm;
