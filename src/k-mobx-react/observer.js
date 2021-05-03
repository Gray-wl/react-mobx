import { forwardRef } from 'react';
import { Observer, observer as observerLite } from '../k-mobx-react-lite';
import { makeClassComponentObserver } from './observerClass';

export function observer(component) {
  if (component['$$typeof'] === Symbol.for('react.forward_ref')) {
    const baseRender = component['render'];
    return forwardRef(function () {
      const arg = arguments;
      return <Observer>{() => baseRender.apply(undefined, arg)}</Observer>
    });
  }
  if (component.prototype?.isReactComponent) {
    return makeClassComponentObserver(component);
  }
  return observerLite(component);
}
