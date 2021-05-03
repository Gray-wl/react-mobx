import { forwardRef, memo } from 'react';
import { useObserver } from './useObserver';

export function observer(baseComponent, options = {}) {
  let realOptions = {
    forwardRef: false,
    ...options
  };

  const useWrappedComponent = (props, ref) => {
    return useObserver(() => baseComponent(props, ref));
  }

  let memoComponent;
  if (realOptions.forwardRef) {
    memoComponent = memo(forwardRef(useWrappedComponent));
  } else {
    memoComponent = memo(useWrappedComponent);
  }

  return memoComponent;
}
