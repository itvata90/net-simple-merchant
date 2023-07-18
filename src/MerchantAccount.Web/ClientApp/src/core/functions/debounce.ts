export const debounce = (func: Function, delay: number = 500) => {
  let timer: any;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(undefined, args);
    }, delay);
  };
};
