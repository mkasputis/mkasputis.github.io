if (process.env.NODE_ENV === "production") {
  throw new Error("setStorageBreakpoints shouldn't be used in production");
}

/**
 * passes through args and also sets a local variable
 * so that all args are in scope and can be inspected
 */
export function debugFn(..._args) {
  const args = _args;
  debugger;
  return args;
}

/**
 * automatically breaks on getting/setting items
 * for localStorage and sessionStorage
 */
export function setStorageBreakpoints() {
  const storages = [
    ["localStorage", localStorage],
    ["sessionStorage", sessionStorage],
  ];
  for (let [name, storageObj] of storages) {
    Object.defineProperty(window, name, {
      configurable: true,
      enumerable: true,
      value: new Proxy(storageObj, {
        get: debugFn,
        set: debugFn,
      }),
    });
  }
}
