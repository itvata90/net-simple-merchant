import { useState, useEffect, useRef, useCallback } from 'react';
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
  handleSubmit: (submitCallback: SubmitCallback<DataType>) => (event: React.FormEvent<HTMLFormElement>) => void;
  fieldProps: (fieldName: string, _validation: Validation) => FieldProps;
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
  onKeyUpCapture?: any;
}

interface UseFormParameter<DataType> {
  initialValues: DataType;

  validator?: (
    values: { [x: string]: any },
    validation?: { [x: string]: any },
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
  setErrors?: (newData: { [x: string]: ValidationError }) => void,
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
  const submitCallback = useRef<SubmitCallback<DataType>>();
  const [errors, setErrors] = useState<{ [x: string]: ValidationError }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [watchers, setWatchers] = useState<DataType>(initialValues);
  const [key, setKey] = useState(1);
  const validation: { [key: string]: Validation } = {};
  let values = useRef(initialValues);
  // Get, Set values
  const setValues = (newValues: DataType) => {
    values.current = newValues;
  };

  const handleSetValues = (newData: DataType) => {
    setValues({ ...contextValues, ...values.current, ...newData });
  };

  const handleGetValues = (): DataType => {
    return (setValuesContext ? contextValues : values.current) as DataType;
  };

  // Get validation
  const handleGetValidation = () => {
    return setValidationContext ? contextValidation : validation;
  };

  // Get init values
  const handleGetInitialValues = () => {
    return (setInitValuesContext ? contextInitValues : initialValues) as DataType;
  };

  const handleSetInitialValues = (values: DataType) => {
    setInitValuesContext && setInitValuesContext(values);
  };

  // Get, set errors
  const handleSetErrors = (newData: { [key: string]: ValidationError }) => {
    setErrorsContext ? setErrorsContext(newData) : setErrors((prev) => ({ ...prev, ...newData }));
  };

  const handleGetErrors = () => {
    return { ...contextErrors, ...errors };
  };

  const watch = () => {
    return watchers;
  };

  useEffect(() => {
    handleSetValues(initialValues);
    setWatchers(initialValues);
    handleSetInitialValues(initialValues);
    setKey((prev) => prev + 1);
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const totalErrors = handleGetErrors();
  // Only perform onSubmit when submit button has clicked and all values's field is not error
  useEffect(() => {
    if (submitted && Object.values(totalErrors).every((error) => error === false)) {
      submitCallback.current && submitCallback.current(values as any, totalErrors, handleSetErrors);
    }
    setSubmitted(false);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateHandler = useCallback(
    debounce((values: DataType) => {
      if (validateOnChange) {
        const result = validator(values, validation);
        handleSetErrors(result);
      }
    }, validationDebounceTime),
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const watchHandler = useCallback(
    debounce((newValue: DataType) => {
      setWatchers((prev) => ({ ...prev, ...newValue }));
      setValuesContext && setValuesContext(newValue);
    }, validationDebounceTime),
    [],
  );

  const handleSubmit = (_submitCallback: SubmitCallback<DataType>) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitValues = handleGetValues();
    // Check validated required fields in values
    let filtered: { [x: string]: any } = submitValues;
    if (validateFields && validateFields !== undefined && validateFields.length > 0) {
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
    setSubmitted(true);
    submitCallback.current = _submitCallback;
  };

  // Reset form
  const resetForm = (event?: React.FormEvent<HTMLFormElement>) => {
    // event?.preventDefault();
    const initErrors = Object.keys(handleGetValues()).reduce((acc, cur) => ({ ...acc, [cur]: false }), {});
    handleSetErrors(initErrors);
    handleSetValues(handleGetInitialValues());
    setWatchers(handleGetInitialValues());
  };

  // Create field
  const useFieldProps = (fieldName: string, _validation: Validation): FieldProps => {
    validation[fieldName] = _validation;
    useEffect(() => {
      setValidationContext && setValidationContext(validation);
      setRefs && setRefs({ [fieldName]: ref });
    }, [fieldName]);
    const ref = useRef();
    useEffect(() => {
      if (ref.current) {
        const control = ref.current as any;
        const controlType = control.type;
        switch (controlType) {
          case 'checkbox':
            control.defaultChecked = initialValues[fieldName];
            break;
          case 'select-one':
            control.defaultValue = initialValues[fieldName];
            break;
          default:
            break;
        }
      }
    }, [fieldName, ref]);
    return {
      ref,
      key: `${fieldName}-${key}`,
      onInput: handleChange(fieldName) as any,
      defaultValue: initialValues[fieldName],
      required: _validation.required || false,
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isDirty = useCallback(() => !deepEquals(initialValues, handleGetValues()), [initialValues, watchers, errors]);
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
