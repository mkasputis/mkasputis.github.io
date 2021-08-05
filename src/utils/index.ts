const defaultOpts = {
  trailing: true,
  leading: false,
};

export function throttle(
  fn: Function,
  wait: number,
  { trailing, leading }: { trailing: boolean; leading: boolean } = defaultOpts
): any {
  let id: any, result: any;
  return function throttledFn(...args: any[]) {
    if (id == null && leading) {
      result = fn(...args);
    }
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      id = undefined;
      if (trailing) {
        result = fn(...args);
      }
    }, wait);
    return result;
  };
}
