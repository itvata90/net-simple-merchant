import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import { deepEquals } from 'src/core/functions/deep-equals';

/**
 * It like react use effect hook but it's do a deep comparison on dependencies list in stead of normal way
 * @param effect — Imperative function that can return a cleanup function
 * @param deps — If present, effect will only activate if the values in the list
 */
const useDeepComparisonEffect = (effectCallback: EffectCallback, deps?: DependencyList | undefined) => {
  let ref = useRef<DependencyList | undefined>(undefined);
  if (!ref.current || !deepEquals(deps, ref.current)) {
    ref.current = deps;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effectCallback, ref.current);
};

export default useDeepComparisonEffect;
