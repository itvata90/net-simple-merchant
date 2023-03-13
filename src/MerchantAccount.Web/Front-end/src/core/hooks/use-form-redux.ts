import useDeepComparisonEffect from './use-deep-comparison-effect';
import useForm, { UseFormReturnType } from './use-form';

const useFormUpdater = <DataType extends { [s: string]: unknown } | ArrayLike<unknown>>(
  storeValues: DataType,
  setFormData: (newData: DataType) => void,
) => {
  useDeepComparisonEffect(() => {
    let newValues = Object.entries(storeValues).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    setFormData(newValues as DataType);
  }, [storeValues]);
};

const useReduxUpdater = <DataType>(
  useFormApi: UseFormReturnType<DataType>,
  storeUpdateCallback: (newData: DataType) => void,
) => {
  const dataChanges: Partial<DataType> = useFormApi.watch();
  useDeepComparisonEffect(() => {
    if (Object.keys(dataChanges).length > 0) {
      let newData = { ...dataChanges };
      storeUpdateCallback(newData as DataType);
    }
  }, [dataChanges]);
};

export interface UseFormReduxParameter<DataType> {
  storeValues?: DataType;
  storeUpdateCallback?: (newData: DataType) => void;
  storeSubmitCallback?: () => void;
  initialValues?: DataType;
  useFormApi?: UseFormReturnType<DataType>;
}

/**
 * This is a hook which help getting and setting input value, validating form values, and submitting form.
 * @param useFormApi This is set of values and callback return by useForm hook
 * @param storeValues This is value which is in store
 * @param storeUpdateCallback This is a callback which call the dispatch function for updating store state
 * @param storeSubmitCallback This is a callback which call the dispatch function for submitting store state
 * @returns returns set of values and callbacks which are returned by useForm hook
 */

const init = {};
const useFormRedux = <DataType extends { [x: string]: any }>({
  storeValues = init as DataType,
  storeUpdateCallback = () => {},
  // storeSubmitCallback = () => {},
  initialValues = init as DataType,
  useFormApi,
}: UseFormReduxParameter<DataType>): UseFormReturnType<DataType> => {
  // Set default if it is undefined
  let defaultUseFormApi = useForm<DataType>({
    initialValues: initialValues as DataType,
    // onSubmit: storeSubmitCallback,
  });
  useFormApi = useFormApi || defaultUseFormApi;
  // Sync up form state and store
  useFormUpdater(storeValues, useFormApi?.setValues);
  useReduxUpdater(useFormApi, storeUpdateCallback);
  return { ...useFormApi };
};

export default useFormRedux;
