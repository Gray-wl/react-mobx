import { createElement, forwardRef, useContext } from 'react';
import { MobxProviderContext } from './MobxProviderContext';

export const inject = (...storeNames) => component => {
  const Injector = forwardRef((props, ref) => {
    const context = useContext(MobxProviderContext);
    const newProps = {
      ...props,
      ...context
    };
    if (ref) {
      newProps.ref = ref;
    }
    return createElement(component, newProps);
  });
  return Injector;
}
