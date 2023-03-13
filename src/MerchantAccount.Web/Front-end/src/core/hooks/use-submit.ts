import { useCallback, useReducer } from 'react';
import { UseFormReturnType } from 'src/core/hooks/use-form';

export interface UseFormSubmitReturnType<DataType> extends Omit<UseFormReturnType<DataType>, 'handleSubmit'> {
  // loading?: boolean;
  // isSuccessSubmit?: boolean;
  // submitErrorMessage?: string;
  // responseData?: DataType;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  submitState?: SubmitState<DataType>;
}

interface SubmitState<DataType> {
  data?: DataType;
  error?: string;
  loading: boolean;
}

enum SUBMIT_ACTION_TYPES {
  SUBMITTING = 'submitting',
  FULLFIL = 'fullfil',
  ERROR = 'error',
}

type SubmitAction<DataType> =
  | { type: SUBMIT_ACTION_TYPES.SUBMITTING }
  | { type: SUBMIT_ACTION_TYPES.FULLFIL; payload: DataType }
  | { type: SUBMIT_ACTION_TYPES.ERROR; payload: string };

const initialState: SubmitState<any> = {
  data: undefined,
  error: undefined,
  loading: false,
};

const submitReducer = <DataType = unknown>(state: SubmitState<DataType>, action: SubmitAction<DataType>) => {
  switch (action.type) {
    case SUBMIT_ACTION_TYPES.SUBMITTING:
      return { ...initialState, loading: true };
    case SUBMIT_ACTION_TYPES.FULLFIL:
      return { ...initialState, loading: false, data: action.payload };
    case SUBMIT_ACTION_TYPES.ERROR:
      return { ...initialState, loading: false, error: action.payload };
    default:
      return state;
  }
};

/**
 * useSubmit hook: adding loading, error state for use form hook api
 * @param useFormApi
 * @param fetcher
 * @returns
 */
const useSubmit = <DataType = unknown>(
  useFormApi: UseFormReturnType<DataType>,
  fetcher: (formData: any, config?: { [key: string]: any }) => any,
): UseFormSubmitReturnType<DataType> => {
  const [submitState, submitDispatch] = useReducer(submitReducer<DataType>, initialState);
  const addOrUpdate = useCallback(async () => {
    submitDispatch({ type: SUBMIT_ACTION_TYPES.SUBMITTING });

    try {
      const response = await fetcher(useFormApi.values);
      submitDispatch({ type: SUBMIT_ACTION_TYPES.FULLFIL, payload: response.data as DataType });
    } catch (error: any) {
      submitDispatch({ type: SUBMIT_ACTION_TYPES.ERROR, payload: error.message });
    }
  }, [fetcher, useFormApi]);

  const handleSubmit = () => {
    return useFormApi.handleSubmit(addOrUpdate);
  };

  return {
    ...useFormApi,
    handleSubmit: handleSubmit(),
    submitState,
  };
};

export default useSubmit;
