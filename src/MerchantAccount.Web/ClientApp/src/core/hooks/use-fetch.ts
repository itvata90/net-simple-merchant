import { useEffect, useReducer, useRef, useState } from 'react';

interface State<T> {
  data?: T;
  error?: Error;
}

interface ReturnType<T> extends State<T> {
  mutate: Function;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

const loadingState = {
  error: undefined,
  data: undefined,
};

function useFetch<T = unknown>(
  url: string,
  fetcher: (url?: string, config?: RequestInit) => any,
  config?: {
    deps?: any[];
    skipCondition?: () => boolean;
  }
): ReturnType<T> {
  const cache = useRef<Cache<T>>({});
  const [reload, setReload] = useState<boolean>(false);
  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);
  const initialState: State<T> = loadingState;
  // Store previous reload state
  const preReloadState = useRef<boolean>(false);

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return initialState;
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const mutate = (newData?: T, refresh?: boolean) => {
    if (!!newData) {
      cache.current[url] = newData;
      refresh && dispatch({ type: 'fetched', payload: cache.current[url] });
    } else {
      setReload((prev) => !prev);
    }
  };

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return;
    if (!!config?.skipCondition && config.skipCondition()) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      state !== loadingState && dispatch({ type: 'loading' });

      // If a cache exists for this url, return it
      if (cache.current[url] && reload === preReloadState.current) {
        dispatch({ type: 'fetched', payload: cache.current[url] });
        return;
      }
      preReloadState.current = reload;

      try {
        const data = await fetcher(url);

        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: 'error', payload: error as Error });
      }
    };
    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, reload, ...(config?.deps ?? [])]);

  return { ...state, mutate };
}

export default useFetch;
