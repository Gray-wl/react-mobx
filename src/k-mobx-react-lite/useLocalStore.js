import { useState } from 'react';
import { observable, runInAction, transaction } from 'mobx';
import { useAsObservableSource } from './useAsObservableSource';

export function useLocalStore(initializer, current = {}) {
  const source = useAsObservableSource(current);
  return useState(() => {
    const local = observable(initializer(source));
    runInAction(() => {
      Object.keys(local).forEach(key => {
        const value = local[key];
        if (typeof value === 'function') {
          local[key] = wrapInTransaction(value, local);
        }
      });
    });
    return local;
  })[0];
}

function wrapInTransaction(fn, context) {
  return (...args) => transaction(() => fn.apply(context, args));
}
