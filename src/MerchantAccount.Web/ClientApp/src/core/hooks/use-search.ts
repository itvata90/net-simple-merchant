import { useReducer, useState } from 'react';
import useDeepComparisonEffect from 'src/core/hooks/use-deep-comparison-effect';
import useDebounce from './use-debounce';

export enum ORDERS {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export interface Sorting {
  [fieldName: string]: ORDERS;
}

interface FetchState<DataType> {
  data?: DataType;
  error?: string;
  loading?: boolean;
}

// type Cache<DataType> = { [url: string]: DataType };

enum FETCH_ACTIONS {
  LOADING = 'loading',
  FULLFIL = 'fullfil',
  ERROR = 'error',
  UPDATE = 'update',
}

type FetchAction<DataType> =
  | { type: 'loading' }
  | { type: 'fullfil'; payload: DataType }
  | { type: 'error'; payload: string }
  | { type: 'update'; payload: DataType };

const getPaginationStringDefault = (page: string | number, limit: string | number): string =>
  `page=${page}&limit=${limit}`;

const getSortingStringDefault = (fields: Sorting): string => {
  let sortingString = 'sort=';
  let fieldArray = [];
  for (let [fieldName, orderBy] of Object.entries(fields)) {
    fieldArray.push(orderBy === ORDERS.ASCENDING ? fieldName : '-' + fieldName);
  }
  sortingString += fieldArray.join();
  return sortingString;
};

/**
 * This is the useSearch hook for getting all data from api with pagination, sorting, and filtering
 * @param fetcher This is a getting all data service callback
 * @param getPaginationString This is a callback for handling pagination params
 * @param getSortingString This is a callback for handling sorting params
 * @returns returns set of value and callback
 */
const useSearch = <DataType = unknown>(
  // This fetcher callback which get all data within some parameters;
  fetcher: (url: string, config?: { [key: string]: any }) => any,
  config?: {
    limit?: number;
    page?: number;
    sortBy?: Sorting;
    searchBy?: { [key: string]: string };
    searchDelayTime?: number;
    // This callback get the page and limit as arguments return paging string.
    getPaginationString?: (page: string | number, limit: string | number) => string;

    // This callback get the array of {fieldName: orderBy} return sorting string.
    // {username: 'desc, displayName: 'asc'}
    getSortingString?: (fields: Sorting) => string;
  },
) => {
  const [limit, setLimit] = useState<number>(config?.limit ?? 0);
  const [page, setPage] = useState<number>(config?.page ?? 1);
  const [sortBy, setSortBy] = useState<Sorting>(config?.sortBy ?? {});
  const [searchBy, setSearchBy] = useState<{ [key: string]: string }>(config?.searchBy ?? {});
  const getPaginationString = config?.getPaginationString ?? getPaginationStringDefault;
  const getSortingString = config?.getSortingString ?? getSortingStringDefault;
  const [reload, setReload] = useState<boolean>(false);

  const debouncedSearchValue = useDebounce(searchBy, config?.searchDelayTime ?? 1000);

  const fetchInitialState: FetchState<DataType> = {
    error: undefined,
    data: undefined,
    loading: true,
  };

  const fetchReducer = (state: FetchState<DataType>, action: FetchAction<DataType>): FetchState<DataType> => {
    switch (action.type) {
      case FETCH_ACTIONS.LOADING:
        return fetchInitialState;
      case FETCH_ACTIONS.FULLFIL:
        return { ...fetchInitialState, loading: false, data: action.payload };
      case FETCH_ACTIONS.ERROR:
        return { ...fetchInitialState, loading: false, error: action.payload };
      case FETCH_ACTIONS.UPDATE:
        return { ...fetchInitialState, loading: false, data: action.payload };
      default:
        return state;
    }
  };

  const [fetchState, fetchDispatch] = useReducer(fetchReducer, fetchInitialState);

  useDeepComparisonEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getUserList = async (signal: AbortSignal) => {
      try {
        fetchInitialState !== fetchState && fetchDispatch({ type: FETCH_ACTIONS.LOADING });

        // Prepare api string
        let arrayParams = [];

        // Add paging params
        let pagingString = getPaginationString(page, limit);
        pagingString !== '' && arrayParams.push(pagingString);

        // Add sorting params
        let sortingString = getSortingString(sortBy);
        sortingString !== '' && arrayParams.push(sortingString);

        // Add filter params
        for (let [fieldName, keyword] of Object.entries(searchBy)) {
          if (keyword && keyword !== '') {
            arrayParams.push(`${fieldName}=${keyword}`);
          }
        }

        let apiString = arrayParams.length > 0 ? '?' + arrayParams.join('&') : '';

        const response = await fetcher(`${apiString}`, {
          signal,
        });

        fetchDispatch({
          type: FETCH_ACTIONS.FULLFIL,
          payload: response as DataType,
        });
      } catch (error: any) {
        // Error
        fetchDispatch({
          type: FETCH_ACTIONS.ERROR,
          payload: error.message,
        });
      }
    };

    if (page) {
      getUserList(signal);
    }

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortBy, debouncedSearchValue, reload]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
  };

  const handleAddSort =
    (field: string, desc = false) =>
    () => {
      setPage(1);
      setSortBy({
        ...sortBy,
        [field]: desc ? ORDERS.DESCENDING : ORDERS.ASCENDING,
      });
    };

  const handleRemoveSort = (field: string) => () => {
    setPage(1);
    const { [field]: _, ...newValue } = sortBy;
    setSortBy(newValue);
  };

  const handleSearch = (field: string, keyword: string) => () => {
    setPage(1);
    setSearchBy({ ...searchBy, [field]: keyword });
  };

  const handleReload = () => setReload(!reload);

  const handleDataChange = (newValue: DataType) => {
    fetchDispatch({ type: FETCH_ACTIONS.UPDATE, payload: newValue });
  };

  return {
    data: fetchState.data,
    error: fetchState.error,
    loading: fetchState.loading,
    page,
    limit,
    handleLimitChange,
    handlePageChange,
    handleAddSort,
    handleRemoveSort,
    handleSearch,
    handleReload,
    handleDataChange,
  };
};

export default useSearch;
