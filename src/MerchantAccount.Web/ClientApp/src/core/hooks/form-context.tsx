import { createContext, useContext, useState } from 'react';
import { Validation, ValidationError } from 'src/core/hooks/use-form';

interface FormContextProps {
  values: { [x: string]: any };
  errors: { [key: string]: ValidationError };
  validation: { [x: string]: Validation };
  initValues: { [x: string]: any };
  //handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setErrors: ((newValue: { [key: string]: ValidationError }) => void) | undefined;
  setValues: ((newValue: { [x: string]: any }) => void) | undefined;
  setValidation: ((newValue: { [x: string]: any }) => void) | undefined;
  setInitValues: ((newValue: { [x: string]: any }) => void) | undefined;
  refs: { [x: string]: any };
  setRefs: ((newValue: { [x: string]: any }) => void) | undefined;
}

const FormContext = createContext<FormContextProps>({
  errors: {},
  // handleSubmit: event => {},
  setErrors: undefined,
  values: {},
  setValues: undefined,
  validation: {},
  setValidation: undefined,
  initValues: {},
  setInitValues: undefined,
  refs: {},
  setRefs: undefined,
});

export const FormProvider = ({ children }: any) => {
  const [errors, setErrors] = useState<{ [key: string]: ValidationError }>({});
  const [values, setValues] = useState<{ [x: string]: any }>({});
  const [validation, setValidation] = useState<{ [key: string]: Validation }>({});
  const [initValues, setInitValues] = useState<{ [key: string]: any }>({});
  const [refs, setRefs] = useState<{ [key: string]: any }>({});
  const handleErrors = (newData: { [key: string]: ValidationError }) => {
    setErrors((prev) => ({ ...prev, ...newData }));
  };
  const handleValues = (newData: { [x: string]: any }) => {
    setValues((prev) => ({ ...prev, ...newData }));
  };

  const handleValidation = (newData: { [x: string]: any }) => {
    setValidation((prev) => ({ ...prev, ...newData }));
  };
  const handleInitValues = (newData: { [x: string]: any }) => {
    setInitValues((prev) => ({ ...prev, ...newData }));
  };

  const handleRefs = (newData: { [x: string]: any }) => {
    setRefs((prev) => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider
      value={{
        values,
        errors,
        validation: validation,
        initValues: initValues,
        refs: refs,
        setErrors: handleErrors,
        setValues: handleValues,
        setValidation: handleValidation,
        setInitValues: handleInitValues,
        setRefs: handleRefs,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const Form = () => {
  return <form></form>;
};

export const useFormContext = () => useContext(FormContext);
